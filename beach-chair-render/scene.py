"""Riva Sling - leather-look beach lounger concept render.

Run:  python scene.py <out.png> [scale%] [samples] [shot]
Needs the `bpy` pip module (Blender as a Python module).
"""

import math
import sys

import bpy
import numpy as np

OUT = sys.argv[1] if len(sys.argv) > 1 else "render.png"
SCALE = int(sys.argv[2]) if len(sys.argv) > 2 else 100
SAMPLES = int(sys.argv[3]) if len(sys.argv) > 3 else 160
SHOT = sys.argv[4] if len(sys.argv) > 4 else "hero"

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
coll = scene.collection

TUBE = 0.016
HALF_W = 0.33
WATER_Z = -0.32


# --------------------------------------------------------------- helpers
def sgnpow(v, e):
    return np.sign(v) * np.abs(v) ** e


def new_obj(name, verts, faces, mat=None, smooth=True, parent=None):
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata([tuple(v) for v in verts], [], faces)
    mesh.update()
    if smooth:
        mesh.polygons.foreach_set("use_smooth", [True] * len(mesh.polygons))
    obj = bpy.data.objects.new(name, mesh)
    coll.objects.link(obj)
    if mat:
        mesh.materials.append(mat)
    if parent:
        obj.parent = parent
    return obj


def catmull(points, n=400):
    """Dense, arc-length-uniform Catmull-Rom curve through 2D points."""
    p = np.array(points, dtype=float)
    p = np.vstack([2 * p[0] - p[1], p, 2 * p[-1] - p[-2]])
    out = []
    for i in range(1, len(p) - 2):
        t = np.linspace(0, 1, 40, endpoint=False)[:, None]
        a, b, c, d = p[i - 1], p[i], p[i + 1], p[i + 2]
        out.append(
            0.5
            * (
                2 * b
                + (c - a) * t
                + (2 * a - 5 * b + 4 * c - d) * t**2
                + (3 * b - a - 3 * c + d) * t**3
            )
        )
    out.append(p[-2][None, :])
    dense = np.vstack(out)
    seg = np.linalg.norm(np.diff(dense, axis=0), axis=1)
    s = np.concatenate([[0], np.cumsum(seg)])
    u = np.linspace(0, s[-1], n)
    return np.stack([np.interp(u, s, dense[:, 0]), np.interp(u, s, dense[:, 1])], 1)


def normals2d(prof):
    t = np.gradient(prof, axis=0)
    t /= np.linalg.norm(t, axis=1)[:, None]
    return np.stack([t[:, 1], -t[:, 0]], 1)


def strip(name, prof, width, thick, offset, mat, ex=0.25, en=0.6, k=48, **kw):
    """Sweep a rounded-rectangle section (in X / normal) along a YZ profile."""
    m = len(prof)
    nrm = normals2d(prof)
    thick = np.broadcast_to(np.asarray(thick, dtype=float), (m,))
    offset = np.broadcast_to(np.asarray(offset, dtype=float), (m,))
    width = np.broadcast_to(np.asarray(width, dtype=float), (m,))
    ang = np.linspace(0, 2 * math.pi, k, endpoint=False)
    lx = sgnpow(np.cos(ang), ex)
    ln = sgnpow(np.sin(ang), en)
    cen = prof + nrm * offset[:, None]
    x = (width[:, None] / 2) * lx[None, :]
    d = (thick[:, None] / 2) * ln[None, :]
    y = cen[:, 0:1] + nrm[:, 0:1] * d
    z = cen[:, 1:2] + nrm[:, 1:2] * d
    verts = np.stack([x, y, z], 2).reshape(-1, 3)
    faces = []
    for i in range(m - 1):
        for j in range(k):
            a, b = i * k + j, i * k + (j + 1) % k
            faces.append((a, b, b + k, a + k))
    faces.append(tuple(range(k - 1, -1, -1)))
    faces.append(tuple(range((m - 1) * k, m * k)))
    return new_obj(name, verts, faces, mat, **kw)


def lathe_x(name, profile, mat, seg=48, **kw):
    """Revolve (x, r) profile around the X axis."""
    verts, faces = [], []
    n = len(profile)
    for x, r in profile:
        for j in range(seg):
            a = 2 * math.pi * j / seg
            verts.append((x, r * math.cos(a), r * math.sin(a)))
    for i in range(n - 1):
        for j in range(seg):
            a, b = i * seg + j, i * seg + (j + 1) % seg
            faces.append((a, a + seg, b + seg, b))
    return new_obj(name, verts, faces, mat, **kw)


