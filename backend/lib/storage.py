"""Persistent object storage; credentials and session keys never leave the server."""

import asyncio
import logging
import os

import httpx
from fastapi import HTTPException

logger = logging.getLogger(__name__)
STORAGE_URL = os.environ["INTEGRATION_PROXY_URL"].strip().rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ["EMERGENT_LLM_KEY"]
APP_NAME = os.environ["STORAGE_APP_NAME"]
if not all((os.environ["INTEGRATION_PROXY_URL"].strip(), EMERGENT_KEY, APP_NAME)):
    raise RuntimeError("Object storage configuration is incomplete")

_storage_key: str | None = None
_init_lock = asyncio.Lock()


async def init_storage(force: bool = False) -> str:
    global _storage_key
    async with _init_lock:
        if _storage_key and not force:
            return _storage_key
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY})
            response.raise_for_status()
            _storage_key = response.json()["storage_key"]
            return _storage_key


async def _object_request(method: str, path: str, data: bytes | None = None, content_type: str | None = None) -> httpx.Response:
    try:
        key = await init_storage()
        async with httpx.AsyncClient(timeout=120) as client:
            for attempt in range(2):
                headers = {"X-Storage-Key": key}
                if content_type:
                    headers["Content-Type"] = content_type
                response = await client.request(method, f"{STORAGE_URL}/objects/{path}", headers=headers, content=data)
                if response.status_code == 404 and attempt == 0:
                    key = await init_storage(force=True)
                    continue
                if response.status_code == 503 and attempt == 0:
                    await asyncio.sleep(0.5)
                    continue
                response.raise_for_status()
                return response
    except httpx.HTTPStatusError as exc:
        status = exc.response.status_code
        logger.warning("Object storage %s failed with status %s", method, status)
        if status == 439:
            message = "Image storage is full. Contact the site owner before uploading more images."
        elif status in (402, 403):
            message = "Image storage is currently unavailable for this account."
        elif status == 404 and method == "GET":
            raise HTTPException(status_code=404, detail="Image not found") from None
        else:
            message = "Image storage is temporarily unavailable. Please try again."
        raise HTTPException(status_code=503, detail=message) from None
    except (httpx.RequestError, ValueError, KeyError):
        logger.warning("Object storage request could not complete")
        raise HTTPException(status_code=503, detail="Image storage is temporarily unavailable. Please try again.") from None
    raise HTTPException(status_code=503, detail="Image storage is temporarily unavailable.")


async def put_object(path: str, data: bytes, content_type: str) -> dict:
    response = await _object_request("PUT", path, data, content_type)
    return response.json()


async def get_object(path: str) -> bytes:
    return (await _object_request("GET", path)).content