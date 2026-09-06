import asyncio
import logging
import os
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, Header, HTTPException
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from lib.db import client, db, ensure_indexes

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("branding-amigos")


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.index_task = asyncio.create_task(ensure_indexes())
    yield
    client.close()


app = FastAPI(title="Branding Amigos API", lifespan=lifespan)
api_router = APIRouter(prefix="/api")


class ContactInquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    business: Optional[str] = Field(default=None, max_length=160)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    website: Optional[str] = Field(default=None, max_length=300)
    services: List[str] = Field(default_factory=list, max_length=10)
    budget: Optional[str] = Field(default=None, max_length=80)
    goals: str = Field(min_length=10, max_length=4000)


class ContactInquiry(ContactInquiryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


def _send_emails(inquiry: ContactInquiry) -> None:
    import resend
    resend.api_key = os.environ["RESEND_API_KEY"]
    sender = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
    notify = os.environ.get("NOTIFY_EMAIL", "brandingamigos@gmail.com")

    rows = "".join(
        f"<tr><td style='padding:7px 14px;color:#64748b;font-size:13px;white-space:nowrap'>{label}</td>"
        f"<td style='padding:7px 14px;font-size:13px;color:#0f172a'>{value}</td></tr>"
        for label, value in [
            ("Name", inquiry.name),
            ("Business", inquiry.business or "—"),
            ("Email", inquiry.email),
            ("Phone", inquiry.phone or "—"),
            ("Website", inquiry.website or "—"),
            ("Services", ", ".join(inquiry.services) if inquiry.services else "—"),
            ("Budget", inquiry.budget or "—"),
            ("Goals", inquiry.goals),
        ]
    )
    notify_html = (
        "<div style='font-family:Arial,sans-serif;max-width:560px'>"
        "<h2 style='color:#05061A;font-size:18px'>New consultation request — Branding Amigos</h2>"
        f"<table style='border-collapse:collapse;border:1px solid #e2e8f0'>{rows}</table>"
        "</div>"
    )
    resend.Emails.send({
        "from": sender,
        "to": [notify],
        "subject": f"New consultation request — {inquiry.name}",
        "html": notify_html,
        "reply_to": inquiry.email,
    })

    confirm_html = (
        "<div style='font-family:Arial,sans-serif;max-width:560px'>"
        f"<h2 style='color:#05061A;font-size:18px'>Thanks, {inquiry.name} — we've received your request</h2>"
        "<p style='font-size:14px;color:#334155;line-height:1.6'>Thank you for reaching out to Branding Amigos. "
        "We've received your consultation request and our team will review your requirements. "
        "You can expect to hear from us within one business day.</p>"
        "<p style='font-size:14px;color:#334155;line-height:1.6'>Prefer to talk right away? "
        "Reply to this email or call us at +91 79845 68245 (Mon–Fri, 9 AM – 6 PM IST).</p>"
        "<p style='font-size:12px;color:#64748b;margin-top:24px'>Branding Amigos — SEO &amp; Digital Marketing for Sustainable Growth<br>Ahmedabad, Gujarat, India</p>"
        "</div>"
    )
    resend.Emails.send({
        "from": sender,
        "to": [inquiry.email],
        "subject": "We received your request — Branding Amigos",
        "html": confirm_html,
        "reply_to": notify,
    })


@api_router.get("/")
async def root():
    return {"message": "Branding Amigos API"}


@api_router.post("/contact", response_model=ContactInquiry, status_code=201)
async def create_inquiry(payload: ContactInquiryCreate):
    inquiry = ContactInquiry(**payload.model_dump())
    await db.inquiries.insert_one(inquiry.model_dump())
    if os.environ.get("RESEND_API_KEY"):
        try:
            await asyncio.to_thread(_send_emails, inquiry)
        except Exception:
            logger.exception("Failed to send inquiry emails")
    else:
        logger.info("RESEND_API_KEY not set — inquiry %s stored without email notification", inquiry.id)
    return inquiry


def _check_admin(x_admin_key: Optional[str]) -> None:
    admin_key = os.environ.get("ADMIN_KEY")
    if not admin_key or x_admin_key != admin_key:
        raise HTTPException(status_code=401, detail="Invalid admin key")


def _normalize_ts(doc: dict, field: str) -> None:
    ts = doc.get(field)
    if isinstance(ts, datetime) and ts.tzinfo is None:
        doc[field] = ts.replace(tzinfo=timezone.utc)


def _slugify(title: str) -> str:
    import re
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return slug or uuid.uuid4().hex[:8]


@api_router.get("/contact", response_model=List[ContactInquiry])
async def list_inquiries(x_admin_key: Optional[str] = Header(default=None)):
    _check_admin(x_admin_key)
    docs = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for doc in docs:
        _normalize_ts(doc, "created_at")
    return [ContactInquiry(**doc) for doc in docs]


class PostCreate(BaseModel):
    title: str = Field(min_length=4, max_length=200)
    excerpt: str = Field(min_length=10, max_length=400)
    content: str = Field(min_length=50, max_length=50000)
    tags: List[str] = Field(default_factory=list, max_length=6)
    author: str = Field(default="Branding Amigos", max_length=120)
    cover: Optional[str] = Field(default=None, max_length=600)
    meta_title: Optional[str] = Field(default=None, max_length=120)
    meta_description: Optional[str] = Field(default=None, max_length=200)
    focus_keyword: Optional[str] = Field(default=None, max_length=120)


class PostUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=4, max_length=200)
    excerpt: Optional[str] = Field(default=None, min_length=10, max_length=400)
    content: Optional[str] = Field(default=None, min_length=50, max_length=50000)
    tags: Optional[List[str]] = Field(default=None, max_length=6)
    cover: Optional[str] = Field(default=None, max_length=600)
    meta_title: Optional[str] = Field(default=None, max_length=120)
    meta_description: Optional[str] = Field(default=None, max_length=200)
    focus_keyword: Optional[str] = Field(default=None, max_length=120)