def fillet(points, radius, steps=14, closed=True):
    """Round the corners of a 3D polyline."""
    pts = [np.array(p, dtype=float) for p in points]
    n = len(pts)
    out = []
    for i in range(n):
        if not closed and i in (0, n - 1):
            out.append(pts[i])
            continue
        p0, p1, p2 = pts[i - 1], pts[i], pts[(i + 1) % n]
        d0 = (p0 - p1) / np.linalg.norm(p0 - p1)
        d1 = (p2 - p1) / np.linalg.norm(p2 - p1)
        half = math.acos(float(np.clip(d0 @ d1, -1, 1))) / 2
        cut = radius / math.tan(half)
        a, b = p1 + d0 * cut, p1 + d1 * cut
        bis = (d0 + d1) / np.linalg.norm(d0 + d1)
        c = p1 + bis * (radius / math.sin(half))
        va, vb = a - c, b - c
        tot = math.acos(float(np.clip(va @ vb / radius**2, -1, 1)))
        for s in range(steps + 1):
            f = s / steps
            v = (math.sin((1 - f) * tot) * va + math.sin(f * tot) * vb) / math.sin(tot)
            out.append(c + v)
    return out


def tube(name, pts, radius, mat, cyclic=True, parent=None):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    sp = cu.splines.new("POLY")
    sp.points.add(len(pts) - 1)
    for p, co in zip(sp.points, pts, strict=True):
        p.co = (*co, 1)
    sp.use_cyclic_u = cyclic
    cu.bevel_depth = radius
    cu.bevel_resolution = 8
    cu.use_fill_caps = True
    cu.materials.append(mat)
    obj = bpy.data.objects.new(name, cu)
    coll.objects.link(obj)
    if parent:
        obj.parent = parent
    return obj


# ------------------------------------------------------------- materials
def principled(name):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    return mat, nt, nt.nodes["Principled BSDF"]


def add(nt, kind, **props):
    node = nt.nodes.new(kind)
    for key, val in props.items():
        setattr(node, key, val)
    return node


def ramp(nt, stops):
    node = nt.nodes.new("ShaderNodeValToRGB")
    els = node.color_ramp.elements
    while len(els) < len(stops):
        els.new(0.5)
    for el, (pos, col) in zip(els, stops, strict=True):
        el.position = pos
        el.color = (*col, 1)
    return node


def leather(name, dark, mid, light, crease_dark=0.45):
    mat, nt, bsdf = principled(name)
    link = nt.links.new
    tc = add(nt, "ShaderNodeTexCoord")
    patina = add(nt, "ShaderNodeTexNoise")
    patina.inputs["Scale"].default_value = 7
    patina.inputs["Detail"].default_value = 9
    patina.inputs["Roughness"].default_value = 0.62
    patina.inputs["Distortion"].default_value = 0.6
    link(tc.outputs["Object"], patina.inputs["Vector"])
    col = ramp(nt, [(0.3, dark), (0.52, mid), (0.74, light)])
    link(patina.outputs["Fac"], col.inputs["Fac"])
    crease = add(nt, "ShaderNodeAttribute", attribute_name="crease")
    mul = add(nt, "ShaderNodeMix", data_type="RGBA", blend_type="MULTIPLY")
    link(crease.outputs["Fac"], mul.inputs["Factor"])
    link(col.outputs["Color"], mul.inputs["A"])
    mul.inputs["B"].default_value = (crease_dark, crease_dark * 0.8, crease_dark * 0.7, 1)
    link(mul.outputs["Result"], bsdf.inputs["Base Color"])
    rough = add(nt, "ShaderNodeMapRange")
    rough.inputs["To Min"].default_value = 0.3
    rough.inputs["To Max"].default_value = 0.58
    link(patina.outputs["Fac"], rough.inputs["Value"])
    link(rough.outputs["Result"], bsdf.inputs["Roughness"])
    bsdf.inputs["Coat Weight"].default_value = 0.12
    bsdf.inputs["Coat Roughness"].default_value = 0.25
    grain = add(nt, "ShaderNodeTexVoronoi", feature="DISTANCE_TO_EDGE")
    grain.inputs["Scale"].default_value = 520
    link(tc.outputs["Object"], grain.inputs["Vector"])
    wrinkle = add(nt, "ShaderNodeTexNoise")
    wrinkle.inputs["Scale"].default_value = 45
    wrinkle.inputs["Detail"].default_value = 6
    link(tc.outputs["Object"], wrinkle.inputs["Vector"])
    b1 = add(nt, "ShaderNodeBump")
    b1.inputs["Strength"].default_value = 0.22
    b1.inputs["Distance"].default_value = 0.002
    link(grain.outputs["Distance"], b1.inputs["Height"])
    b2 = add(nt, "ShaderNodeBump")
    b2.inputs["Strength"].default_value = 0.35
    b2.inputs["Distance"].default_value = 0.006
    link(wrinkle.outputs["Fac"], b2.inputs["Height"])
    link(b1.outputs["Normal"], b2.inputs["Normal"])
    link(b2.outputs["Normal"], bsdf.inputs["Normal"])
    return mat


