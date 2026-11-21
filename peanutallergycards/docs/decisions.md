# Decision log

Newest first. Each entry: what we decided, why, and what would make us revisit it.

---

## 2026-11-21: Full catalogue switched off until the cards exist

- We only have Thailand and Japan, so the store sells only those. The
  100-country list, search, region filters and sample-card pages stay in the
  code, switched off.
- `catalogue` in `src/content/catalogue.ts` is now just the countries with
  card text. Search and filters appear by themselves once more than 8
  countries are on sale; the trip-pack discount only advertises tiers that
  can be reached.
- To preview the full catalogue: `NEXT_PUBLIC_FULL_CATALOGUE=on`.

## 2026-11-21: The store is built for 100 countries

- Owner's direction: assume 100 countries and build as if they exist now.
- `src/content/catalogue.ts` lists every country we sell (name, flag code,
  language, region). The homepage browser, the add-a-country picker and the
  cart all run on it, with search, so they work the same at any size.
- Card text still lives only in `src/content/cards`. A catalogue country
  without card text gets a product page with sample cards (wording held
  back) and no emergency number shown. `isReady()` is unchanged.
- **Buying several countries:** each country is its own cart line. On a
  product page you search and add other countries; the discount (2: 15%,
  3 or more: 25%) applies to everything and shows live. The cart is saved in
  the browser. Checkout is not connected yet.
- Flags come from the country-flag-icons package (files in `public/flags`).

## 2026-11-21: Cards are adapted to each country's cooking, not only its language

- Owner's direction: each card must speak to the waiter and chef in terms of
  that country's cooking styles and equipment (Thailand: shared wok, fresh
  oil, the mortar and pestle). The store now says so on the homepage, product
  pages, comparison chart, FAQ and story page.
- New cards must follow this; see `docs/translation-process.md`.

## 2026-11-21: The store shows its launch-day look ("launch preview")

- The owner wants the store written and shown as the finished business, not
  as today's state. `src/content/launch-preview.ts` switches the _display_:
  statuses read "Available", preview and draft notices are hidden, the buy
  button looks live, and the placeholder reviews section is hidden.
- It does not touch the card data or `isReady()`. Checkout, when built, must
  use `isReady()` so an unchecked card can't be sold.
- Reviews are hidden rather than invented. Card size (85.6 × 54 mm) and
  "printed sets leave within two working days" are our working assumptions.
- Set `NEXT_PUBLIC_LAUNCH_PREVIEW=off` to see the real state.

## 2026-11-21: Store footer and story page rebuilt against the reference stores

- **Footer:** a full-width dark band, a turning "Eat with confidence" stamp
  breaking the top edge, a playful sign-up headline ("Our emails are 100%
  peanut-free."), three link columns, and the name as wide as the page.
  Reason: next to Ghia, Great Jones, Graza and Allbirds, ours read as an
  afterthought (same colour as the page, 5 links, no mark).
- **Only real links.** No social icons, policies or contact pages until they
  exist. The link to the pixel variant is gone from the footer.
- **Story page:** a two-colour split opener with the cards from the trip, a
  numbered journey, coloured principle tiles. Reason: the stores' pages work
  through colour blocks and big images; ours was text in boxes.
- **Still missing: photography.** Their pages are mostly photos. Ours uses the
  cards as its only images until we have photos of Julia and the trip.

## 2026-11-21: Founder story on the homepage; no guarantee for now

**Decision:** The store tells Julia's story: allergic to peanuts her whole
life, she needed these cards on her honeymoon in Thailand and Japan. As on
every reference store, the homepage has only a short teaser (above the
reviews) and the full story has its own page in the main menu, with a
mission headline, a four-step journey, a signed note from Julia (Ghia
pattern), three named principles and a way back to the shop. We are not
offering a guarantee for now.
**Why:** A maker's story is the strongest trust section the reference stores
have that we lacked (e.g. Graza's "Made by people who take olives very
seriously"), and it's true. The owner doesn't want a guarantee at this stage.
**To confirm:** the details we filled in are listed in `src/content/story.ts`.

## 2026-11-21: Variant 2 uses Great Jones's palette, exactly

**Decision:** The store uses Great Jones's swatches, sampled from
greatjonesgoods.com: cream `#faeddf`, deep forest green `#0e5540`, mustard
`#ffc933`, black `#000000`, white `#ffffff` and light cream `#fffaf5`. Their
cobalt blue is left out. Allbirds's palette is kept as an exact alternative,
switched with `data-palette` on the store wrapper
(`src/app/(shop)/v2/layout.tsx`). Graza's palette has been removed: its
chartreuse evokes Graza's olive oil and isn't ours.
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
