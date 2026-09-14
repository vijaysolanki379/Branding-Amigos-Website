"""Upload-only CMS media, backed by Cloudinary and MongoDB references."""

import asyncio
import uuid
from datetime import datetime, timezone

from fastapi import HTTPException, UploadFile
from fastapi.responses import RedirectResponse
from pydantic import BaseModel

from lib.db import db
from lib.image_validation import MAX_IMAGE_BYTES, validate_image
from lib.storage import APP_NAME, put_object


class UploadedImage(BaseModel):
    id: str
    url: str
    original_filename: str
    content_type: str
    size: int
    width: int
    height: int


async def upload_image(file: UploadFile) -> UploadedImage:
    try:
        data = await file.read(MAX_IMAGE_BYTES + 1)
    finally:
        await file.close()

    filename = (
        (file.filename or "")
        .replace("\\", "/")
        .rsplit("/", 1)[-1][:255]
    )

    mime, extension, width, height = await asyncio.to_thread(
        validate_image,
        data,
        filename,
        file.content_type or "",
    )

    media_id = str(uuid.uuid4())

    result = await put_object(
        f"{APP_NAME}/uploads/admin/{media_id}.{extension}",
        data,
        mime,
    )

    uploaded = UploadedImage(
        id=media_id,
        url=f"/api/media/{media_id}",
        original_filename=filename,
        content_type=mime,
        size=len(data),
        width=width,
        height=height,
    )

    await db.media.insert_one({
        **uploaded.model_dump(),
        "storage_path": result["path"],
        "is_deleted": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    return uploaded


async def read_image(media_id: uuid.UUID) -> RedirectResponse:
    # Website artwork is public. No admin credential ever appears in an image URL.
    record = await db.media.find_one(
        {"id": str(media_id), "is_deleted": False},
        {"_id": 0},
    )

    if not record:
        raise HTTPException(status_code=404, detail="Image not found")

    storage_url = record.get("storage_path")

    if not storage_url or not storage_url.startswith(
        ("http://", "https://")
    ):
        raise HTTPException(status_code=404, detail="Image not found")

    return RedirectResponse(
        url=storage_url,
        status_code=307,
        headers={
            "Cache-Control": "public, max-age=31536000, immutable",
            "X-Content-Type-Options": "nosniff",
        },
    )
