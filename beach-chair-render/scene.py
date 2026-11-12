"""Riva Sling - leather-look beach lounger concept render.

Run:  python scene.py <out.png> [scale%] [samples] [shot]
Needs the `bpy` pip module (Blender as a Python module).
"""

import math
import sys

import bpy
from mathutils import Matrix
import numpy as np

OUT = sys.argv[1] if len(sys.argv) > 1 else "render.png"
SCALE = int(sys.argv[2]) if len(sys.argv) > 2 else 100
SAMPLES = int(sys.argv[3]) if len(sys.argv) > 3 else 160
SHOT = sys.argv[4] if len(sys.argv) > 4 else "hero"
WAY = sys.argv[5] if len(sys.argv) > 5 else "sail"

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
coll = scene.collection

TUBE = 0.014
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
    obj = new_obj(name, verts, faces, mat, **kw)
    seg = np.linalg.norm(np.diff(prof, axis=0), axis=1)
    run = np.concatenate([[0], np.cumsum(seg)])
    grain = np.stack([np.broadcast_to(run[:, None], x.shape), x, d, np.ones_like(x)], 2)
    attr = obj.data.color_attributes.new("grain", "FLOAT_COLOR", "POINT")
    attr.data.foreach_set("color", grain.ravel())
    return obj


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
    col = ramp(nt, [(0.05, dark), (0.5, mid), (0.95, light)])
    tone = add(nt, "ShaderNodeAttribute", attribute_name="tone")
    shift = add(nt, "ShaderNodeMath", operation="ADD")
    link(patina.outputs["Fac"], shift.inputs[0])
    link(tone.outputs["Fac"], shift.inputs[1])
    link(shift.outputs["Value"], col.inputs["Fac"])
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


