import math, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
src, out, insp = sys.argv[1], sys.argv[2], sys.argv[3]
names = dict(a.split("=") for a in sys.argv[4:])
def crop(path, dst, aspect):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    if w / h > aspect:
        nw = int(h * aspect); x0 = (w - nw) // 2; im = im.crop((x0, 0, x0 + nw, h))
    else:
        nh = int(w / aspect); y0 = (h - nh) // 2; im = im.crop((0, y0, w, y0 + nh))
    im.save(f"{out}/{dst}", quality=90)
r = lambda n: f"{src}/{names.get(n, n)}"
crop(r("sail-hero.png"), "cover.jpg", 8.33 / 7.5)
crop(r("sail-hero.png"), "hero.jpg", 1.5)
crop(r("sail-rear.png"), "rear.jpg", 1.5)
crop(r("sail-fold.png"), "fold.jpg", 1.5)
crop(r("sail-detail.png"), "detail.jpg", 0.8)
crop(r("sail-wide.png"), "wide.jpg", 0.8)
for w in ("sail", "navy", "rust"):
    crop(r(f"{w}-hero.png"), f"way-{w}.jpg", 3.85 / 3.4)
crop(r("rust-hero.png"), "close.jpg", 5.63 / 4.9)
crop(f"{insp}/im-001.png", "sketch.jpg", 1024 / 674)
for i, n in enumerate((4, 7, 9, 11, 12, 14), 1):
    crop(f"{insp}/im-{n:03d}.png", f"insp{i}.jpg", 1.25)

# side-view recline diagram
W, H, SC = 1752, 1094, 1120
ox, oy = 860, 990
P = lambda y, z: (ox + y * SC, oy - z * SC)
im = Image.new("RGB", (W, H), "white"); d = ImageDraw.Draw(im)
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 46)
small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 38)
d.line([(60, oy + 26), (W - 60, oy + 26)], fill="#D9C7AE", width=6)
corners = [np.array(c) for c in ((-0.24, 0.016), (-0.38, 0.54), (0.27, 0.43), (0.36, 0.016))]
radii = [0.1, 0.15, 0.13, 0.1]; loop = []
for i in range(4):
    p0, p1, p2 = corners[i - 1], corners[i], corners[(i + 1) % 4]
    d0 = (p0 - p1) / np.linalg.norm(p0 - p1); d1 = (p2 - p1) / np.linalg.norm(p2 - p1)
    half = math.acos(float(d0 @ d1)) / 2; rr = radii[i]
    a, b = p1 + d0 * rr / math.tan(half), p1 + d1 * rr / math.tan(half)
    c = p1 + (d0 + d1) / np.linalg.norm(d0 + d1) * (rr / math.sin(half))
    va, vb = a - c, b - c; tot = math.acos(float(va @ vb) / rr**2)
    for s in range(19):
        t = s / 18; loop.append(c + (math.sin((1 - t) * tot) * va + math.sin(t * tot) * vb) / math.sin(tot))
loop.append(loop[0])
d.line([P(*p) for p in loop], fill="#B0672C", width=34, joint="curve")
d.line([P(-0.303, 0.25), P(-0.1, 0.19), P(0.1, 0.165), P(0.327, 0.16)], fill="#8A8F99", width=10, joint="curve")
for ang, col in ((133, "#9DB3CC"), (102, "#5E86B0"), (118, "#14213D")):
    th = math.radians(ang - 90)
    piv = np.array([0.215 - 0.032 - (0.43 - 0.17) * math.tan(th), 0.17])
    top = piv + np.array([math.sin(th), math.cos(th)]) * 0.6
    d.line([P(*piv), P(*top)], fill=col, width=18)
    x, y = P(*top); d.text((x + 18, y - 30), f"{ang}°", fill=col, font=font)
piv = np.array([0.2, 0.2]); top = piv + np.array([-0.58, 0.06])
pts = [P(*(piv + (top - piv) * t)) for t in np.linspace(0, 1, 15)]
for a, b in zip(pts[::2], pts[1::2]):
    d.line([a, b], fill="#B0672C", width=12)
d.text((P(-0.36, 0.33)[0] - 330, P(-0.36, 0.33)[1] + 60), "folded", fill="#B0672C", font=font)
d.text((70, 40), "Side view. Back shown at three recline angles and folded.", fill="#46505F", font=small)
im.save(f"{out}/fold.png")
