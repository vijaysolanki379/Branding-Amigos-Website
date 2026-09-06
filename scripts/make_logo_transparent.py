"""Cut the Branding Amigos logo out of its gradient background without touching the artwork.

Approach: estimate the smooth background (heavy downscale + upscale), subtract it,
derive an alpha matte from the residual, and un-premultiply colours so edges stay clean.
"""
import numpy as np
from PIL import Image

SRC = "/app/frontend/public/branding-amigos-logo.png"
MARK = "/app/frontend/public/branding-amigos-logo-mark.png"
FULL = "/app/frontend/public/branding-amigos-logo-transparent.png"

im = Image.open(SRC).convert("RGB")
img = np.asarray(im).astype(np.float32)

small = im.resize((48, 48), Image.BICUBIC)
bg = np.asarray(small.resize(im.size, Image.BICUBIC)).astype(np.float32)

diff = img - bg
lum = diff.max(axis=2)
t0, t1 = 10.0, 70.0
alpha = np.clip((lum - t0) / (t1 - t0), 0, 1)

a = alpha[..., None]
safe = np.maximum(a, 1e-3)
out_rgb = np.clip((img - bg * (1 - a)) / safe, 0, 255)
out_rgb = np.where(a > 0.01, out_rgb, 0)

out = np.dstack([out_rgb, alpha * 255]).astype(np.uint8)
res = Image.fromarray(out, "RGBA")

ys, xs = np.where(alpha > 0.03)
if len(xs):
    pad = 24
    x0 = max(int(xs.min()) - pad, 0)
    x1 = min(int(xs.max()) + pad, im.width)
    y0 = max(int(ys.min()) - pad, 0)
    y1 = min(int(ys.max()) + pad, im.height)
    res = res.crop((x0, y0, x1, y1))

res.save(FULL)
res.save(MARK)
print("saved transparent logo:", res.size)