def wood(name, dark, light):
    mat, nt, bsdf = principled(name)
    link = nt.links.new
    grain = add(nt, "ShaderNodeAttribute", attribute_name="grain")
    mp = add(nt, "ShaderNodeMapping")
    mp.inputs["Scale"].default_value = (1.2, 55.0, 55.0)
    link(grain.outputs["Color"], mp.inputs["Vector"])
    streak = add(nt, "ShaderNodeTexNoise")
    streak.inputs["Scale"].default_value = 3.0
    streak.inputs["Detail"].default_value = 5
    streak.inputs["Distortion"].default_value = 0.8
    link(mp.outputs["Vector"], streak.inputs["Vector"])
    col = ramp(nt, [(0.3, dark), (0.7, light)])
    link(streak.outputs["Fac"], col.inputs["Fac"])
    link(col.outputs["Color"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.42
    bump = add(nt, "ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.15
    bump.inputs["Distance"].default_value = 0.002
    link(streak.outputs["Fac"], bump.inputs["Height"])
    link(bump.outputs["Normal"], bsdf.inputs["Normal"])
    return mat


def fabric(name, color, translucent=0.0):
    mat, nt, bsdf = principled(name)
    link = nt.links.new
    tc = add(nt, "ShaderNodeTexCoord")
    crease = add(nt, "ShaderNodeAttribute", attribute_name="crease")
    mul = add(nt, "ShaderNodeMix", data_type="RGBA", blend_type="MULTIPLY")
    link(crease.outputs["Fac"], mul.inputs["Factor"])
    mul.inputs["A"].default_value = (*color, 1)
    mul.inputs["B"].default_value = (0.5, 0.48, 0.45, 1)
    link(mul.outputs["Result"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.78
    bsdf.inputs["Sheen Weight"].default_value = 0.25
    weave = add(nt, "ShaderNodeTexVoronoi")
    weave.inputs["Scale"].default_value = 900
    link(tc.outputs["Object"], weave.inputs["Vector"])
    fold = add(nt, "ShaderNodeTexNoise")
    fold.inputs["Scale"].default_value = 14
    fold.inputs["Detail"].default_value = 4
    link(tc.outputs["Object"], fold.inputs["Vector"])
    b1 = add(nt, "ShaderNodeBump")
    b1.inputs["Strength"].default_value = 0.25
    b1.inputs["Distance"].default_value = 0.001
    link(weave.outputs["Distance"], b1.inputs["Height"])
    b2 = add(nt, "ShaderNodeBump")
    b2.inputs["Strength"].default_value = 0.3
    b2.inputs["Distance"].default_value = 0.012
    link(fold.outputs["Fac"], b2.inputs["Height"])
    link(b1.outputs["Normal"], b2.inputs["Normal"])
    link(b2.outputs["Normal"], bsdf.inputs["Normal"])
    if translucent:
        trans = add(nt, "ShaderNodeBsdfTranslucent")
        trans.inputs["Color"].default_value = (*color, 1)
        mix = add(nt, "ShaderNodeMixShader")
        mix.inputs["Fac"].default_value = translucent
        link(bsdf.outputs["BSDF"], mix.inputs[1])
        link(trans.outputs["BSDF"], mix.inputs[2])
        link(mix.outputs["Shader"], nt.nodes["Material Output"].inputs["Surface"])
    return mat


NAVY = (0.02, 0.04, 0.1)
HEMP = (0.6, 0.47, 0.3)
ECRU = (0.6, 0.54, 0.43)
WHITE = (0.74, 0.72, 0.67)
WAYS = {
    "sail": {"fabric": ECRU, "sail": WHITE, "rope": NAVY, "mark": NAVY, "canopy": NAVY},
    "navy": {"fabric": NAVY, "sail": WHITE, "rope": HEMP, "mark": NAVY, "canopy": NAVY},
    "rust": {"fabric": (0.5, 0.16, 0.055), "sail": ECRU, "rope": HEMP, "mark": (0.45, 0.14, 0.05), "canopy": (0.45, 0.14, 0.05)},
}
W = WAYS[WAY]
M_FABRIC = fabric("fabric", W["fabric"])
M_SAIL = fabric("sail", W["sail"], translucent=0.3)
M_ROPE = simple("rope", W["rope"], 0.9)
M_MARK = simple("mark", W["mark"], 0.8)
M_WOOD = wood("wood", (0.2, 0.1, 0.04), (0.5, 0.29, 0.13))
M_TEAK = M_WOOD
M_METAL = simple("metal", (0.9, 0.66, 0.33), 0.27, 1.0)
M_STRAP = leather("strap", (0.15, 0.05, 0.016), (0.4, 0.155, 0.05), (0.62, 0.31, 0.12))


def canvas_mat():
    mat, nt, bsdf = principled("canvas")
    link = nt.links.new
    uv = add(nt, "ShaderNodeAttribute", attribute_name="gore")
    col = ramp(nt, [(0.0, (0.82, 0.77, 0.66)), (0.5, (0.82, 0.77, 0.66)), (0.51, W["canopy"])])
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
LOOP_X = 0.33
ARM_W, ARM_T = 0.08, 0.032
BAR = (0.215, 0.43)
PIVOT_Z = 0.17
FRONT_RAIL = (-0.303, 0.25)
REAR_RAIL = (0.327, 0.16)
BACK_LEN = 0.6
ROPE_R = 0.0035


def set_attr(obj, name, values):
    attr = obj.data.color_attributes.new(name, "FLOAT_COLOR", "POINT")
    v = np.asarray(values, dtype=float).ravel()
    attr.data.foreach_set("color", np.stack([v, v, v, np.ones_like(v)], 1).ravel())


def resample(pts, n):
    pts = np.asarray(pts, dtype=float)
    seg = np.linalg.norm(np.diff(pts, axis=0), axis=1)
    s = np.concatenate([[0], np.cumsum(seg)])
    u = np.linspace(0, s[-1], n)
    return np.stack([np.interp(u, s, pts[:, i]) for i in range(pts.shape[1])], 1)


def loop_profile_var():
    corners = [np.array(c, dtype=float) for c in ((-0.24, 0.016), (-0.38, 0.54), (0.27, 0.43), (0.36, 0.016))]
    radii = [0.1, 0.15, 0.13, 0.1]
    out = []
    for i in range(4):
        p0, p1, p2 = corners[i - 1], corners[i], corners[(i + 1) % 4]
        d0 = (p0 - p1) / np.linalg.norm(p0 - p1)
        d1 = (p2 - p1) / np.linalg.norm(p2 - p1)
        half = math.acos(float(np.clip(d0 @ d1, -1, 1))) / 2
        r = radii[i]
        a, b = p1 + d0 * r / math.tan(half), p1 + d1 * r / math.tan(half)
        bis = (d0 + d1) / np.linalg.norm(d0 + d1)
        c = p1 + bis * (r / math.sin(half))
        va, vb = a - c, b - c
        tot = math.acos(float(np.clip(va @ vb / r**2, -1, 1)))
        for s in range(19):
            t = s / 18
            out.append(c + (math.sin((1 - t) * tot) * va + math.sin(t * tot) * vb) / math.sin(tot))
    mid = (out[0] + out[-1]) / 2
    return resample([mid, *out, mid], 420)


def lace(name, grommets, centers, dirs, e, hd, he, parent, cyclic=True):
    """Rope spiralling from grommet to grommet around a wooden member."""
    pts = []
    e = np.asarray(e, dtype=float)
    for i, c in enumerate(centers):
        d = np.asarray(dirs[i], dtype=float)
        c = np.asarray(c, dtype=float)
        pts.append(grommets[i])
        pts += [c - d * hd + e * he, c + d * hd + e * he, c + d * hd - e * he, c - d * hd - e * he]
    if not cyclic:
        pts.append(grommets[len(centers)])
    return tube(name, [tuple(p) for p in pts], ROPE_R, M_ROPE, cyclic=cyclic, parent=parent)


def grommet(pos, parent):
    ring = lathe_x(
        "grommet",
        [(-0.002, 0.0045), (-0.002, 0.009), (0.002, 0.009), (0.002, 0.0045), (-0.002, 0.0045)],
        M_METAL,
        seg=20,
        smooth=False,
        parent=parent,
    )
    ring.location = pos
    return ring


def side_panel(lp, sx, parent):
    """Interchangeable sailcloth panel laced into the arm loop."""
    ring = lp[:-1]
    nrm = normals2d(lp)[:-1]
    cen = ring.mean(axis=0)
    flip = np.sign(np.einsum("ij,ij->i", nrm, cen - ring))[:, None]
    inward = nrm * flip
    edge = ring + inward * 0.062
    holes = ring + inward * 0.078
    x = sx * LOOP_X
    new_obj("side_sail", [(x, p[0], p[1]) for p in edge], [tuple(range(len(edge)))], M_SAIL, smooth=False, parent=parent)
    n = 26
    idx = np.linspace(0, len(ring), n, endpoint=False).astype(int)
    half = (idx[1] - idx[0]) // 2
    pts = []
    for i in idx:
        g = (x, holes[i][0], holes[i][1])
        grommet(g, parent)
        j = (i + half) % len(ring)
        h = ring[j] + inward[j] * (ARM_T / 2 - 0.003)
        pts += [g, (x, h[0], h[1])]
    tube("lacing", pts, ROPE_R, M_ROPE, cyclic=True, parent=parent)


def build_chair(name, loc, rot_z, recline=118):
    root = bpy.data.objects.new(name, None)
    coll.objects.link(root)
    root.location = (loc[0], loc[1], float(sand_height(loc[0], loc[1])) + 0.004)
    root.rotation_euler = (0, 0, rot_z)
    folded = recline is None
    th = math.radians(-84 if folded else recline - 90)
    u = np.array([math.sin(th), math.cos(th)])
    f = np.array([-math.cos(th), math.sin(th)])
    piv = np.array([BAR[0] - 0.032 - (BAR[1] - PIVOT_Z) * math.tan(th), PIVOT_Z])
    if folded:
        piv = np.array([0.2, 0.345])
    top = piv + u * BACK_LEN

    # Arched wooden arm loops with laced sail panels: the arms are the chair.
    lp = loop_profile_var()
    for sx in (-1, 1):
        arm = strip("arm", lp, ARM_W, ARM_T, 0, M_WOOD, ex=0.4, en=0.55, k=32, parent=root)
        arm.location = (sx * LOOP_X, 0, 0)
        side_panel(lp, sx, root)
    reach = LOOP_X + ARM_W / 2 + 0.014
    for (y, z), r in ((FRONT_RAIL, 0.016), (REAR_RAIL, 0.016), (BAR, 0.015)):
        tube("rail", [(-reach, y, z), (reach, y, z)], r, M_WOOD, cyclic=False, parent=root)
        for sx in (-1, 1):
            cap = lathe_x("cap", [(0, 0.0), (0, r + 0.002), (0.004, r + 0.002), (0.004, 0.0)], M_METAL, seg=24, smooth=False, parent=root)
            cap.location = (sx * reach - (0.004 if sx < 0 else 0), y, z)

    # Reclining back frame: two stiles, sail panel laced between them.
    sx_stile = 0.238
    stile = np.linspace(piv - u * 0.03, top, 30)
    for sx in (-1, 1):
        st = strip("stile", stile, 0.034, 0.022, 0, M_WOOD, ex=0.4, en=0.55, k=24, parent=root)
        st.location = (sx * sx_stile, 0, 0)
    for p, r in ((top - u * 0.015, 0.013), (piv, 0.013)):
        tube("backrail", [(-sx_stile, p[0], p[1]), (sx_stile, p[0], p[1])], r, M_WOOD, cyclic=False, parent=root)
    sail = np.linspace(piv + u * 0.05, top - u * 0.05, 24)
    strip("back_sail", sail, 0.4, 0.0025, 0, M_SAIL, ex=0.05, en=0.5, k=16, parent=root)
    n = 9
    ts = np.linspace(0.07, BACK_LEN - 0.07, n)
    for sx in (-1, 1):
        gs = [np.array([sx * 0.182, *(piv + u * t)]) for t in ts]
        for g in gs:
            ring = grommet((0, 0, 0), root)
            ring.matrix_basis = Matrix(((0, 1, 0, g[0]), (f[0], 0, f[1], g[1]), (f[1], 0, -f[0], g[2]), (0, 0, 0, 1)))
        step = (ts[1] - ts[0]) / 2
        pts = []
        for t, g in zip(ts, gs, strict=True):
            h = piv + u * (t + step)
            pts += [tuple(g), (sx * (sx_stile - 0.015), h[0], h[1])]
        tube("back_lacing", pts[:-1], ROPE_R, M_ROPE, cyclic=False, parent=root)

    # Sail number on the back, readable from behind.
    cu = bpy.data.curves.new("mark", "FONT")
    cu.body = "07"
    cu.size = 0.15
    cu.align_x = "CENTER"
    cu.align_y = "CENTER"
    cu.extrude = 0.0006
    cu.materials.append(M_MARK)
    mark = bpy.data.objects.new("mark", cu)
    coll.objects.link(mark)
    mark.parent = root
    c = piv + u * 0.3 - f * 0.003
    mark.matrix_basis = Matrix(((-1, 0, 0, 0), (0, u[0], -f[0], c[0]), (0, u[1], -f[1], c[1]), (0, 0, 0, 1)))

    # Backpack straps.
    t = np.linspace(0, 1, 40)[:, None]
    strap = (piv + u * 0.06) + u * (BACK_LEN - 0.14) * t - f * (0.016 + 0.035 * np.sin(math.pi * t))
    for sx in (-1, 1):
        s = strip("strap", strap, 0.045, 0.005, 0, M_STRAP, ex=0.1, en=0.5, k=16, parent=root)
        s.location = (sx * 0.135, 0, 0)

    # Seat sling under the cushion.
    sling = catmull([(FRONT_RAIL[0], FRONT_RAIL[1] + 0.019), (-0.12, 0.185), (0.1, 0.16), (REAR_RAIL[0], REAR_RAIL[1] + 0.019)], 80)
    strip("seat_sail", sling, 0.5, 0.003, 0, M_SAIL, ex=0.05, en=0.5, k=16, parent=root)

    # One thick quilted pad draped over the back, seat and front rail.
    p4, p5 = piv + u * 0.1 + f * 0.015, np.array([piv[0] - 0.07, 0.186])
    p2 = top - u * 0.08 + f * 0.012
    p8 = np.array([FRONT_RAIL[0] - 0.005, FRONT_RAIL[1] + 0.022])
    path = [
        top - u * 0.13 - f * 0.036,
        top - u * 0.03 - f * 0.03,
        top + u * 0.022 - f * 0.004,
        p2,
        piv + u * 0.3 + f * 0.012,
        p4,
        p5,
        np.array([piv[0] - 0.2, 0.19]),
        np.array([-0.23, 0.232]),
        p8,
        np.array([FRONT_RAIL[0] - 0.036, FRONT_RAIL[1] - 0.05]),
        np.array([FRONT_RAIL[0] - 0.036, FRONT_RAIL[1] - 0.085]),
    ]
    cp = catmull(path, 520)
    near = lambda q: int(np.argmin(np.hypot(cp[:, 0] - q[0], cp[:, 1] - q[1])))
    i_top, i_crease, i_front = near(p2), near((p4 + p5) / 2), near(p8)
    cuts = [0, i_top, (i_top + i_crease) // 2, i_crease, (i_crease + i_front) // 2, i_front, len(cp) - 1]
    gain = [1.0, 1.0, 1.0, 1.0, 1.0, 0.45]
    puff = np.zeros(len(cp))
    amp = np.zeros(len(cp))
    for (a, b), g in zip(zip(cuts[:-1], cuts[1:], strict=True), gain, strict=True):
        tt = np.linspace(0, 1, b - a + 1)
        puff[a : b + 1] = np.sin(math.pi * tt) ** 0.42
        amp[a : b + 1] = g
    thick = 0.014 + 0.058 * puff * amp
    width = 0.535 - 0.02 * (1 - puff)
    pad = strip("cushion", cp, width, thick, 0.005 + thick / 2, M_FABRIC, ex=0.3, en=0.6, k=56, parent=root)
    set_attr(pad, "crease", np.repeat((1 - puff) ** 3, 56))
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
    cap = lathe_x("finial", [(0, 0.0), (0.0, 0.03), (0.05, 0.022), (0.08, 0.0)], M_METAL)
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
REAR = SHOT == "rear"
FOLD = SHOT == "fold"
TURN = math.pi if REAR else 0.0
build_chair("hero", (0.0, 0.0), math.radians(14 if not REAR else -12) + TURN, recline=None if FOLD else 118)
build_chair("pair", (2.0, 1.35), math.radians(-40) + TURN, recline=133)
build_parasol((3.0, 2.6))
build_world(sun_az=215 if REAR else 152, sun_el=15 if REAR else 13)

SHOTS = {
    "hero": ((-2.05, -2.55, 0.95), (0.03, 0.05, 0.36), 62, 4.0, (1800, 1200)),
    "fold": ((-1.75, -2.35, 1.75), (0.0, 0.0, 0.3), 62, 4.0, (1800, 1200)),
    "rear": ((-1.9, -2.6, 1.05), (0.03, 0.1, 0.38), 62, 4.0, (1800, 1200)),
    "wide": ((-3.6, -4.4, 1.25), (0.9, 0.9, 0.85), 40, 5.6, (1200, 1500)),
    "detail": ((-1.3, -1.0, 0.74), (-0.28, 0.0, 0.34), 60, 3.2, (1200, 1500)),
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
