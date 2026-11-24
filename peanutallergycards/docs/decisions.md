# Decision log

Newest first. Each entry: what we decided, why, and what would make us revisit it.

---

## 2026-11-24: The Tokyo page reads like a field guide

- Each write-up on `/peanut-free-restaurants-tokyo` is now in our own voice:
  what we ordered, how it was, what to order. The owner asked for this and
  confirmed every meal was really good, so the page may say "delicious".
- The dishes are still only what the photos show. We don't add details
  nobody told us (prices, portions, who ordered what).
- The "not peanut-free kitchens" notice and the card result line stay as
  they were: praise for the food is not a promise about the kitchen.
- Revisit if the owners want to add more of the story for a place (what the
  staff said, what they would order next time): it goes in the same field.

---

## 2026-11-24: A comparison page that names Equal Eats

- Added `/equal-eats-alternative` ("Equal Eats vs Peanut Allergy Cards"),
  linked from the footer. It is the usual search page for people comparing
  cards: the short answer, a side-by-side table, a section per topic, and
  the questions people search for (with FAQ, article and breadcrumb data).
- Rewritten the same day at the owner's request to argue our case, the way
  a search consultant would: "Equal Eats alternative" in the title, heading
  and footer link, our verdict at the top, "Better" tags in the table,
  sections for Thailand and Japan that link to the product pages, and more
  questions. Claims about Equal Eats are still only facts from their site.
- The homepage order changed too (owner): the statement, then how it works,
  then "written for the kitchen", then our story, then the Trip Pack band.
- It is the one place we name a competitor. The product pages' table still
  doesn't.
- Rules, kept at the top of `src/content/equal-eats.ts`: every fact about
  them comes from their own site with the date we read it; it says plainly
  when they are the better choice; no claims about their quality.
- Our prices, countries and refund days are read from the same files as the
  rest of the site, so the page can't drift. Their prices can: re-read their
  site before editing, and every few months.
- Like every page, it stays out of search engines until
  `NEXT_PUBLIC_SITE_LIVE=on`.

## 2026-11-24: Share cards: a photo with no words, and no repeated text

- When a link is shared, the message shows a picture, a title and the web
  address. Ours said "Peanut Allergy Cards" in all three, and twice in the
  picture. Now the picture is the real photo of the card beside the ramen
  with no words on it, and the share title never repeats the site's name.
- Each page can give a share title and line that differ from its search
  title (`shareTitle`, `shareDescription` in `src/content/seo.ts`). Search
  titles are unchanged.
