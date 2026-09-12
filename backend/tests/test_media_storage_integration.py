"""Media upload/storage integration tests for CMS admin image uploads and public serving."""

import hashlib
import io
import os
import sys
import uuid
from datetime import datetime

import pytest
import requests
from dotenv import load_dotenv
from PIL import Image
from pymongo import MongoClient


# Load env files explicitly (no fallback URLs/keys).
load_dotenv("/app/frontend/.env")
load_dotenv("/app/backend/.env")

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
ADMIN_KEY = os.environ["ADMIN_KEY"]
MONGO_URL = os.environ["MONGO_URL"].strip().strip('"')
DB_NAME = os.environ["DB_NAME"].strip().strip('"')
APP_NAME = os.environ["STORAGE_APP_NAME"]

sys.path.insert(0, "/app/backend")
from lib.storage import get_object, init_storage  # noqa: E402


def _make_image_bytes(fmt: str, size: tuple[int, int] = (32, 32), color=(24, 84, 160), **save_kwargs) -> bytes:
    image = Image.new("RGB", size, color=color)
    out = io.BytesIO()
    image.save(out, format=fmt, **save_kwargs)
    return out.getvalue()


def _post_upload(filename: str, content: bytes, mime: str, key: str | None = ADMIN_KEY):
    headers = {"X-Admin-Key": key} if key is not None else {}
    return requests.post(
        f"{BASE_URL}/api/media/upload",
        files={"file": (filename, content, mime)},
        headers=headers,
        timeout=90,
    )


@pytest.fixture(scope="module")
def mongo_media_collection():
    client = MongoClient(MONGO_URL)
    try:
        yield client[DB_NAME].media
    finally:
        client.close()


@pytest.fixture(scope="module")
def uploaded_ids_for_cleanup():
    return []


@pytest.fixture(scope="module")
def sample_images():
    return {
        "jpg": ("test-image.jpg", _make_image_bytes("JPEG"), "image/jpeg"),
        "png": ("test-image.png", _make_image_bytes("PNG"), "image/png"),
        "webp": ("test-image.webp", _make_image_bytes("WEBP"), "image/webp"),
        "gif": ("test-image.gif", _make_image_bytes("GIF"), "image/gif"),
    }


@pytest.mark.parametrize("ext", ["jpg", "png", "webp", "gif"])
def test_upload_supported_formats_and_public_read(sample_images, mongo_media_collection, uploaded_ids_for_cleanup, ext):
    """Uploads JPG/PNG/WebP/GIF, verifies metadata, DB record, headers, and byte-for-byte retrieval."""
    filename, payload, mime = sample_images[ext]
    post = _post_upload(filename, payload, mime)
    assert post.status_code == 201, post.text

    data = post.json()
    assert set(data.keys()) == {"id", "url", "original_filename", "content_type", "size", "width", "height"}
    assert data["original_filename"] == filename
    assert data["content_type"] == mime
    assert data["size"] == len(payload)
    assert data["url"] == f"/api/media/{data['id']}"
    assert "storage_path" not in data
    assert "storage_key" not in data

    uploaded_ids_for_cleanup.append(data["id"])

    record = mongo_media_collection.find_one({"id": data["id"]}, {"_id": 0})
    assert record is not None
    assert record["is_deleted"] is False
    assert record["storage_path"].startswith(f"{APP_NAME}/uploads/admin/")
    assert record["storage_path"].endswith(f"{data['id']}.{ext}")
    assert record["content_type"] == mime
    assert record["url"] == data["url"]
    assert datetime.fromisoformat(record["created_at"]).utcoffset().total_seconds() == 0

    fetched = requests.get(f"{BASE_URL}{data['url']}", timeout=90)
    assert fetched.status_code == 200
    assert fetched.headers.get("content-type", "").startswith(mime)
    assert fetched.headers.get("x-content-type-options") == "nosniff"
    assert "public, max-age=31536000, immutable" in fetched.headers.get("cache-control", "")
    assert fetched.headers.get("content-security-policy") == "default-src 'none'; sandbox"
    assert hashlib.sha256(fetched.content).hexdigest() == hashlib.sha256(payload).hexdigest()


def test_public_get_unknown_media_uuid_404():
    response = requests.get(f"{BASE_URL}/api/media/{uuid.uuid4()}", timeout=30)
    assert response.status_code == 404


def test_upload_rejects_missing_admin_key_401(mongo_media_collection):
    before = mongo_media_collection.count_documents({})
    response = _post_upload("no-key.png", _make_image_bytes("PNG"), "image/png", key=None)
    assert response.status_code == 401
    assert mongo_media_collection.count_documents({}) == before