def simple(name, color, rough, metallic=0.0):
    mat, _, bsdf = principled(name)
    bsdf.inputs["Base Color"].default_value = (*color, 1)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metallic
    return mat


M_COGNAC = leather("cognac", (0.13, 0.042, 0.014), (0.36, 0.135, 0.045), (0.6, 0.3, 0.12))
M_ESPRESSO = leather("espresso", (0.02, 0.01, 0.006), (0.05, 0.022, 0.012), (0.1, 0.05, 0.025))
M_FRAME = simple("frame", (0.012, 0.012, 0.013), 0.42)
M_BRASS = simple("brass", (0.86, 0.6, 0.25), 0.22, 1.0)
M_TEAK = simple("teak", (0.3, 0.16, 0.07), 0.5)


def canvas_mat():
    mat, nt, bsdf = principled("canvas")
    link = nt.links.new
    uv = add(nt, "ShaderNodeAttribute", attribute_name="gore")
    col = ramp(nt, [(0.0, (0.82, 0.77, 0.66)), (0.5, (0.82, 0.77, 0.66)), (0.51, (0.2, 0.075, 0.03))])
    link(uv.outputs["Fac"], col.inputs["Fac"])
    link(col.outputs["Color"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.85
    trans = add(nt, "ShaderNodeBsdfTranslucent")
    link(col.outputs["Color"], trans.inputs["Color"])
    mix = add(nt, "ShaderNodeMixShader")
    mix.inputs["Fac"].default_value = 0.3
    link(bsdf.outputs["BSDF"], mix.inputs[1])
    link(trans.outputs["BSDF"], mix.inputs[2])
    link(mix.outputs["Shader"], nt.nodes["Material Output"].inputs["Surface"])
    return mat


M_CANVAS = canvas_mat()


# ------------------------------------------------------------------ sand
def sand_height(x, y):
    r = np.hypot(x, y)
    dune = 0.035 * np.sin(x * 0.9 + 1.3 * np.sin(y * 0.5)) * np.sin(y * 0.7 + 0.8)
    dune += 0.02 * np.sin(x * 2.3 + y * 1.1 + 2.0) * np.cos(y * 1.9 - x * 0.4)
    dune *= np.clip(r / 3.0, 0.15, 1)
    warp = 2.2 * np.sin(x * 1.1 + 0.6 * np.sin(y * 1.7)) + 1.6 * np.sin(y * 0.9 + x * 0.35)
    phase = 2 * math.pi * (0.25 * x + y) / 0.13 + warp
    ripple = 0.005 * (np.sin(phase) + 0.35 * np.sin(2 * phase + 1.0))
    ripple *= 0.6 + 0.4 * np.sin(x * 0.7 + y * 0.45)
    ripple *= np.exp(-((r / 7.0) ** 2))
    lump = 0.004 * np.sin(x * 9.1 + 3 * np.sin(y * 6.3)) * np.sin(y * 8.3 + 2 * np.sin(x * 5.1))
    shore = np.clip((y - 4.5) / 4.0, 0, None)
    return dune + ripple + lump - 0.33 * shore**1.25


def build_sand():
    n = 640
    a = np.linspace(-1, 1, n)
    g = 5 * a + 400 * a**5
    xx, yy = np.meshgrid(g, g, indexing="xy")
    zz = sand_height(xx, yy)
    verts = np.stack([xx, yy, zz], 2).reshape(-1, 3)
    idx = np.arange(n * n).reshape(n, n)
    quads = np.stack([idx[:-1, :-1], idx[:-1, 1:], idx[1:, 1:], idx[1:, :-1]], 2).reshape(-1, 4)
    mesh = bpy.data.meshes.new("sand")
    mesh.vertices.add(len(verts))
    mesh.vertices.foreach_set("co", verts.ravel())
    mesh.loops.add(quads.size)
    mesh.loops.foreach_set("vertex_index", quads.ravel())
    mesh.polygons.add(len(quads))
    mesh.polygons.foreach_set("loop_start", np.arange(0, quads.size, 4))
    mesh.polygons.foreach_set("use_smooth", np.ones(len(quads), dtype=bool))
    mesh.update(calc_edges=True)
    obj = bpy.data.objects.new("sand", mesh)
    coll.objects.link(obj)

    mat, nt, bsdf = principled("sand")
    link = nt.links.new
    geo = add(nt, "ShaderNodeNewGeometry")
    sep = add(nt, "ShaderNodeSeparateXYZ")
    link(geo.outputs["Position"], sep.inputs["Vector"])
    tone = add(nt, "ShaderNodeTexNoise")
    tone.inputs["Scale"].default_value = 1.3
    tone.inputs["Detail"].default_value = 6
    link(geo.outputs["Position"], tone.inputs["Vector"])
    dry = ramp(nt, [(0.3, (0.72, 0.5, 0.29)), (0.7, (0.9, 0.68, 0.42))])
    link(tone.outputs["Fac"], dry.inputs["Fac"])
    wet = add(nt, "ShaderNodeMapRange")
    wet.inputs["From Min"].default_value = WATER_Z + 0.2
    wet.inputs["From Max"].default_value = WATER_Z + 0.06
    link(sep.outputs["Z"], wet.inputs["Value"])
    mix = add(nt, "ShaderNodeMix", data_type="RGBA")
    link(wet.outputs["Result"], mix.inputs["Factor"])
    link(dry.outputs["Color"], mix.inputs["A"])
    mix.inputs["B"].default_value = (0.2, 0.14, 0.09, 1)
    link(mix.outputs["Result"], bsdf.inputs["Base Color"])
    rough = add(nt, "ShaderNodeMapRange")
    rough.inputs["To Min"].default_value = 0.92
    rough.inputs["To Max"].default_value = 0.12
    link(wet.outputs["Result"], rough.inputs["Value"])
    link(rough.outputs["Result"], bsdf.inputs["Roughness"])
    grain = add(nt, "ShaderNodeTexNoise")
    grain.inputs["Scale"].default_value = 900
    grain.inputs["Detail"].default_value = 3
    link(geo.outputs["Position"], grain.inputs["Vector"])
    clump = add(nt, "ShaderNodeTexNoise")
    clump.inputs["Scale"].default_value = 60
    clump.inputs["Detail"].default_value = 5
    link(geo.outputs["Position"], clump.inputs["Vector"])
    b1 = add(nt, "ShaderNodeBump")
    b1.inputs["Strength"].default_value = 0.5
    b1.inputs["Distance"].default_value = 0.002
    link(grain.outputs["Fac"], b1.inputs["Height"])
    b2 = add(nt, "ShaderNodeBump")
    b2.inputs["Strength"].default_value = 0.5
    b2.inputs["Distance"].default_value = 0.01
    link(clump.outputs["Fac"], b2.inputs["Height"])
    link(b1.outputs["Normal"], b2.inputs["Normal"])
    link(b2.outputs["Normal"], bsdf.inputs["Normal"])
    mesh.materials.append(mat)


def build_sea():
    s = 4000
    obj = new_obj(
        "sea",
        [(-s, -50, WATER_Z), (s, -50, WATER_Z), (s, s, WATER_Z), (-s, s, WATER_Z)],
        [(0, 1, 2, 3)],
        smooth=False,
    )
    mat, nt, bsdf = principled("sea")
    link = nt.links.new
    geo = add(nt, "ShaderNodeNewGeometry")
    sep = add(nt, "ShaderNodeSeparateXYZ")
    link(geo.outputs["Position"], sep.inputs["Vector"])
    depth = add(nt, "ShaderNodeMapRange")
    depth.inputs["From Min"].default_value = 8
    depth.inputs["From Max"].default_value = 60
    link(sep.outputs["Y"], depth.inputs["Value"])
    col = ramp(nt, [(0.0, (0.16, 0.6, 0.55)), (0.25, (0.01, 0.3, 0.36)), (1.0, (0.002, 0.06, 0.13))])
    link(depth.outputs["Result"], col.inputs["Fac"])
    wob = add(nt, "ShaderNodeTexNoise")
    wob.inputs["Scale"].default_value = 0.6
    link(geo.outputs["Position"], wob.inputs["Vector"])
    edge = add(nt, "ShaderNodeMath", operation="MULTIPLY_ADD")
    edge.inputs[1].default_value = 1.6
    link(wob.outputs["Fac"], edge.inputs[0])
    link(sep.outputs["Y"], edge.inputs[2])
    foam = add(nt, "ShaderNodeMapRange")
    foam.inputs["From Min"].default_value = 10.6
    foam.inputs["From Max"].default_value = 10.0
    link(edge.outputs["Value"], foam.inputs["Value"])
    mix = add(nt, "ShaderNodeMix", data_type="RGBA")
    link(foam.outputs["Result"], mix.inputs["Factor"])
    link(col.outputs["Color"], mix.inputs["A"])
    mix.inputs["B"].default_value = (0.9, 0.9, 0.88, 1)
    link(mix.outputs["Result"], bsdf.inputs["Base Color"])
    rough = add(nt, "ShaderNodeMapRange")
    rough.inputs["To Min"].default_value = 0.06
    rough.inputs["To Max"].default_value = 0.6
    link(foam.outputs["Result"], rough.inputs["Value"])
    link(rough.outputs["Result"], bsdf.inputs["Roughness"])
    bsdf.inputs["IOR"].default_value = 1.33
    bsdf.inputs["Specular IOR Level"].default_value = 0.3
    mp = add(nt, "ShaderNodeMapping")
    mp.inputs["Scale"].default_value = (0.25, 1.0, 1.0)
    link(geo.outputs["Position"], mp.inputs["Vector"])
    waves = add(nt, "ShaderNodeTexNoise")
    waves.inputs["Scale"].default_value = 1.4
    waves.inputs["Detail"].default_value = 5
    link(mp.outputs["Vector"], waves.inputs["Vector"])
    bump = add(nt, "ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.35
    bump.inputs["Distance"].default_value = 0.25
    link(waves.outputs["Fac"], bump.inputs["Height"])
    link(bump.outputs["Normal"], bsdf.inputs["Normal"])
    obj.data.materials.append(mat)


# ----------------------------------------------------------------- chair
def arc(center, radius, a0, a1, n=5):
    return [
        (center[0] + radius * math.cos(math.radians(a)), center[1] + radius * math.sin(math.radians(a)))
        for a in np.linspace(a0, a1, n)
    ]


TOP = (0.62, 0.78)
FRONT = (-0.42, 0.36)


def build_chair(name, loc, rot_z):
    root = bpy.data.objects.new(name, None)
    coll.objects.link(root)
    sink = float(sand_height(loc[0], loc[1])) + 0.006
    root.location = (loc[0], loc[1], sink)
    root.rotation_euler = (0, 0, rot_z)
    a = HALF_W

    # One continuous bent tube: sled runners, raked legs and both cross bars.
    side = [(TOP[0], TOP[1]), (0.42, TUBE), (-0.3, TUBE), (FRONT[0], FRONT[1])]
    loop = [(a, y, z) for y, z in side] + [(-a, y, z) for y, z in reversed(side)]
    tube("frame", fillet(loop, 0.075), TUBE, M_FRAME, parent=root)
    tube("brace", [(-a, 0.34, TUBE), (a, 0.34, TUBE)], TUBE * 0.8, M_FRAME, cyclic=False, parent=root)

    # Structural hide: wraps both bars and folds back under itself.
    wrap = 0.0215
    path = (
        [(0.47, 0.6), (0.575, 0.735)]
        + arc(TOP, wrap, -75, 125, 6)
        + [(0.47, 0.6), (0.31, 0.385), (0.15, 0.245), (0.0, 0.212), (-0.16, 0.238), (-0.31, 0.305)]
        + arc(FRONT, wrap, 65, 265, 6)
        + [(-0.35, 0.3), (-0.26, 0.262)]
    )
    path[0] = (0.455, 0.565)
    prof = catmull(path, 700)
    strip("hide", prof, 0.6, 0.006, 0, M_ESPRESSO, ex=0.08, en=0.5, k=32, parent=root)

    # Channel-quilted cushion riding on the hide.
    i0 = int(np.argmin(np.hypot(prof[:, 0] - 0.585, prof[:, 1] - 0.77)))
    i1 = int(np.argmin(np.hypot(prof[:, 0] + 0.385, prof[:, 1] - 0.352)))
    cp = prof[i0:i1]
    u = np.linspace(0, 1, len(cp))
    channels = 9
    puff = np.abs(np.sin(math.pi * channels * u)) ** 0.55
    taper = np.clip(np.minimum(u, 1 - u) / 0.035, 0, 1) ** 0.6
    thick = 0.012 + (0.03 + 0.05 * puff) * taper
    width = 0.545 - 0.012 * (1 - puff)
    cushion = strip("cushion", cp, width, thick, 0.004 + thick / 2, M_COGNAC, k=56, parent=root)
    attr = cushion.data.color_attributes.new("crease", "FLOAT_COLOR", "POINT")
    cr = np.repeat((1 - puff) ** 3, 56)
    attr.data.foreach_set("color", np.stack([cr, cr, cr, np.ones_like(cr)], 1).ravel())

    # Bolster headrest with two espresso straps and brass buckles.
    nrm = normals2d(cp)
    k = int(0.115 * len(cp))
    top_of_cushion = 0.004 + thick[k]
    radius = 0.058
    cen = cp[k] + nrm[k] * (top_of_cushion + radius * 0.82)
    th = np.linspace(0.02, math.pi - 0.02, 60)
    bol = lathe_x(
        "bolster",
        [(0.235 * sgnpow(math.cos(t), 0.3), radius * math.sin(t) ** 0.3) for t in th],
        M_COGNAC,
        parent=root,
    )
    bol.location = (0, cen[0], cen[1])
    for sx in (-0.13, 0.13):
        r0, r1, w = radius * 0.985, radius + 0.004, 0.019
        band = lathe_x(
            "strap",
            [(-w, r0), (-w, r1), (w, r1), (w, r0), (-w, r0)],
            M_ESPRESSO,
            smooth=False,
            parent=root,
        )
        band.location = (sx, cen[0], cen[1])
        d = 0.011
        bx = [(sx + i * 0.022, j * 0.012, kk * d) for i in (-1, 1) for j in (-1, 1) for kk in (0, 1)]
        buckle = new_obj(
            "buckle",
            bx,
            [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)],
            M_BRASS,
            smooth=False,
            parent=root,
        )
        ang = math.atan2(nrm[k][1], nrm[k][0]) - math.pi / 2 + 0.5
        buckle.rotation_euler = (ang, 0, 0)
        buckle.location = (
            0,
            cen[0] + (radius + 0.002) * math.cos(ang + math.pi / 2),
            cen[1] + (radius + 0.002) * math.sin(ang + math.pi / 2),
        )

    # Brass collars where the hide meets the tube.
    for cy, cz in (TOP, FRONT):
        for sx in (-1, 1):
            x0 = sx * 0.3
            col = lathe_x(
                "collar",
                [
                    (x0, TUBE),
                    (x0, TUBE + 0.011),
                    (x0 + sx * 0.012, TUBE + 0.011),
                    (x0 + sx * 0.012, TUBE),
                ],
                M_BRASS,
                smooth=False,
                parent=root,
            )
            col.location = (0, cy, cz)
    return root


def build_parasol(loc):
    base = float(sand_height(loc[0], loc[1]))
    tube("pole", [(loc[0], loc[1], base - 0.3), (loc[0], loc[1], base + 2.45)], 0.021, M_TEAK, cyclic=False)
    gores, per, rings = 10, 12, 16
    seg = gores * per
    big_r, rise, top = 1.3, 0.42, base + 2.42
    verts, faces, gore = [], [], []
    for i in range(rings + 3):
        f = min(i, rings) / rings
        drop = max(i - rings, 0) * 0.07
        for j in range(seg):
            phi = 2 * math.pi * j / seg
            g = abs(math.cos(phi * gores / 2))
            sag = 0.05 * f * (1 - g**0.5)
            r = big_r * max(f, 0.012) * (1 - 0.03 * f * (1 - g))
            z = top - rise * f**1.25 - sag - drop
            if i == rings + 2:
                z += 0.035 * (1 - abs(math.cos(phi * gores)))
            verts.append((loc[0] + r * math.cos(phi), loc[1] + r * math.sin(phi), z))
            gore.append(1.0 if i > rings else 0.0)
    for i in range(rings + 2):
        for j in range(seg):
            a, b = i * seg + j, i * seg + (j + 1) % seg
            faces.append((a, b, b + seg, a + seg))
    obj = new_obj("canopy", verts, faces, M_CANVAS)
    attr = obj.data.color_attributes.new("gore", "FLOAT_COLOR", "POINT")
    arr = np.array(gore)
    attr.data.foreach_set("color", np.stack([arr, arr, arr, np.ones_like(arr)], 1).ravel())
    cap = lathe_x("finial", [(0, 0.0), (0.0, 0.03), (0.05, 0.022), (0.08, 0.0)], M_BRASS)
    cap.rotation_euler = (0, -math.pi / 2, 0)
    cap.location = (loc[0], loc[1], top)


# ----------------------------------------------------------------- world
def build_world(sun_az, sun_el):
    world = bpy.data.worlds.new("world")
    world.use_nodes = True
    scene.world = world
    nt = world.node_tree
    sky = nt.nodes.new("ShaderNodeTexSky")
    names = [e.identifier for e in sky.bl_rna.properties["sky_type"].enum_items]
    for want in ("MULTIPLE_SCATTERING", "NISHITA", "HOSEK_WILKIE"):
        if want in names:
            sky.sky_type = want
            break
    if hasattr(sky, "sun_disc"):
        sky.sun_disc = False
        sky.sun_elevation = math.radians(sun_el)
        sky.sun_rotation = math.radians(90 - sun_az)
        for prop, val in (("air_density", 1.0), ("aerosol_density", 0.7), ("dust_density", 0.8)):
            if hasattr(sky, prop):
                setattr(sky, prop, val)
    bg = nt.nodes["Background"]
    bg.inputs["Strength"].default_value = 0.16
    nt.links.new(sky.outputs["Color"], bg.inputs["Color"])

    sun = bpy.data.lights.new("sun", "SUN")
    sun.energy = 9.0
    sun.color = (1.0, 0.66, 0.38)
    sun.angle = math.radians(2.2)
    obj = bpy.data.objects.new("sun", sun)
    coll.objects.link(obj)
    az, el = math.radians(sun_az), math.radians(sun_el)
    direction = np.array([math.cos(el) * math.cos(az), math.cos(el) * math.sin(az), math.sin(el)])
    obj.rotation_euler = (math.radians(90 - sun_el), 0, az + math.pi / 2)
    return direction


def camera(loc, target, lens, fstop):
    cam = bpy.data.cameras.new("cam")
    cam.lens = lens
    cam.dof.use_dof = True
    cam.dof.aperture_fstop = fstop
    obj = bpy.data.objects.new("cam", cam)
    coll.objects.link(obj)
    obj.location = loc
    d = np.array(target) - np.array(loc)
    cam.dof.focus_distance = float(np.linalg.norm(d))
    obj.rotation_euler = (math.atan2(math.hypot(d[0], d[1]), -d[2]), 0, math.atan2(d[1], d[0]) - math.pi / 2)
    scene.camera = obj


# ----------------------------------------------------------------- build
build_sand()
build_sea()
build_chair("hero", (0.0, 0.0), math.radians(-12))
build_chair("pair", (1.75, 1.7), math.radians(-52))
build_parasol((3.0, 2.6))
build_world(sun_az=152, sun_el=13)

SHOTS = {
    "hero": ((-2.25, -2.75, 0.98), (0.05, 0.12, 0.38), 62, 4.0, (1800, 1200)),
    "side": ((-3.3, -0.35, 0.62), (0.0, 0.1, 0.4), 80, 4.0, (1800, 1200)),
    "wide": ((-3.6, -4.4, 1.25), (0.9, 0.9, 0.85), 40, 5.6, (1200, 1500)),
    "detail": ((-0.95, -1.15, 1.05), (0.02, 0.3, 0.52), 70, 3.2, (1200, 1500)),
}
loc_, tgt_, lens_, fstop_, res_ = SHOTS[SHOT]
camera(loc_, tgt_, lens_, fstop_)

scene.render.engine = "CYCLES"
scene.cycles.samples = SAMPLES
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 6
scene.render.resolution_x, scene.render.resolution_y = res_
scene.render.resolution_percentage = SCALE
scene.render.threads_mode = "AUTO"
scene.view_settings.view_transform = "AgX"
scene.view_settings.look = "AgX - Punchy"
scene.view_settings.exposure = 0.3
scene.render.filepath = OUT
bpy.ops.render.render(write_still=True)
