const path = require("node:path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const pptxgen = require("pptxgenjs");
const fa = require("react-icons/fa");
const { applyTheme } = require(
  "/root/.claude/skills/synced/00bcae8e-d7a7-47c6-99de-288523ecda85_e5259d2e-b140-453a-8556-3af5e9c3177c/pptx/scripts/apply_theme.js"
);

const IMG = path.join(__dirname, "img");
const OUT = process.argv[2];
const img = (n) => path.join(IMG, n);

const THEME = {
  name: "Marea",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "2A1A12",
    lt1: "FFFFFF",
    dk2: "5E4A3E",
    lt2: "F3EEE8",
    accent1: "A8572A",
    accent2: "1F5F66",
    accent3: "C9A15A",
    accent4: "D9C7AE",
    accent5: "141414",
    accent6: "8A7A6C",
    hlink: "A8572A",
    folHlink: "5E4A3E",
  },
};

async function icon(name, hex) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(fa[name], { color: `#${hex}`, size: 256 })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return `image/png;base64,${buf.toString("base64")}`;
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = "Marea Sling - concept proposal";
  const T = THEME.colors;
  const C = { text1: T.dk1, text2: T.dk2, background1: T.lt1, background2: T.lt2, accent1: T.accent1, accent2: T.accent2, accent3: T.accent3, accent4: T.accent4, accent5: T.accent5, accent6: T.accent6 };
  const TITLE = {
    Content: { x: 0.6, y: 0.45, w: 12.1, h: 0.95, color: T.dk1 },
    ImageLeft: { x: 6.6, y: 0.45, w: 6.1, h: 1.5, color: T.dk1 },
    ImageRight: { x: 0.6, y: 0.45, w: 6.1, h: 1.5, color: T.dk1 },
    Dark: { x: 0.6, y: 0.45, w: 12.1, h: 0.95, color: T.lt1 },
  };
  const titled = (master, sectionTitle, text) => {
    const sl = pres.addSlide({ masterName: master, sectionTitle });
    sl.addText(text, { isTextBox: true, margin: 0, fontSize: 36, bold: true, fontFace: THEME.headFontFace, valign: "top", align: "left", ...TITLE[master] });
    return sl;
  };
  const W = 13.333;
  const H = 7.5;

  const footer = (color) => [
    {
      text: {
        text: "MAREA SLING  |  CONCEPT PROPOSAL",
        options: { x: 0.6, y: 7.0, w: 6, h: 0.3, fontSize: 10, color, charSpacing: 2, margin: 0 },
      },
    },
  ];
  const num = (color) => ({ x: 12.1, y: 7.0, w: 0.65, h: 0.3, fontSize: 10, color, align: "right" });

  pres.defineSlideMaster({ title: "Cover", background: { color: C.text1 } });
  pres.defineSlideMaster({
    title: "Content",
    background: { color: C.background1 },
    objects: [
      ...footer(C.accent6),
    ],
    slideNumber: num(C.accent6),
  });
  pres.defineSlideMaster({
    title: "ImageLeft",
    background: { color: C.background1 },
    objects: [
      {
        text: {
          text: "MAREA SLING  |  CONCEPT PROPOSAL",
          options: { x: 6.6, y: 7.0, w: 5, h: 0.3, fontSize: 10, color: C.accent6, charSpacing: 2, margin: 0 },
        },
      },
    ],
    slideNumber: num(C.accent6),
  });
  pres.defineSlideMaster({
    title: "ImageRight",
    background: { color: C.background1 },
    objects: [
      ...footer(C.accent6),
    ],
  });
  pres.defineSlideMaster({
    title: "Dark",
    background: { color: C.text1 },
    objects: [
      ...footer(C.accent4),
    ],
    slideNumber: num(C.accent4),
  });

  const body = (s, text, o) =>
    s.addText(text, { isTextBox: true, margin: 0, fontSize: 14, color: C.text2, valign: "top", ...o });

  // ---------------------------------------------------------------- 1 cover
  pres.addSection({ title: "Concept" });
  let s = pres.addSlide({ masterName: "Cover", sectionTitle: "Concept" });
  s.addImage({ path: img("cover.jpg"), x: 5.0, y: 0, w: W - 5.0, h: H, objectName: "Hero render" });
  body(s, "CONCEPT PROPOSAL", { x: 0.6, y: 0.7, w: 4.0, h: 0.35, fontSize: 12, charSpacing: 4, color: C.accent3 });
  s.addText("Marea Sling", { isTextBox: true, margin: 0, x: 0.6, y: 2.2, w: 4.1, h: 1.0, fontSize: 48, bold: true, fontFace: THEME.headFontFace, color: C.background1 });
  body(s, "A beach lounger designed as a fashion piece, not as beach furniture", { x: 0.6, y: 3.35, w: 3.9, h: 1.2, fontSize: 20, italic: true, color: C.accent4 });
  body(s, "Design direction, materials, feasibility and plan", { x: 0.6, y: 6.5, w: 4.0, h: 0.4, fontSize: 14, color: C.accent4 });

  // ---------------------------------------------------------------- 2 brief
  s = titled("Content", "Concept", "The brief: living-room leather, taken to the shoreline");

  s.addImage({ path: img("ref1.jpg"), x: 0.6, y: 1.75, w: 3.1, h: 3.1, objectName: "Client reference 1" });
  s.addImage({ path: img("ref2.jpg"), x: 3.95, y: 1.75, w: 3.1, h: 3.1, objectName: "Client reference 2" });
  body(s, "Client reference 1: sling lounger on a black sled frame", { x: 0.6, y: 4.95, w: 3.1, h: 0.6, fontSize: 12, color: C.accent6 });
  body(s, "Client reference 2: sculpted cognac club chair", { x: 3.95, y: 4.95, w: 3.1, h: 0.6, fontSize: 12, color: C.accent6 });
  const took = [
    ["The sling silhouette", "One hide hung between two bars. It is already close to a deck chair, so it translates to sand."],
    ["The sled base", "Runners spread the load and do not sink the way four legs do."],
    ["The cognac patina", "Warm, worn-in leather is what makes both references read as luxury."],
  ];
  took.forEach(([h, t], i) => {
    const y = 1.75 + i * 1.3;
    s.addShape(pres.ShapeType.ellipse, { x: 7.6, y, w: 0.6, h: 0.6, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Step ${i + 1}` });
    s.addText(String(i + 1), { isTextBox: true, margin: 0, x: 7.6, y, w: 0.6, h: 0.6, align: "center", valign: "middle", fontSize: 18, bold: true, color: C.background1 });
    body(s, h, { x: 8.45, y: y - 0.02, w: 4.3, h: 0.35, fontSize: 18, bold: true, color: C.text1 });
    body(s, t, { x: 8.45, y: y + 0.38, w: 4.3, h: 0.8 });
  });
  body(s, "What we left behind: bulk. Thick padding and deep upholstery read as indoor furniture and hold water and sand.", { x: 0.6, y: 5.85, w: 12.1, h: 0.7, fontSize: 16, italic: true, color: C.accent1 });

  // -------------------------------------------------------------- 3 concept
  s = titled("Content", "Concept", "One line of metal, one panel of woven leather");

  s.addImage({ path: img("hero.jpg"), x: 5.1, y: 1.7, w: 7.63, h: 5.09, objectName: "Hero render, cognac and brass" });
  const ideas = [
    ["A single bent tube", "Runners, legs and both cross bars are one continuous loop, so the frame reads as jewellery, not scaffolding."],
    ["A hand-woven sling", "Diagonal leather weave replaces the cushion. It is thin, it breathes and sand falls through it."],
    ["Saddlery, not upholstery", "Stitched cuffs, belt-strapped bolster and metal collars borrow from bags and tack."],
  ];
  ideas.forEach(([h, t], i) => {
    const y = 1.7 + i * 1.7;
    body(s, h, { x: 0.6, y, w: 4.1, h: 0.4, fontSize: 20, bold: true, fontFace: THEME.headFontFace, color: C.accent1 });
    body(s, t, { x: 0.6, y: y + 0.45, w: 4.1, h: 1.1 });
  });

  // -------------------------------------------------------------- 4 details
  s = titled("ImageLeft", "Concept", "The details carry the price point");
  s.addImage({ path: img("detail.jpg"), x: 0, y: 0, w: 6.0, h: H, objectName: "Detail render" });

  const det = [
    ["Woven panel", "22 mm strips, diagonal over-under weave, rolled leather binding on both edges."],
    ["Stitched cuffs", "A plain leather sleeve wraps each bar, closed with a double row of contrast saddle stitch."],
    ["Bolster headrest", "Slim roll pillow held by two belt straps with metal keepers. It slides to fit the sitter."],
    ["Metal collars", "Small turned rings hide the cuff edge and stop the sling walking along the bar."],
  ];
  det.forEach(([h, t], i) => {
    const x = 6.6 + (i % 2) * 3.15;
    const y = 2.2 + Math.floor(i / 2) * 2.3;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 2.95, h: 2.1, rectRadius: 0.08, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Detail card ${i + 1}` });
    body(s, h, { x: x + 0.2, y: y + 0.2, w: 2.55, h: 0.35, fontSize: 16, bold: true, color: C.text1 });
    body(s, t, { x: x + 0.2, y: y + 0.62, w: 2.55, h: 1.35 });
  });

  // ----------------------------------------------------------- 5 colourways
  s = titled("Content", "Concept", "Three colourways from one frame and one pattern");

  const ways = [
    ["way-cognac.jpg", "Cognac / Brass", "The signature. Closest to both client references.", "A8572A"],
    ["way-noir.jpg", "Noir / Steel", "Sharper and more urban. Runs hottest in direct sun.", "141414"],
    ["way-ecru.jpg", "Ecru / Brass", "Resort mood. The coolest surface to sit on.", "D9C7AE"],
  ];
  ways.forEach(([f, h, t, hex], i) => {
    const x = 0.6 + i * 4.13;
    s.addImage({ path: img(f), x, y: 1.75, w: 3.85, h: 3.4, objectName: h });
    s.addShape(pres.ShapeType.ellipse, { x, y: 5.4, w: 0.4, h: 0.4, fill: { color: hex }, line: { color: C.accent6, width: 0.75 }, objectName: `${h} swatch` });
    body(s, h, { x: x + 0.55, y: 5.4, w: 3.3, h: 0.4, fontSize: 18, bold: true, color: C.text1, valign: "middle" });
    body(s, t, { x, y: 5.95, w: 3.85, h: 0.8 });
  });

  // -------------------------------------------------------------- 6 context
  s = titled("ImageRight", "Concept", "Sold as a set, shot as a campaign");
  s.addImage({ path: img("wide.jpg"), x: 7.33, y: 0, w: 6.0, h: H, objectName: "Wide render with parasol" });

  body(s, "The lounger is strongest as part of a small family of pieces that share leather, metal and stitch.", { x: 0.6, y: 2.2, w: 6.1, h: 0.9, fontSize: 16 });
  body(
    s,
    [
      { text: "Lounger, sold singly or as a pair", options: { bullet: true, breakLine: true } },
      { text: "Scalloped parasol with leather-colour trim and teak pole", options: { bullet: true, breakLine: true } },
      { text: "Bolster headrest, included", options: { bullet: true, breakLine: true } },
      { text: "Later: fitted cover, carry strap, towel in matching trim", options: { bullet: true } },
    ],
    { x: 0.6, y: 3.3, w: 6.1, h: 2.2, fontSize: 16, paraSpaceAfter: 10 }
  );
  body(s, "All images in this deck are concept renders of a 3D model, not photographs.", { x: 0.6, y: 6.0, w: 6.1, h: 0.6, fontSize: 12, italic: true, color: C.accent6 });

  // ------------------------------------------------------------ 7 materials
  pres.addSection({ title: "Making it real" });
  s = titled("Content", "Making it real", "Materials: looks like leather, built like a boat");

  const hdr = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text1 }, fontSize: 14 } });
  const part = (t) => ({ text: t, options: { bold: true, color: C.text1 } });
  const rows = [
    [hdr("Part"), hdr("Production specification"), hdr("Why it survives the beach")],
    [part("Frame"), "316 marine stainless tube, 28 mm, PVD brass finish. Alternative: powder-coated 6061 aluminium", "316 resists salt pitting. PVD is far harder than plating or lacquered brass"],
    [part("Woven sling"), "Leather-look marine upholstery strips on a polyester core, woven by hand", "UV, salt and mildew rated. Does not stretch or stiffen when wet"],
    [part("Cuffs and bolster"), "Same marine material. Quick-dry reticulated foam in the bolster", "Open-cell foam drains instead of holding water"],
    [part("Thread and edges"), "Bonded polyester or PTFE thread, sealed painted edges", "Cotton and linen thread rot in salt and sun"],
    [part("Collars and keepers"), "316 stainless, same PVD finish as the frame", "One metal throughout avoids galvanic corrosion"],
    [part("Runner underside"), "Replaceable clear polymer wear strip", "Protects the finish from sand abrasion and pool decks"],
  ];
  s.addTable(rows, {
    x: 0.6, y: 1.65, w: 12.1, colW: [2.3, 5.3, 4.5], rowH: 0.68,
    fontSize: 14, color: C.text2, valign: "middle", margin: [0.04, 0.12, 0.04, 0.12],
    border: { type: "solid", pt: 0.75, color: THEME.colors.accent4 },
    objectName: "Materials table",
  });

  // ---------------------------------------------------------- 8 feasibility
  s = titled("Content", "Making it real", "Will it work? Yes, with one change: no real hide");

  const risks = [
    ["FaWater", "Salt and corrosion", "Untreated leather cracks and brass tarnishes in weeks. Marine material and PVD steel solve both."],
    ["FaSun", "Sun and heat", "Dark surfaces get hot. The open weave ventilates, and Ecru is offered for full-sun use."],
    ["FaUmbrellaBeach", "Sand and water", "Nothing to trap either: sand falls through the weave and the bolster drains."],
    ["FaWeightHanging", "Structure", "The cantilevered loop needs analysis and load testing. The tube wall may grow or a hidden brace be added."],
    ["FaSuitcaseRolling", "Weight and carrying", "About 7.5 kg in steel, about 3.5 kg in aluminium. It does not fold, so it suits clubs and villas more than day trips."],
    ["FaHandSparkles", "Care", "Rinse with fresh water and wipe dry. A fitted cover extends the finish between seasons."],
  ];
  for (const [i, [ic, h, t]] of risks.entries()) {
    const x = 0.6 + (i % 3) * 4.13;
    const y = 1.7 + Math.floor(i / 3) * 2.6;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 3.85, h: 2.35, rectRadius: 0.08, fill: { color: C.background2 }, line: { type: "none" }, objectName: `${h} card` });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.25, y: y + 0.25, w: 0.55, h: 0.55, fill: { color: C.accent2 }, line: { type: "none" }, objectName: `${h} icon disc` });
    s.addImage({ data: await icon(ic, "FFFFFF"), x: x + 0.39, y: y + 0.39, w: 0.27, h: 0.27, objectName: `${h} icon` });
    body(s, h, { x: x + 0.95, y: y + 0.25, w: 2.7, h: 0.55, fontSize: 16, bold: true, color: C.text1, valign: "middle" });
    body(s, t, { x: x + 0.25, y: y + 0.95, w: 3.35, h: 1.3 });
  }

  // ------------------------------------------------------------ 9 the spec
  s = titled("Content", "Making it real", "Concept dimensions, to be confirmed at prototype");

  const stats = [
    ["69 cm", "overall width"],
    ["121 cm", "overall length"],
    ["75 cm", "height at the top bar"],
    ["16 cm", "seat low point above sand"],
  ];
  stats.forEach(([n, l], i) => {
    const x = 0.6 + i * 3.1;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.75, w: 2.8, h: 2.2, rectRadius: 0.08, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Stat ${l}` });
    s.addText(n, { isTextBox: true, margin: 0, x, y: 2.0, w: 2.8, h: 1.0, align: "center", valign: "middle", fontSize: 44, bold: true, fontFace: THEME.headFontFace, color: C.accent1 });
    body(s, l, { x: x + 0.2, y: 3.1, w: 2.4, h: 0.6, align: "center" });
  });
  body(s, "Targets for engineering", { x: 0.6, y: 4.4, w: 6, h: 0.4, fontSize: 20, bold: true, fontFace: THEME.headFontFace, color: C.text1 });
  body(
    s,
    [
      { text: "Seated load test to EN 581 for outdoor seating, with a 130 kg design target", options: { bullet: true, breakLine: true } },
      { text: "Weight under 8 kg in steel so one person can move it", options: { bullet: true, breakLine: true } },
      { text: "Sling removable with hand tools, so it can be replaced without replacing the frame", options: { bullet: true } },
    ],
    { x: 0.6, y: 4.9, w: 12.1, h: 1.8, fontSize: 16, paraSpaceAfter: 8 }
  );

  // --------------------------------------------------------------- 10 tiers
  s = titled("Content", "Making it real", "Three build tiers set the price, not the look");

  const tiers = [
    ["Resort", "$", "Powder-coated aluminium frame in a brass tone", "Machine-cut marine vinyl weave", "Lightest and lowest cost. Best for hotel and club volume", false],
    ["Signature", "$$", "316 stainless frame with PVD brass", "Hand-woven premium leather-look marine material", "Recommended. Looks identical to the renders and lasts", true],
    ["Atelier", "$$$", "316 stainless with PVD, solid turned fittings", "Hand-woven treated full-grain leather, made to order", "The real thing, for covered terraces. Needs a cover and care", false],
  ];
  tiers.forEach(([h, cost, f, sl, note, rec], i) => {
    const x = 0.6 + i * 4.13;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.7, w: 3.85, h: 4.95, rectRadius: 0.08, fill: { color: rec ? C.text1 : C.background2 }, line: { type: "none" }, objectName: `${h} tier` });
    const head = rec ? C.background1 : C.text1;
    const txt = rec ? C.accent4 : C.text2;
    body(s, h, { x: x + 0.3, y: 1.95, w: 2.4, h: 0.5, fontSize: 24, bold: true, fontFace: THEME.headFontFace, color: head });
    body(s, cost, { x: x + 2.55, y: 1.95, w: 1.0, h: 0.5, fontSize: 24, bold: true, align: "right", color: rec ? C.accent3 : C.accent1 });
    body(s, "FRAME", { x: x + 0.3, y: 2.75, w: 3.25, h: 0.3, fontSize: 11, charSpacing: 3, color: rec ? C.accent3 : C.accent6 });
    body(s, f, { x: x + 0.3, y: 3.05, w: 3.25, h: 0.75, color: txt });
    body(s, "SLING", { x: x + 0.3, y: 3.9, w: 3.25, h: 0.3, fontSize: 11, charSpacing: 3, color: rec ? C.accent3 : C.accent6 });
    body(s, sl, { x: x + 0.3, y: 4.2, w: 3.25, h: 0.75, color: txt });
    body(s, note, { x: x + 0.3, y: 5.2, w: 3.25, h: 1.2, italic: true, color: head });
  });

  // ------------------------------------------------------------- 11 roadmap
  pres.addSection({ title: "Plan" });
  s = titled("Content", "Plan", "From render to first chairs in about five months");

  const steps = [
    ["Weeks 1-2", "Sign-off", "Pick colourway and tier. Freeze the silhouette"],
    ["Weeks 3-5", "Engineering", "CAD, tube sizing, load analysis, sling fixing detail"],
    ["Weeks 4-8", "Sampling", "Material swatches, weave trials, PVD colour match"],
    ["Weeks 9-14", "Prototype", "Two full chairs. Sit tests and comfort tuning"],
    ["Weeks 15-18", "Testing", "Load, salt spray and UV exposure. Design fixes"],
    ["Weeks 19-22", "Pilot run", "Small first batch and campaign photography"],
  ];
  s.addShape(pres.ShapeType.line, { x: 0.9, y: 2.55, w: 11.5, h: 0, line: { color: C.accent4, width: 2 }, objectName: "Timeline" });
  steps.forEach(([w, h, t], i) => {
    const x = 0.6 + i * 2.05;
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.05, y: 2.25, w: 0.6, h: 0.6, fill: { color: i === 3 ? C.accent1 : C.accent2 }, line: { type: "none" }, objectName: `Phase ${i + 1}` });
    s.addText(String(i + 1), { isTextBox: true, margin: 0, x: x + 0.05, y: 2.25, w: 0.6, h: 0.6, align: "center", valign: "middle", fontSize: 18, bold: true, color: C.background1 });
    body(s, w, { x, y: 3.1, w: 1.85, h: 0.3, fontSize: 12, color: C.accent6 });
    body(s, h, { x, y: 3.4, w: 1.85, h: 0.4, fontSize: 18, bold: true, color: C.text1 });
    body(s, t, { x, y: 3.9, w: 1.85, h: 1.6 });
  });
  body(s, "Timings are indicative and depend on supplier lead times. The prototype is the gate: nothing is ordered in volume before it passes.", { x: 0.6, y: 5.7, w: 12.1, h: 0.7, fontSize: 16, italic: true, color: C.accent1 });

  // ------------------------------------------------------------- 12 closing
  s = titled("Dark", "Plan", "Three decisions to move forward");

  s.addImage({ path: img("close.jpg"), x: 7.1, y: 1.7, w: 5.63, h: 4.9, objectName: "Hero render" });
  const asks = [
    ["Direction", "Approve the woven sling on a single-loop frame as the design to develop."],
    ["Colourway", "Choose the lead colourway. We recommend Cognac / Brass, with Ecru as the second."],
    ["Tier", "Choose the build tier. We recommend Signature for the prototype."],
  ];
  asks.forEach(([h, t], i) => {
    const y = 1.8 + i * 1.6;
    s.addShape(pres.ShapeType.ellipse, { x: 0.6, y, w: 0.6, h: 0.6, fill: { color: C.accent3 }, line: { type: "none" }, objectName: `Decision ${i + 1}` });
    s.addText(String(i + 1), { isTextBox: true, margin: 0, x: 0.6, y, w: 0.6, h: 0.6, align: "center", valign: "middle", fontSize: 18, bold: true, color: C.text1 });
    body(s, h, { x: 1.45, y: y - 0.02, w: 5.2, h: 0.4, fontSize: 20, bold: true, fontFace: THEME.headFontFace, color: C.background1 });
    body(s, t, { x: 1.45, y: y + 0.45, w: 5.2, h: 0.9, fontSize: 16, color: C.accent4 });
  });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
}

main();
