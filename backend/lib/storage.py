"""Cloudinary-backed persistent image storage."""

import io
import logging
import os

import cloudinary
import cloudinary.uploader
import httpx
from fastapi import HTTPException

logger = logging.getLogger(__name__)

APP_NAME = os.environ.get("CLOUDINARY_FOLDER", "branding-amigos").strip().strip("/")

CLOUD_NAME = os.environ.get("CLOUDINARY_CLOUD_NAME", "").strip()
API_KEY = os.environ.get("CLOUDINARY_API_KEY", "").strip()
API_SECRET = os.environ.get("CLOUDINARY_API_SECRET", "").strip()

CLOUDINARY_CONFIGURED = all((CLOUD_NAME, API_KEY, API_SECRET))

if CLOUDINARY_CONFIGURED:
    cloudinary.config(
        cloud_name=CLOUD_NAME,
        api_key=API_KEY,
        api_secret=API_SECRET,
        secure=True,
    )


async def init_storage(force: bool = False) -> str:
    """Initialize/validate Cloudinary configuration.

    The backend is allowed to start without Cloudinary credentials so that
    non-media API functionality remains available. Media operations will
    return a clear configuration error until the credentials are added.
    """
    return "cloudinary" if CLOUDINARY_CONFIGURED else ""


def _require_cloudinary() -> None:
    if not CLOUDINARY_CONFIGURED:
        raise HTTPException(
            status_code=503,
            detail="Image storage is not configured. Please configure Cloudinary.",
        )


async def put_object(path: str, data: bytes, content_type: str) -> dict:
    """Upload an image to Cloudinary and return its delivery URL."""
    _require_cloudinary()

    filename = path.rsplit("/", 1)[-1]
    public_id = path.rsplit(".", 1)[0]

    stream = io.BytesIO(data)
    stream.name = filename

    try:
        result = await __import__("asyncio").to_thread(
            cloudinary.uploader.upload,
            stream,
            public_id=public_id,
            resource_type="image",
            overwrite=False,
            unique_filename=False,
            use_filename=False,
        )
    except Exception:
        logger.exception("Cloudinary image upload failed")
        raise HTTPException(
            status_code=503,
            detail="Image storage is temporarily unavailable. Please try again.",
        ) from None

    return {
        "path": result["secure_url"],
        "secure_url": result["secure_url"],
        "public_id": result.get("public_id"),
    }


async def get_object(path: str) -> bytes:
    """Retrieve an image from its stored Cloudinary URL."""
    _require_cloudinary()

    if not path.startswith(("http://", "https://")):
        raise HTTPException(status_code=404, detail="Image not found")

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.get(path)
            response.raise_for_status()
            return response.content
    except httpx.HTTPStatusError as exc:
        logger.warning("Cloudinary image retrieval failed with status %s", exc.response.status_code)
        if exc.response.status_code == 404:
            raise HTTPException(status_code=404, detail="Image not found") from None
        raise HTTPException(
            status_code=503,
            detail="Image storage is temporarily unavailable. Please try again.",
        ) from None
    except httpx.RequestError:
        logger.warning("Cloudinary image retrieval request failed")
        raise HTTPException(
            status_code=503,
            detail="Image storage is temporarily unavailable. Please try again.",
        ) from None