class Post(PostCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str = ""
    published_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.get("/posts", response_model=List[Post])
async def list_posts():
    docs = await db.posts.find({}, {"_id": 0}).sort("published_at", -1).to_list(200)
    for doc in docs:
        _normalize_ts(doc, "published_at")
    return [Post(**doc) for doc in docs]


@api_router.get("/posts/{slug}", response_model=Post)
async def get_post(slug: str):
    doc = await db.posts.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Post not found")
    _normalize_ts(doc, "published_at")
    return Post(**doc)


@api_router.post("/posts", response_model=Post, status_code=201)
async def create_post(payload: PostCreate, x_admin_key: Optional[str] = Header(default=None)):
    _check_admin(x_admin_key)
    post = Post(**payload.model_dump(), slug=_slugify(payload.title))
    if await db.posts.find_one({"slug": post.slug}):
        post.slug = f"{post.slug}-{uuid.uuid4().hex[:6]}"
    await db.posts.insert_one(post.model_dump())
    try:
        from lib.sitemap import regenerate_sitemap
        await regenerate_sitemap()
    except Exception:
        logger.exception("Failed to regenerate sitemap")
    return post


@api_router.put("/posts/{post_id}", response_model=Post)
async def update_post(post_id: str, payload: PostUpdate, x_admin_key: Optional[str] = Header(default=None)):
    _check_admin(x_admin_key)
    updates = payload.model_dump(exclude_unset=True)
    if not updates:
        raise HTTPException(status_code=400, detail="Nothing to update")
    doc = await db.posts.find_one_and_update(
        {"id": post_id},
        {"$set": updates},
        projection={"_id": 0},
        return_document=True,
    )
    if not doc:
        raise HTTPException(status_code=404, detail="Post not found")
    _normalize_ts(doc, "published_at")
    return Post(**doc)


class InquiryStatusUpdate(BaseModel):
    status: str = Field(pattern="^(new|contacted|closed)$")


@api_router.patch("/contact/{inquiry_id}", response_model=ContactInquiry)
async def update_inquiry_status(
    inquiry_id: str,
    payload: InquiryStatusUpdate,
    x_admin_key: Optional[str] = Header(default=None),
):
    _check_admin(x_admin_key)
    doc = await db.inquiries.find_one_and_update(
        {"id": inquiry_id},
        {"$set": {"status": payload.status}},
        projection={"_id": 0},
        return_document=True,
    )
    if not doc:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    _normalize_ts(doc, "created_at")
    return ContactInquiry(**doc)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
