from pathlib import Path

from PIL import Image


OUT_DIR = Path("/app/tests/assets")
OUT_DIR.mkdir(parents=True, exist_ok=True)

Image.new("RGB", (64, 64), color=(12, 120, 220)).save(OUT_DIR / "sample.png", format="PNG")
Image.new("RGB", (64, 64), color=(220, 120, 12)).save(OUT_DIR / "sample.jpg", format="JPEG", quality=90)
Image.new("RGB", (64, 64), color=(40, 180, 80)).save(OUT_DIR / "sample.webp", format="WEBP")
Image.new("RGB", (64, 64), color=(180, 40, 140)).save(OUT_DIR / "sample.gif", format="GIF")

with open(OUT_DIR / "empty.png", "wb") as f:
    f.write(b"")

with open(OUT_DIR / "sample.svg", "wb") as f:
    f.write(b"<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><rect width='10' height='10' /></svg>")

with open(OUT_DIR / "not-image.jpg", "wb") as f:
    f.write(b"this is not image data")