- The Tokyo restaurants page has its own share picture (the pizza). Its
  trip date is November 2026. The miso ramen shop from that trip stays off
  the page (owner's call): we don't know its name.

## 2026-11-24: Shipping and refunds

- Owner's decisions: laminated cards post to the United States only;
  shipping is free; orders are posted within three business days; any order
  can be refunded within 14 days (the same promise Equal Eats makes).
- Added `/shipping`. The numbers live in `src/content/shipping.ts`, and the
  product pages' Delivery note, the cart and the terms read from it. The
  product pages used to say "two working days".
- My additions, not confirmed by the owner: no need to send cards back for a
  refund; a free replacement if cards are lost (10 business days after
  posting), damaged or wrong; "USPS, usually 2 to 5 business days".
- Checkout must refuse laminated orders to addresses outside the US.
- Revisit: international posting, once the US orders run smoothly.

## 2026-11-24: "The best peanut-free restaurants in Tokyo"

- A page at `/peanut-free-restaurants-tokyo` lists where the owners ate on
  their trip in November: Pizza Kevelos (Harajuku), Kyushu Jangara (Ginza),
  Gyu-Kaku and Sukiya, plus Kazurano Seishuan in Arashiyama, Kyoto. At each
  one they showed the chef card and the kitchen said yes. The photos are
  their own.
- The title says "peanut-free restaurants" because that is the phrase people
  search for (owner's call). None of these kitchens is peanut-free, so a
  highlighted notice directly under the headline says so, and the search
  description does too. Keep that notice whatever else changes.
- Only meals the owners really ate go on the page, described from their
  photos. The two chains carry a line saying we can only speak for the
  branch we ate at.
- Restaurant names came from the photos (logos, a tray liner, a placemat)
  and the photos' map pins, then checked against listings. The miso ramen
  in the homepage photo is not on the page: we don't know its name yet.
## 2026-11-24: Terms of use: the card asks, it doesn't guarantee

- Added `/terms`, linked from the footer beside the privacy policy and laid
  out like it. The wording lives in
  `src/content/terms.ts`.
- What it sets out: the cards are a communication aid and not a guarantee;
  they are not medical advice; always carry your medication; the restaurant's
  answer is the restaurant's; the decision to eat is the customer's; personal
  use only; our responsibility is limited as far as the law allows, without
  taking away consumer rights (liability for injury caused by our own
  negligence can't be excluded in the UK or EU, so we don't try).
- Reason: the owner asked how responsible they are for the cards. The honest
  promise is that the card asks the question clearly. Site copy should stay
  inside that promise.
- Strengthened the same day after reading Equal Eats' terms: no guarantee
  the card will be understood (with the reasons why), the buyer confirms
  they've had medical advice and will take their own precautions, changed
  cards are at the buyer's risk, and no liability for a reaction as far as
  the law allows. Same protections, our own words: their document is theirs,
  and it names their company, Canadian law and their app.
- Left out because they aren't decided: the business's legal name, governing
  law, refunds and shipping. It is a draft until a lawyer has read it.
- It says "a native speaker checks every card before we sell it". That is
  only true while checkout is gated on `isReady()`.

## 2026-11-23: Search-friendly addresses, AVIF photos, a privacy page

- Country pages moved from `/japan` and `/thailand` to
  `/japanese-peanut-allergy-card` and `/thai-peanut-allergy-card`, the words
  people type. The old addresses redirect (`public/_redirects`). Done now
  because nothing is indexed yet; changing addresses later costs rankings.
- The rule (`productSegment` in `src/content/catalogue.ts`): language plus
  "peanut-allergy-card", and the country is added only where several
  countries share a language (`spanish-peanut-allergy-card-mexico`), so
  every address is one page. `slug` ("japan") stays the country's id in the
  cart and the card files.
- Photos are offered as AVIF first and WebP second
  (`src/components/photo.tsx`, used for every photo instead of `next/image`).
  AVIF is about a third smaller at the same look. The homepage's main photo
  went from 138 KB to 87 KB on a phone.
- Measured on a simulated slow phone: Lighthouse's estimate for that photo
  went from 3.6 s to 3.3 s; with real network throttling it paints at 2.3 s.
  The estimate assumes the photo shares the connection equally with the
  scripts, which browsers don't do. What's left is Next.js's own scripts and
  the fonts, not the photo.
- A privacy page (`/privacy`, words in `src/content/privacy.ts`) says what
  we collect, and has a form that deletes an address from the mailing list
  at once (`POST /api/unsubscribe`). It answers the same whether or not the
  address was there. Plain language, not a lawyer's draft: have it checked
  before the store takes payments, and update it when checkout is added.

## 2026-11-23: The mailing list works, and lives on our own Cloudflare account

- The sign-up form now saves addresses. It posts to `/api/subscribe`, a few
  lines of Worker code (`worker/index.ts`) that write to a D1 database
  called `peanutallergycards`. Before this the form said "You're on the
  list" and saved nothing.
- The owner reads the list at `/admin/subscribers` (and downloads it as a
  CSV), behind a password kept as the Worker secret `ADMIN_PASSWORD`, set in
  the Cloudflare dashboard and never stored in the repository.
- Only `/api/*` and `/admin/*` run code; every page and file is still served
  directly, free and unlimited. The free plan's 100,000-a-day limit now
  applies to those two paths only.
- We store the email, the time, the page it was typed on and the visitor's
  country. No IP address. Spam is kept down with a hidden field only bots
  fill in, and by refusing posts from other sites. Revisit with Cloudflare
  Turnstile if junk sign-ups appear.
- Why our own table and not a newsletter service: nothing to sign up for,
  and the list is ours. To send a newsletter, the CSV imports into any
  service; that service must then handle unsubscribes.

## 2026-11-23: Search and accessibility pass

- Every page now tells search engines its one address (canonical), has a
  share card (Open Graph and Twitter tags, `public/og.jpg`), and carries
  structured data: the business and site on the homepage, a product on each
  country page, the breadcrumb trail, and the FAQ. It all comes from
  `src/content/seo.ts`.
- The product's structured data publishes a price and "in stock" only when
  `isReady()` is true, the same gate checkout must use. No ratings or
  reviews are published until there are real ones.
- Page titles were cut to about 60 characters so they aren't clipped in
  results; descriptions to about 150.
- Accessibility: a "Skip to content" link, one thick focus ring everywhere,
  Escape closes the phone menu, text links are taller to tap, and the
  comparison table fits a phone instead of scrolling sideways (a sideways
  scroller can't be reached by keyboard without breaking a lint rule).
- `JsonLd` uses `dangerouslySetInnerHTML`, against the usual rule: React has
  no other way to write a JSON-LD script. The data is only our own content.
- The homepage's plate photo beside "A clear yes." was removed (owner's
  call); that statement now stands alone.
- Still off: search engines are blocked until `NEXT_PUBLIC_SITE_LIVE=on`.
  Lighthouse scores SEO 66 because of that and 100 with the switch on.

## 2026-11-23: peanutallergycards.com bought and attached

- The owner bought the domain through Cloudflare Registrar ($11.17, one
  year, auto-renew off: it expires 2027-11-23 unless renewed by hand).
- The Worker serves `https://peanutallergycards.com`. `www` redirects to it
  (a redirect rule on the domain), so there is one address for every page.
- The `workers.dev` address stays on as a test address and is never indexed.
- Visitor analytics now count under the real domain; the test address's
  analytics site was deleted.
- Search engines are still blocked until `NEXT_PUBLIC_SITE_LIVE=on`.

## 2026-11-23: Deployed to Cloudflare; analytics, alerts and resized photos

- The site is live at `https://peanutallergycards.phkap96.workers.dev`, as a
  Cloudflare Worker named `peanutallergycards` that serves only files. It was
  uploaded from a Claude session through Cloudflare's API. Search engines
  stay blocked (`robots.txt`, plus a `noindex` header on any workers.dev
  address).
- It stays files-only on purpose. Requests for files are free and unlimited;
  putting Worker code in front of every request (for example to log visits)
  would count each one against the free plan's 100,000 a day and return
  errors past that. Revisit only for checkout, and then run code on the
  checkout paths alone.
- Visitors are counted with Cloudflare Web Analytics (free, no cookies, no
  consent banner). Each web address needs its own token; see
  `src/components/web-analytics.tsx`.
- Photos are resized before every build (`scripts/build-images.mjs`) and
  `src/image-loader.ts` picks a size per screen, because a static export has
  no image server. WebP only: AVIF would be smaller but needs a second file
  per size and a `<picture>` element for old browsers.
- `public/_headers` sets one-year caching for files with a hash in the name,
  and a content security policy. The policy allows inline scripts because
  Next.js needs them; Stripe's hosts must be added to it for checkout.
- Email alerts on the Cloudflare account: any spend of $1 or more, Worker
  code passing 1 million requests in a month, major Cloudflare incidents, and
  a weekly visitor summary.

## 2026-11-22: Images: one real photo, plus generated peanut illustrations

- The homepage hero is a real photo (the laminated card beside ramen in
  Japan). The other images are AI-generated illustrations supplied by the
  owner, used as humour and decoration: never as customers, testimonials or
  pictures of the product in use.
- No generated image shows card wording. Card images stay generated from
  `src/content/cards`.

## 2026-11-21: The store is the site; hosting on Cloudflare

- The store moved from `/v2` to `/`, and the pixel-art variant was deleted
  (the owner had moved on from it). It is still in git history.
- The site is exported as plain files (`output: "export"`) and served by
  Cloudflare Workers static assets. Reason: every page is static and the cart
  runs in the browser, so no server is needed until checkout. Cloudflare's
  docs point Next.js apps that need a server at vinext; revisit that if we
  ever need server rendering.
- Search engines are blocked (`robots.txt`) until `NEXT_PUBLIC_SITE_LIVE=on`,
  so a half-finished store can't be indexed.
- Payments: Stripe Checkout through a Cloudflare Worker (planned). The Worker
  sets prices and must refuse countries where `isReady()` is false.

## 2026-11-21: The Trip Pack is its own product

- A bundle page at `/v2/trip-pack`: tick the countries on your trip (search
  once the list is long), choose a format, add them all in one go. It sits
  beside the countries on the homepage and is linked from the header and
  footer.
- It uses the same cart lines and the same discount as adding countries on a
  product page, so there is one set of pricing rules.
- No flags in the add-a-country picker (owner's call).

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
