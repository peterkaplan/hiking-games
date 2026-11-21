# Decision log

Newest first. Each entry: what we decided, why, and what would make us revisit it.

---

## 2026-11-21: Variant 2 uses Great Jones's palette, exactly

**Decision:** The store uses Great Jones's swatches, sampled from
greatjonesgoods.com: cream `#faeddf`, deep forest green `#0e5540`, mustard
`#ffc933`, black `#000000`, white `#ffffff` and light cream `#fffaf5`. Their
cobalt blue is left out. Graza's and Allbirds's palettes are kept as exact
alternatives, switched with `data-palette` on the store wrapper
(`src/app/(shop)/v2/layout.tsx`).
**Why:** Graza's chartreuse and light-green backgrounds felt too harsh for
an allergy-safety product. Great Jones is calmer: a deep, grounded green
that still says "safe / yes", with mustard only in small doses.
**How:** Colours are named for their job (page background, panel, button,
band, highlight, selected, tick, product backdrops), each with an "on-*"
text colour, so a palette is just a list of exact hex values.
**Check:** a browser audit of every painted colour on /v2, /v2/thailand and
/v2/japan (desktop and phone) finds only each palette's own swatches, and
axe-core finds no accessibility violations, for all three palettes.
**History:** Graza's palette was used first (and before that, a mix with
colours of our own); the owner found the green too harsh.

## 2026-11-21: Two design variants side by side

**Decision:** Keep the pixel-art site (variant 1, at `/`) and add a
Shopify-style store (variant 2, at `/v2`), built from patterns in successful
Shopify stores (see [research](research/2026-11-21-shopify-store-patterns.md)).
Both share the same content (cards, pricing, FAQ) and live in separate route
groups, `src/app/(pixel)` and `src/app/(shop)`, each with its own layout.
**Why:** To compare a distinctive brand-led site with a conventional,
conversion-focused store before choosing.
**Revisit:** Once one is chosen, delete the other route group and its
components (`components/pixel/*` and the pixel components, or `components/shop/*`).

## 2026-11-21: Pixel text uses grid-aligned fonts at fixed sizes

**Decision:** Replace Pixelify Sans with Jersey 15 (headings, 27px or 54px)
and Tiny5 (small labels, 16px or 24px), with whole-pixel line heights and no
faked bold.
**Why:** Pixelify Sans isn't drawn on a pixel grid, so it renders blurry at
any size. Grid fonts are only sharp at multiples of their grid.

## 2026-11-21: No invented social proof

**Decision:** Until there are real reviews, product pages say "No reviews
yet" and review sections show clearly labelled placeholders.
**Why:** Fake reviews mislead people about a safety product (and break
consumer-protection rules).

## 2026-11-20: Value prop is confirmation; pixel-art identity

**Decision:** Lead with "eat abroad with confidence": the kitchen confirms
yes or no, so you know you can eat. The site uses a pixel-art identity:
pixel fonts and frames, a looping hero scene that acts out the value prop
(show the card, the chef answers ✓, the food arrives), waving pixel flags, and
small looping animations. Animations rest on their final frame when the visitor
prefers reduced motion.
**Why:** The first design looked generic and AI-made, and led with translation
instead of confirmation. A distinct, playful identity is memorable and makes an
anxious topic feel approachable.
**Note:** The site says staff answer yes or no. The redesigned cards need an
answer section built for that (see roadmap).

## 2026-11-20: Two cards per destination, local language front, English back

**Decision:** We sell a chef card and an emergency card for each destination
country. The front is in the local language (plus an optional short note for
kitchen staff in a second language, e.g. Burmese in Thailand); the back is English.
Content is organised by destination, not by language.
**Why:** This is the owner's existing card design. Destination is the right unit
because the emergency number depends on the country, and one country can need
more than one language.

## 2026-11-20: English backs are generated; the build checks emergency numbers

**Decision:** The English backs come from one source, with the emergency number
filled in per destination. The build fails if a front's emergency card doesn't
contain the destination's number, or a chef card is missing bullet points.
**Why:** The owner's Japan emergency card had Thailand's number (1669) on its
English back, a copy-paste error that could cost time in an emergency. Generating
the backs and checking the fronts prevents that class of mistake.

## 2026-11-20: Card text is data, and translations must be reviewed

**Decision:** All card wording lives in `src/content/cards/`. Each translation
records the English version it came from and its review status (reviewer and
date). Only reviewed, up-to-date translations show as available.
**Why:** The cards are safety-critical and will be reused in many formats (web,
PDF, Etsy, wallet passes). One source avoids versions drifting apart, and the
code stops an unreviewed card from going live by accident.

## 2026-11-20: Build inside the hiking-games repo, in a self-contained folder

**Decision:** Develop in `hiking-games/peanutallergycards/` on a branch, with its
own `package.json`. Nothing outside the folder is imported.
**Why:** No new repo could be created from the working session. A self-contained
folder can be split into its own repo later with history (`git subtree split`).
**Revisit:** As soon as a dedicated repo exists.

## 2026-11-20: Japanese first

**Decision:** Japanese is the launch language; then Chinese, Spanish, Thai, Italian.
**Why:** "japanese" is Google's top autocomplete after "peanut allergy card",
and Japan leads peanut-allergy destination searches on Google Trends.

## 2026-11-20: Website plus Etsy; no native app yet

**Decision:** Launch the website and Etsy (digital downloads first). Defer the app.
**Why:** The website catches search traffic; Etsy brings its own buyers. An app
costs $99/year plus review and maintenance overhead, and the category leader's
app has only about 32 App Store ratings. Wallet passes and an installable website cover most
of an app's value.
**Revisit:** If customers ask for an app, or wallet passes prove popular.

## 2026-11-20: Free card plus one-off paid extras, no subscription

**Decision:** A free card per language; paid custom cards and bundles at one-off prices.
**Why:** People search for "free" allergy cards; the leading competitor's
subscription pricing draws complaints.

## 2026-11-20: Peanut-first positioning

**Decision:** Specialise in peanut (tree nuts likely later) rather than all allergens.
**Why:** It matches the domain, gives depth competitors lack (peanut oil,
groundnut and satay naming, cross-contact), and suits a small side business.
