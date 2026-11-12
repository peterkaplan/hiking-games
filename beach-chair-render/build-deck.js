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
  name: "Halyard",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "14213D",
    lt1: "FFFFFF",
    dk2: "46505F",
    lt2: "F3EEE8",
    accent1: "B0672C",
    accent2: "2B5C8A",
    accent3: "C9A15A",
    accent4: "D9C7AE",
    accent5: "141414",
    accent6: "8A7A6C",
    hlink: "B0672C",
    folHlink: "46505F",
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
  pres.title = "Halyard beach club chair - concept proposal";
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
        text: "HALYARD  |  CONCEPT PROPOSAL",
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
          text: "HALYARD  |  CONCEPT PROPOSAL",
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
  pres.addSection({ title: "Brief" });
  let s = pres.addSlide({ masterName: "Cover", sectionTitle: "Brief" });
  s.addImage({ path: img("cover.jpg"), x: 5.0, y: 0, w: W - 5.0, h: H, objectName: "Hero render" });
  body(s, "CONCEPT PROPOSAL", { x: 0.6, y: 0.7, w: 4.0, h: 0.35, fontSize: 12, charSpacing: 4, color: C.accent3 });
  s.addText("Halyard", { isTextBox: true, margin: 0, x: 0.6, y: 2.2, w: 4.1, h: 1.0, fontSize: 54, bold: true, fontFace: THEME.headFontFace, color: C.background1 });
  body(s, "A club chair you can carry to the beach", { x: 0.6, y: 3.35, w: 3.9, h: 1.2, fontSize: 20, italic: true, color: C.accent4 });
  body(s, "Design, materials, feasibility and plan", { x: 0.6, y: 6.5, w: 4.0, h: 0.4, fontSize: 14, color: C.accent4 });

  // ---------------------------------------------------------------- 2 brief
  s = titled("Content", "Brief", "The brief: a club chair that goes to the beach");
  const brief = [
    ["$300-700", "retail price"],
    ["20 lb", "maximum weight, 12-15 lb ideal"],
    ["17 in", "seat depth"],
    ["3", "recline angles: 102, 118, 133 degrees"],
  ];
  brief.forEach(([n, l], i) => {
    const x = 0.6 + i * 3.1;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.75, w: 2.8, h: 2.3, rectRadius: 0.08, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Brief ${l}` });
    s.addText(n, { isTextBox: true, margin: 0, x, y: 1.95, w: 2.8, h: 1.0, align: "center", valign: "middle", fontSize: 40, bold: true, fontFace: THEME.headFontFace, color: C.accent1 });
    body(s, l, { x: x + 0.2, y: 3.05, w: 2.4, h: 0.8, align: "center" });
  });
  body(s, "Also in the brief", { x: 0.6, y: 4.45, w: 6, h: 0.4, fontSize: 20, bold: true, fontFace: THEME.headFontFace, color: C.text1 });
  body(
    s,
    [
      { text: "Wooden frame with fixed, dramatic armrests", options: { bullet: true, breakLine: true } },
      { text: "Sail-like fabric held taut to the frame by rope, with room for branding", options: { bullet: true, breakLine: true } },
      { text: "Backpack straps, because it is heavier than an average beach chair", options: { bullet: true, breakLine: true } },
      { text: "Easy to fold, much thicker than a traditional beach chair, slip cover later", options: { bullet: true } },
    ],
    { x: 0.6, y: 4.95, w: 12.1, h: 1.9, fontSize: 16, paraSpaceAfter: 6 }
  );

  // ---------------------------------------------------------- 3 inspiration
  s = titled("Content", "Brief", "What the inspiration board asks for");
  ["insp1.jpg", "insp2.jpg", "insp3.jpg", "insp4.jpg", "insp5.jpg", "insp6.jpg"].forEach((f, i) => {
    s.addImage({ path: img(f), x: 0.6 + (i % 3) * 2.45, y: 1.7 + Math.floor(i / 3) * 1.99, w: 2.3, h: 1.84, objectName: `Client reference ${i + 1}` });
  });
  body(s, "Six of the client's sixteen reference images.", { x: 0.6, y: 5.7, w: 7.2, h: 0.4, fontSize: 12, color: C.accent6 });
  const themes = [
    ["The arms are the chair", "Big wooden arms dictate the whole silhouette."],
    ["The seat floats", "The cushion hangs inside the frame, off the ground."],
    ["Fabric drapes over wood", "A deep, soft pad thrown over a hard frame."],
    ["Rounded and organic", "Soft corners and flowing lines, not square stock."],
  ];
  themes.forEach(([h, t], i) => {
    const y = 1.7 + i * 1.2;
    s.addShape(pres.ShapeType.ellipse, { x: 8.2, y, w: 0.6, h: 0.6, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Theme ${i + 1}` });
    s.addText(String(i + 1), { isTextBox: true, margin: 0, x: 8.2, y, w: 0.6, h: 0.6, align: "center", valign: "middle", fontSize: 18, bold: true, color: C.background1 });
    body(s, h, { x: 9.05, y: y - 0.02, w: 3.7, h: 0.35, fontSize: 18, bold: true, color: C.text1 });
    body(s, t, { x: 9.05, y: y + 0.38, w: 3.7, h: 0.7 });
  });

  // --------------------------------------------------------------- 4 sketch
  pres.addSection({ title: "Design" });
  s = titled("Content", "Design", "The client's sketch, built");
  s.addImage({ path: img("sketch.jpg"), x: 0.6, y: 1.7, w: 5.0, h: 3.29, objectName: "Client sketch" });
  s.addImage({ path: img("hero.jpg"), x: 5.9, y: 1.7, w: 6.83, h: 4.55, objectName: "Hero render" });
  body(
    s,
    [
      { text: "Wooden arched arm rests: one bent loop per side", options: { bullet: true, breakLine: true } },
      { text: "Interchangeable fabric: sail panels laced into each loop", options: { bullet: true, breakLine: true } },
      { text: "Much thicker: one deep pad draped over back and seat", options: { bullet: true } },
    ],
    { x: 0.6, y: 5.2, w: 5.0, h: 1.6, paraSpaceAfter: 6 }
  );
  body(s, "Concept render of the 3D model, Sail colourway.", { x: 5.9, y: 6.4, w: 6.8, h: 0.35, fontSize: 12, italic: true, color: C.accent6 });

  // ----------------------------------------------------------------- 5 arms
  s = titled("ImageLeft", "Design", "The arms are the chair");
  s.addImage({ path: img("detail.jpg"), x: 0, y: 0, w: 6.0, h: H, objectName: "Arm detail render" });
  const det = [
    ["One loop, three jobs", "Each bent-wood loop is the armrest, the legs and the runner that sits on the sand."],
    ["Laced sail panels", "Sailcloth is tied into the loop through brass eyelets. Untie it to swap colours."],
    ["Clear arm tops", "The rope runs inside the loop only, so forearms rest on smooth wood."],
    ["Pegged joinery", "Three wooden rails pass through the arms and finish in brass caps."],
  ];
  det.forEach(([h, t], i) => {
    const x = 6.6 + (i % 2) * 3.15;
    const y = 2.2 + Math.floor(i / 2) * 2.3;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 2.95, h: 2.1, rectRadius: 0.08, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Detail card ${i + 1}` });
    body(s, h, { x: x + 0.2, y: y + 0.2, w: 2.55, h: 0.35, fontSize: 16, bold: true, color: C.text1 });
    body(s, t, { x: x + 0.2, y: y + 0.62, w: 2.55, h: 1.35 });
  });

  // ----------------------------------------------------------------- 6 rear
  s = titled("Content", "Design", "The back carries the brand and the straps");
  s.addImage({ path: img("rear.jpg"), x: 0.6, y: 1.7, w: 7.3, h: 4.87, objectName: "Rear render" });
  const rear = [
    ["Sail number", "The back panel is real sailcloth, so the brand mark is printed like a racing sail number."],
    ["Backpack straps", "Two leather-look straps run the height of the back for hands-free carrying."],
    ["Laced back panel", "Same rope and eyelets as the arms. The panel can be replaced or personalised."],
  ];
  rear.forEach(([h, t], i) => {
    const y = 1.7 + i * 1.65;
    body(s, h, { x: 8.3, y, w: 4.4, h: 0.4, fontSize: 20, bold: true, fontFace: THEME.headFontFace, color: C.accent1 });
    body(s, t, { x: 8.3, y: y + 0.45, w: 4.4, h: 1.1 });
  });

  // ----------------------------------------------------------------- 7 fold
  s = titled("Content", "Design", "Three recline angles, and the back folds down");
  s.addImage({ path: img("fold.png"), x: 0.6, y: 1.7, w: 7.3, h: 4.56, objectName: "Side view diagram of recline positions" });
  const rec = [
    ["102 degrees", "Upright, for reading and eating"],
    ["118 degrees", "Mid recline, the default shown in the renders"],
    ["133 degrees", "Relaxed recline"],
    ["Folded", "The back drops forward onto the seat for carrying"],
  ];
  rec.forEach(([h, t], i) => {
    const y = 1.7 + i * 1.0;
    body(s, h, { x: 8.3, y, w: 4.4, h: 0.35, fontSize: 18, bold: true, color: C.text1 });
    body(s, t, { x: 8.3, y: y + 0.38, w: 4.4, h: 0.5 });
  });
  body(s, "Proposed mechanism: the foot of the back moves between notches on the seat rails. To be proven at prototype.", { x: 8.3, y: 5.75, w: 4.4, h: 0.9, fontSize: 12, italic: true, color: C.accent6 });

  // ------------------------------------------------------------ 7b folded
  s = titled("Content", "Design", "Folded: the back drops in and the straps end up on top");
  s.addImage({ path: img("fold.jpg"), x: 0.6, y: 1.7, w: 7.3, h: 4.87, objectName: "Folded chair render" });
  const fold = [
    ["How it folds", "The back tips forward onto the seat. The pad folds with it and stays inside the arm loops."],
    ["How it carries", "The straps sit on the outside of the folded back, so it goes on like a backpack."],
    ["Folded size", "About 30 x 31 x 22 in. The rigid arms mean it folds to a box, not flat."],
  ];
  fold.forEach(([h, t], i) => {
    const y = 1.7 + i * 1.65;
    body(s, h, { x: 8.3, y, w: 4.4, h: 0.4, fontSize: 20, bold: true, fontFace: THEME.headFontFace, color: C.accent1 });
    body(s, t, { x: 8.3, y: y + 0.45, w: 4.4, h: 1.1 });
  });

  // ----------------------------------------------------------- 8 colourways
  s = titled("Content", "Design", "Interchangeable fabrics: three launch colourways");
  const ways = [
    ["way-sail.jpg", "Sail / Navy rope", "The signature. Reads most clearly as a sailboat.", "D8D2C4"],
    ["way-navy.jpg", "Navy / Hemp rope", "Yacht-club classic. Hides sunscreen and sand.", "14213D"],
    ["way-rust.jpg", "Rust / Hemp rope", "Closest to the leather tones on the board.", "A8472A"],
  ];
  ways.forEach(([f, h, t, hex], i) => {
    const x = 0.6 + i * 4.13;
    s.addImage({ path: img(f), x, y: 1.75, w: 3.85, h: 3.4, objectName: h });
    s.addShape(pres.ShapeType.ellipse, { x, y: 5.4, w: 0.4, h: 0.4, fill: { color: hex }, line: { color: C.accent6, width: 0.75 }, objectName: `${h} swatch` });
    body(s, h, { x: x + 0.55, y: 5.4, w: 3.3, h: 0.4, fontSize: 18, bold: true, color: C.text1, valign: "middle" });
    body(s, t, { x, y: 5.95, w: 3.85, h: 0.8 });
  });

  // -------------------------------------------------------------- 9 context
  s = titled("ImageRight", "Design", "A small family, not a single chair");
  s.addImage({ path: img("wide.jpg"), x: 7.33, y: 0, w: 6.0, h: H, objectName: "Wide render with parasol" });
  body(s, "Swappable fabric turns one frame into a product line and gives customers a reason to come back.", { x: 0.6, y: 2.2, w: 6.1, h: 0.9, fontSize: 16 });
  body(
    s,
    [
      { text: "Chair, sold singly or as a pair", options: { bullet: true, breakLine: true } },
      { text: "Fabric kits: pad cover plus arm and back panels", options: { bullet: true, breakLine: true } },
      { text: "Slip cover, as the client suggested, for a second look", options: { bullet: true, breakLine: true } },
      { text: "Matching parasol with rope-colour trim", options: { bullet: true } },
    ],
    { x: 0.6, y: 3.3, w: 6.1, h: 2.2, fontSize: 16, paraSpaceAfter: 10 }
  );
  body(s, "All chair images in this deck are concept renders of a 3D model, not photographs.", { x: 0.6, y: 6.0, w: 6.1, h: 0.6, fontSize: 12, italic: true, color: C.accent6 });

  // ----------------------------------------------------------- 10 materials
  pres.addSection({ title: "Making it real" });
  s = titled("Content", "Making it real", "Materials: built like a small boat");
  const hdr = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text1 }, fontSize: 14 } });
  const part = (t) => ({ text: t, options: { bold: true, color: C.text1 } });
  const rows = [
    [hdr("Part"), hdr("Proposed specification"), hdr("Why")],
    [part("Arm loops"), "Hollow bent-laminate section, 80 x 32 mm, teak or ash face veneer, marine finish", "Looks like solid wood at about a third of the weight"],
    [part("Rails and back frame"), "Solid ash or teak, 26-32 mm, brass end caps", "Small parts where solid wood is light enough"],
    [part("Sail panels and sling"), "Polyester sailcloth (Dacron type), brass eyelets", "Made for sun, salt and tension. Prints well for branding"],
    [part("Rope"), "6-7 mm three-strand polyester in navy or hemp look", "Looks like natural rope, does not rot or stretch when wet"],
    [part("Pad"), "Quick-dry foam, removable outdoor-fabric cover", "Thick but drains. Cover is washable and swappable"],
    [part("Straps"), "Padded webbing with leather-look facing", "Comfort at the upper end of the weight range"],
  ];
  s.addTable(rows, {
    x: 0.6, y: 1.65, w: 12.1, colW: [2.5, 5.3, 4.3], rowH: 0.68,
    fontSize: 14, color: C.text2, valign: "middle", margin: [0.04, 0.12, 0.04, 0.12],
    border: { type: "solid", pt: 0.75, color: THEME.colors.accent4 },
    objectName: "Materials table",
  });

  // -------------------------------------------------------------- 11 weight
  const chartText = { catAxisLabelColor: THEME.colors.dk2, valAxisLabelColor: THEME.colors.dk2, catAxisLabelFontSize: 12, valAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt", dataLabelColor: THEME.colors.dk2, dataLabelFontSize: 12, dataLabelFontFace: "+mn-lt", titleFontFace: "+mn-lt", titleColor: THEME.colors.dk1, titleFontSize: 14 };
  s = titled("Content", "Making it real", "Weight: hollow arms keep it under 20 lb");
  s.addChart(pres.charts.BAR, [{ name: "Estimated weight (lb)", labels: ["Arm loops (hollow)", "Rails and back frame", "Pad", "Sail panels and sling", "Rope and hardware", "Straps"], values: [6, 3, 3, 1.5, 1, 0.5] }], {
    x: 0.6, y: 1.6, w: 7.4, h: 5.0, barDir: "bar", catAxisOrientation: "maxMin", chartColors: [THEME.colors.accent1], showLegend: false,
    showTitle: true, title: "Estimated weight by part (lb)", showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "0.0",
    valGridLine: { color: "E6DFD3", size: 0.75 }, catGridLine: { style: "none" }, valAxisMinVal: 0, valAxisMaxVal: 8, ...chartText, objectName: "Weight budget chart",
  });
  s.addShape(pres.ShapeType.roundRect, { x: 8.4, y: 1.75, w: 4.3, h: 2.0, rectRadius: 0.08, fill: { color: C.background2 }, line: { type: "none" }, objectName: "Total weight card" });
  s.addText("15 lb", { isTextBox: true, margin: 0, x: 8.4, y: 1.9, w: 4.3, h: 1.0, align: "center", valign: "middle", fontSize: 44, bold: true, fontFace: THEME.headFontFace, color: C.accent1 });
  body(s, "estimated total, against a 20 lb limit", { x: 8.6, y: 2.95, w: 3.9, h: 0.6, align: "center" });
  body(s, "Arms this size in solid hardwood would weigh about 17 lb on their own. A hollow laminated section brings them to about 6 lb.", { x: 8.4, y: 4.05, w: 4.3, h: 1.5, fontSize: 16 });
  body(s, "Estimates from the 3D model volumes. To be weighed at prototype.", { x: 8.4, y: 5.85, w: 4.3, h: 0.7, fontSize: 12, italic: true, color: C.accent6 });

  // --------------------------------------------------------------- 12 price
  s = titled("Content", "Making it real", "Price: the top of the market, so it has to look it");
  s.addChart(pres.charts.BAR, [{ name: "Price (USD)", labels: ["Tommy Bahama", "Parkit Voyager", "Cape Cod Beach Chair Co.", "Business and Pleasure", "Rove Concepts Sling", "Serena & Lily Palisades", "Shorebird Outdoor"], values: [100, 225, 230, 300, 425, 428, 500] }], {
    x: 0.6, y: 1.6, w: 7.4, h: 5.0, barDir: "bar", catAxisOrientation: "maxMin", chartColors: [THEME.colors.accent2], showLegend: false,
    showTitle: true, title: "Competitor prices from the client brief (USD)", showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "$0",
    valGridLine: { color: "E6DFD3", size: 0.75 }, catGridLine: { style: "none" }, valAxisMinVal: 0, valAxisMaxVal: 700, valAxisLabelFormatCode: "$0", ...chartText, objectName: "Competitor price chart",
  });
  s.addShape(pres.ShapeType.roundRect, { x: 8.4, y: 1.75, w: 4.3, h: 2.0, rectRadius: 0.08, fill: { color: C.background2 }, line: { type: "none" }, objectName: "Target price card" });
  s.addText("$300-700", { isTextBox: true, margin: 0, x: 8.4, y: 1.9, w: 4.3, h: 1.0, align: "center", valign: "middle", fontSize: 40, bold: true, fontFace: THEME.headFontFace, color: C.accent1 });
  body(s, "target retail band", { x: 8.6, y: 2.95, w: 3.9, h: 0.6, align: "center" });
  body(s, "Only one of the seven chairs listed reaches $500. The wood arms, real sailcloth and swappable fabric are what justify sitting above them.", { x: 8.4, y: 4.05, w: 4.3, h: 1.7, fontSize: 16 });
  body(s, "Unit cost is not yet estimated. It needs supplier quotes.", { x: 8.4, y: 5.85, w: 4.3, h: 0.7, fontSize: 12, italic: true, color: C.accent6 });

  // --------------------------------------------------------- 13 feasibility
  s = titled("Content", "Making it real", "Will it work? Yes, with three things to prove");
  const risks = [
    ["FaWeightHanging", "1. Weight", "Dramatic arms and a 20 lb limit pull against each other. Hollow arms are the answer and must be prototyped first."],
    ["FaCompressAlt", "2. Fold size", "With rigid arm loops the chair folds to a box about 30 x 30 x 22 in, not flat. Hinged rails could let the arms close together."],
    ["FaSlidersH", "3. Recline", "Three positions on a folding back need a simple, sand-proof notch. No mechanism is designed yet."],
    ["FaWater", "Salt and sun", "Marine-finished wood, polyester sailcloth and rope are all proven on boats."],
    ["FaUmbrellaBeach", "Sand", "Wide runners do not sink like legs. Sand falls past the laced panels."],
    ["FaCouch", "Comfort", "The thick pad uses quick-dry foam so it can be deep without holding water."],
  ];
  for (const [i, [ic, h, t]] of risks.entries()) {
    const x = 0.6 + (i % 3) * 4.13;
    const y = 1.7 + Math.floor(i / 3) * 2.6;
    const hot = i < 3;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 3.85, h: 2.35, rectRadius: 0.08, fill: { color: C.background2 }, line: { type: "none" }, objectName: `${h} card` });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.25, y: y + 0.25, w: 0.55, h: 0.55, fill: { color: hot ? C.accent1 : C.accent2 }, line: { type: "none" }, objectName: `${h} icon disc` });
    s.addImage({ data: await icon(ic, "FFFFFF"), x: x + 0.39, y: y + 0.39, w: 0.27, h: 0.27, objectName: `${h} icon` });
    body(s, h, { x: x + 0.95, y: y + 0.25, w: 2.7, h: 0.55, fontSize: 16, bold: true, color: C.text1, valign: "middle" });
    body(s, t, { x: x + 0.25, y: y + 0.95, w: 3.35, h: 1.3 });
  }

  // ------------------------------------------------------------- 14 roadmap
  pres.addSection({ title: "Plan" });
  s = titled("Content", "Plan", "From render to first chairs in about five months");
  const steps = [
    ["Weeks 1-2", "Sign-off", "Agree direction, fold approach and lead colourway"],
    ["Weeks 3-5", "Engineering", "CAD, arm section, recline notch, fold and strap fixing"],
    ["Weeks 4-8", "Sampling", "Bent-laminate arm trials, sailcloth, rope and foam samples"],
    ["Weeks 9-14", "Prototype", "Two full chairs. Weigh, carry and sit tests"],
    ["Weeks 15-18", "Testing", "Load, salt and UV exposure. Design fixes"],
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

  // ------------------------------------------------------------- 15 closing
  s = titled("Dark", "Plan", "Three decisions to move forward");
  s.addImage({ path: img("close.jpg"), x: 7.1, y: 1.7, w: 5.63, h: 4.9, objectName: "Hero render, Rust colourway" });
  const asks = [
    ["Direction", "Approve the arched arm loop with laced sail panels as the design to develop."],
    ["Fold", "Choose between a simple fold-down back and a slimmer fold that costs more to engineer."],
    ["Colourway", "Choose the lead colourway. We recommend Sail with navy rope."],
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
