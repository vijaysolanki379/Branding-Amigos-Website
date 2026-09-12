"""Validate real image bytes without recoloring, resizing, or altering artwork."""

import warnings
from io import BytesIO
from pathlib import Path

from fastapi import HTTPException
from PIL import Image, UnidentifiedImageError

MAX_IMAGE_BYTES = 5 * 1024 * 1024
MAX_IMAGE_PIXELS = 25_000_000
MAX_TOTAL_PIXELS = 40_000_000
IMAGE_FORMATS = {
    "JPEG": ("image/jpeg", "jpg", {".jpg", ".jpeg"}),
    "PNG": ("image/png", "png", {".png"}),
    "WEBP": ("image/webp", "webp", {".webp"}),
    "GIF": ("image/gif", "gif", {".gif"}),
}


def validate_image(data: bytes, filename: str, content_type: str) -> tuple[str, str, int, int]:
    if not data:
        raise HTTPException(status_code=400, detail="The selected image is empty.")
    if len(data) > MAX_IMAGE_BYTES:
        raise HTTPException(status_code=413, detail="Choose an image no larger than 5 MB.")
    try:
        with warnings.catch_warnings():
            warnings.simplefilter("error", Image.DecompressionBombWarning)
            with Image.open(BytesIO(data)) as image:
                image_format = image.format
                if image_format not in IMAGE_FORMATS:
                    raise HTTPException(status_code=415, detail="Choose a JPG, PNG, WebP, or GIF image.")
                mime, extension, suffixes = IMAGE_FORMATS[image_format]
                if content_type != mime or Path(filename).suffix.lower() not in suffixes:
                    raise HTTPException(status_code=415, detail="The file type does not match its image contents.")
                width, height = image.size
                if width * height > MAX_IMAGE_PIXELS or width * height * getattr(image, "n_frames", 1) > MAX_TOTAL_PIXELS:
                    raise HTTPException(status_code=413, detail="This image has too many pixels or animation frames. Choose a smaller image.")
                image.verify()
            # Decode all frames too: a valid header alone is insufficient.
            with Image.open(BytesIO(data)) as image:
                for frame in range(getattr(image, "n_frames", 1)):
                    image.seek(frame)
                    image.load()
        return mime, extension, width, height
    except HTTPException:
        raise
    except (Image.DecompressionBombError, Image.DecompressionBombWarning):
        raise HTTPException(status_code=413, detail="This image has too many pixels. Choose a smaller image.") from None
    except (UnidentifiedImageError, OSError, ValueError, EOFError, SyntaxError):
        raise HTTPException(status_code=415, detail="This file is not a valid image. Choose a JPG, PNG, WebP, or GIF.") from None