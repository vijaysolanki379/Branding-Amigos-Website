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


def _send_notification(inquiry: ContactInquiry) -> None:
    import resend
    resend.api_key = os.environ["RESEND_API_KEY"]
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
    html = (
        "<div style='font-family:Arial,sans-serif;max-width:560px'>"
        "<h2 style='color:#05061A;font-size:18px'>New consultation request — Branding Amigos</h2>"
        f"<table style='border-collapse:collapse;border:1px solid #e2e8f0'>{rows}</table>"
        "</div>"
    )
    resend.Emails.send({
        "from": os.environ.get("SENDER_EMAIL", "onboarding@resend.dev"),
        "to": [os.environ.get("NOTIFY_EMAIL", "brandingamigos@gmail.com")],
        "subject": f"New consultation request — {inquiry.name}",
        "html": html,
        "reply_to": inquiry.email,
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
            await asyncio.to_thread(_send_notification, inquiry)
        except Exception:
            logger.exception("Failed to send inquiry notification email")
    else:
        logger.info("RESEND_API_KEY not set — inquiry %s stored without email notification", inquiry.id)
    return inquiry


@api_router.get("/contact", response_model=List[ContactInquiry])
async def list_inquiries(x_admin_key: Optional[str] = Header(default=None)):
    admin_key = os.environ.get("ADMIN_KEY")
    if not admin_key or x_admin_key != admin_key:
        raise HTTPException(status_code=401, detail="Invalid admin key")
    docs = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    result = []
    for doc in docs:
        ts = doc.get("created_at")
        if isinstance(ts, datetime) and ts.tzinfo is None:
            doc["created_at"] = ts.replace(tzinfo=timezone.utc)
        result.append(ContactInquiry(**doc))
    return result


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