def test_upload_rejects_wrong_admin_key_401(mongo_media_collection):
    before = mongo_media_collection.count_documents({})
    response = _post_upload("wrong-key.png", _make_image_bytes("PNG"), "image/png", key="wrong-key")
    assert response.status_code == 401
    assert mongo_media_collection.count_documents({}) == before


def test_upload_rejects_empty_file_400(mongo_media_collection):
    before = mongo_media_collection.count_documents({})
    response = _post_upload("empty.png", b"", "image/png")
    assert response.status_code == 400
    assert mongo_media_collection.count_documents({}) == before


def test_upload_rejects_over_5mb_413(mongo_media_collection):
    before = mongo_media_collection.count_documents({})
    response = _post_upload("too-big.jpg", b"x" * (5 * 1024 * 1024 + 1), "image/jpeg")
    assert response.status_code == 413
    assert mongo_media_collection.count_documents({}) == before


def test_upload_rejects_svg_415(mongo_media_collection):
    before = mongo_media_collection.count_documents({})
    svg = b"<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><rect width='10' height='10'/></svg>"
    response = _post_upload("vector.svg", svg, "image/svg+xml")
    assert response.status_code == 415
    assert mongo_media_collection.count_documents({}) == before


def test_upload_rejects_non_image_bytes_415(mongo_media_collection):
    before = mongo_media_collection.count_documents({})
    response = _post_upload("fake.jpg", b"this is not image data", "image/jpeg")
    assert response.status_code == 415
    assert mongo_media_collection.count_documents({}) == before


def test_upload_rejects_corrupt_or_truncated_image_415(mongo_media_collection):
    before = mongo_media_collection.count_documents({})
    valid = _make_image_bytes("JPEG", size=(200, 200))
    truncated = valid[: len(valid) // 3]
    response = _post_upload("truncated.jpg", truncated, "image/jpeg")
    assert response.status_code == 415
    assert mongo_media_collection.count_documents({}) == before


def test_upload_rejects_mismatched_extension_415(mongo_media_collection):
    before = mongo_media_collection.count_documents({})
    png_bytes = _make_image_bytes("PNG")
    response = _post_upload("wrong-ext.jpg", png_bytes, "image/png")
    assert response.status_code == 415
    assert mongo_media_collection.count_documents({}) == before


def test_upload_rejects_mismatched_mime_415(mongo_media_collection):
    before = mongo_media_collection.count_documents({})
    png_bytes = _make_image_bytes("PNG")
    response = _post_upload("right-ext.png", png_bytes, "image/jpeg")
    assert response.status_code == 415
    assert mongo_media_collection.count_documents({}) == before


def test_upload_rejects_excessive_dimensions_413(mongo_media_collection):
    before = mongo_media_collection.count_documents({})
    huge = _make_image_bytes("PNG", size=(6000, 5000))
    response = _post_upload("huge.png", huge, "image/png")
    assert response.status_code == 413
    assert mongo_media_collection.count_documents({}) == before


@pytest.mark.asyncio
async def test_storage_read_with_fresh_init_session(mongo_media_collection, sample_images, uploaded_ids_for_cleanup):
    """Confirms persisted storage_path is readable after forcing a new storage init session."""
    filename, payload, mime = sample_images["png"]
    post = _post_upload(filename, payload, mime)
    assert post.status_code == 201, post.text
    uploaded = post.json()
    uploaded_ids_for_cleanup.append(uploaded["id"])

    record = mongo_media_collection.find_one({"id": uploaded["id"]}, {"_id": 0})
    assert record is not None
    assert record["storage_path"].startswith(f"{APP_NAME}/uploads/admin/")

    await init_storage(force=True)
    fetched_bytes = await get_object(record["storage_path"])
    assert hashlib.sha256(fetched_bytes).hexdigest() == hashlib.sha256(payload).hexdigest()


def test_soft_delete_uploaded_test_records(uploaded_ids_for_cleanup, mongo_media_collection):
    """Soft-delete test-created media metadata so later runs stay clean."""
    if not uploaded_ids_for_cleanup:
        pytest.skip("No uploaded media records to cleanup")
    result = mongo_media_collection.update_many(
        {"id": {"$in": uploaded_ids_for_cleanup}},
        {"$set": {"is_deleted": True}},
    )
    assert result.modified_count == len(uploaded_ids_for_cleanup)
