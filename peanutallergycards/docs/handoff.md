# Handoff: where the project stands

Written 2026-11-23 so a new session can pick up without the earlier chat.
Read this first, then `README.md`, `CLAUDE.md` and `docs/decisions.md`.

## What this is

peanutallergycards.com: a small side business selling peanut allergy cards
for eating in restaurants abroad. Two cards per country (a chef card and an
emergency card), local language on the front, English on the back, plus a
"local peanut guide". Sold laminated (with the digital set free) or digital
only. Thailand and Japan first.

The owners are Julia, who has the allergy, and her fiancé Peter, who made
the original cards for their honeymoon in Thailand and Japan.

## Where the code is

- Repository `peterkaplan/hiking-games`, branch
  `claude/new-repo-setup-c3arys`, folder `peanutallergycards/`. Everything is
  self-contained in that folder so it can be split into its own repo later
  (see the README). No pull request has been opened.
- Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, Biome via
  Ultracite. Before committing: `npm run check`, `npm run typecheck`,
  `npm run build`.
- The site is a static export (`out/`), meant for Cloudflare Workers static
  assets (`wrangler.jsonc`). `npm run preview` serves it the way Cloudflare
  will.

## The site today

| Page                  | What's there                                                                                                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                   | Hero with a real photo, "Shop by country" (Japan, Thailand, The Trip Pack), the statement, "Written for the kitchen", four pixel-art steps, story teaser, FAQ                |
| `/thailand`, `/japan` | Gallery, price, buy box (format, add another country), accordions, "Learn to say peanut", "Where peanuts hide" (Thailand only), steps and photo strip, comparison chart, FAQ |
| `/trip-pack`          | The bundle product: tick countries, choose a format, add all to cart                                                                                                         |
| `/cart`               | Cart saved in the browser; multi-country discount; Checkout button says it is not connected                                                                                  |
| `/our-story`          | Split opener, "How it started", Julia's note, "What we believe"                                                                                                              |
| not found             | "Nothing here. Not even peanuts."                                                                                                                                            |

Design: Great Jones's palette (cream `#faeddf`, green `#0e5540`, mustard
`#ffc933`, black), Young Serif headings, Instrument Sans body, DM Mono
labels. Colours are job-named tokens in `src/app/globals.css`.

## How the owner wants things done

These came up repeatedly and are easy to get wrong.

- **Write the site as the finished business.** Don't hedge about what isn't
  ready ("we're adding countries one at a time because…"). The launch look is
  a display switch (`src/content/launch-preview.ts`); the card data still
  records the truth.
- **Voice:** short, confident headlines like the reference stores (Graza,
  Ghia, Great Jones, Magic Spoon, Allbirds). "An app translates. A card
  asks." Not explanations of how the business runs.
- **It's about restaurants:** hand the card to your waiter, get a clear yes
  or no from the chef. Phrases the owner rejected: "no polite nods", "works
  with no signal" (use "no miscommunication", "no app, no wifi").
- **The peanut is the enemy, not a mascot.** In images it is caught, kept
  out or left behind, never on holiday. See `docs/shot-list.md`.
- **The pixel-art characters stay** (the four step drawings, the chef in
  "Learn to say peanut"). The old all-pixel site design is gone.
- **Each card is adapted to how that country cooks,** not only translated
  (Thailand: clean wok, fresh oil, no shared mortar and pestle).
- **Little text above the buy button** on product pages: one sentence, then
  the options. Show the selected price with a struck-through comparison, not
  "from $8".
- **No flags in the add-a-country picker.** The request-a-card line lives in
  the FAQ only.
- Replies to the owner: plain language, lead with what changed, and show it.

## Things that must not be weakened

- Card wording lives only in `src/content/cards/`. Never mark a translation
  `reviewed` without a named native-speaker reviewer. Both countries are
  `draft` today.
- `isReady()` is the real gate. When checkout is built it must use it, not
  the launch look, so an unchecked card cannot be sold.
- No invented reviews, customers or testimonials. The reviews section is
  hidden until there are real ones. Generated images never show faces or
  stand in for Julia or a customer.
- The struck-through price is a real sum (laminated $18 + digital $8 = $26),
  not an invented "was" price.
- Search engines are blocked by `robots.txt` until
  `NEXT_PUBLIC_SITE_LIVE=on`.

## Switches

| Variable                         | Effect                                                                     |
| -------------------------------- | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_LAUNCH_PREVIEW=off` | Show each card's real review state instead of "Available"                  |
| `NEXT_PUBLIC_FULL_CATALOGUE=on`  | Sell all 100 countries in `src/content/catalogue.ts` (built, switched off) |
| `NEXT_PUBLIC_SITE_LIVE=on`       | Let search engines in                                                      |
| `NEXT_PUBLIC_ASSET_BASE=""`      | Only for the relocatable preview build (below)                             |
| `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` | Web Analytics token for the address being built; empty turns counting off  |

## Open items, in rough order

Needs the owner:

1. **Cloudflare:** the site is live at `https://peanutallergycards.com`
   (see "Hosting" below). Still to do: connect the GitHub repo in the
   Cloudflare dashboard so pushes deploy by themselves (a session can't: it
   needs the owner to approve Cloudflare's GitHub app and it creates an API
   token). The domain's auto-renew is off; it expires 2027-11-23.
2. **Stripe:** open an account. Then build a Cloudflare Worker that prices
   the cart server-side, creates a Stripe Checkout session and handles the
   paid webhook. Test mode first.
3. **Native-speaker checks** for Thai and Japanese, including the
   `sayPeanut` spellings and pronunciations.
4. **The product files:** print-ready PDF, phone images, the local peanut
   guide, and the Apple Wallet pass (needs an Apple Developer account).
5. **Julia** to approve or rewrite her note in `src/content/story.ts`
   (`approvedByJulia`), and a real photo of her.
6. Shipping prices and countries, the `hello@peanutallergycards.com`
   mailbox, a newsletter service (the sign-up form saves nothing), real
   prices (the $8 and $18 are placeholders), and real reviews.

Can be done without the owner:

7. **Japanese chef card.** Japan's page shows only the emergency card. The
   full Japanese chef card text is legible in the owner's ramen photos; the
   offer to type it in as a draft was made but not answered. Its kitchen
   lines should suit Japanese kitchens (the shared English ones are
   Thailand-specific; see the roadmap).
8. Privacy, terms, and refunds and shipping pages; a contact page.
9. An Open Graph sharing image.
10. **Protect the card wording.** The product galleries show every card
    front and back as selectable text. The proposal on the table: English
    back in full, local-language front as an image with the lower part
    faded, real card composited onto the blank cards in the hand-over and
    chef photos. Not yet agreed.

Unanswered questions to the owner:

- Bring the pixel chef with the green tick back beside "One card. One
  question. A clear yes."? A plate photo sits there now.
- Use a second ramen photo (card held in hand) as a product close-up? They
  said earlier not to reuse those photos.
- Is "fiancé" plus "honeymoon" right, or should the story say "husband"?

## Hosting

- Cloudflare Worker `peanutallergycards` on the owner's account, files only
  (no code runs), at `https://peanutallergycards.com`. `www` redirects to
  it; `https://peanutallergycards.phkap96.workers.dev` is a test address.
  Deployed 2026-11-23 by uploading
  `out/` through the Cloudflare connector, because the session had no API
  token for `wrangler deploy`. The steps: `npm run build`; send the file list
  to `assets-upload-session`; upload the files to `api.cloudflare.com` with
  the short-lived token it returns; `PUT` the Worker with the completion
  token and the contents of `out/_headers` as `assets.config._headers`.
  Once the GitHub repo is connected in the dashboard none of that is needed.
- Photos: `npm run build` first runs `scripts/build-images.mjs`, which writes
  resized copies to `public/img/` (not in git) and the list to
  `src/images/variants.json` (in git). Add a photo to `src/images/`, import
  it as before, and give the `<Image>` a `sizes` value.
- Headers (caching, security) are in `public/_headers`.
- Visitor numbers: Cloudflare dashboard, Analytics & Logs, Web Analytics.
  The snippet is `src/components/web-analytics.tsx`.
- Alerts (Cloudflare dashboard, Notifications): spend of $1 or more, spend of
  $10 or more, Worker code past 1 million requests in a month, R2 storage
  past 8 GB, major Cloudflare incidents, weekly visitor summary. All by
  email to the account address.
- Not set up: an uptime check, and logs of individual requests (files-only
  Workers don't produce them).

## Images

Twenty images in `src/images/`: one real photo (`ramen-with-card.webp`) and
AI-generated illustrations supplied by the owner. `docs/shot-list.md` has
the style block, the brief for each shot, and a table of where each one is
used. Still wanted: Japan "where peanuts hide" shots (after a checked list
of dishes), and real photos.

The owner's original uploads (the card PDFs and the phone photos) were in
the earlier session's temporary storage and are not in the repo. Ask for
them again if needed.

## The clickable preview

The owner used to review the site at a private claude.ai artifact (it is
now live, so the artifact is out of date unless refreshed): `https://claude.ai/artifact/9neXyarKbqp6Xq4dHfySBz`. To refresh it:

```bash
NEXT_PUBLIC_ASSET_BASE="" npx next build
python3 scripts/preview-export.py out <folder>
# publish <folder>/index.html as the artifact, with every other file in
# <folder> listed as a supporting file; then run a normal `npm run build`
```

The script flattens the export so it runs from any folder: pages beside
`index.html`, assets under `assets/`, relative paths, and a small script
that turns site links into file names. From a new conversation the artifact
has to be read before it can be updated, or a publish creates a new link.
An older static copy at `https://claude.ai/artifact/3fsxJdNPfas5Rf7N5u5Gpd`
is out of date and can be ignored.

## Checks that were being run

After each change, against the built site at 320, 390 and 1280 pixels wide:
no horizontal overflow on any page, no failed requests, axe-core with no
violations, and a palette audit (only the six palette colours, apart from
card images, flags and pixel art). On 2026-11-23 Lighthouse (phone) gave
accessibility 100, speed 90 to 100, and SEO 100 with the live switch on.
The scripts live in the session's scratch folder and are not kept; they are
short Playwright scripts (serve `out/` with `npx wrangler dev`, load each
page, inject `axe-core`) and are quick to rewrite.

Search metadata and structured data are in `src/content/seo.ts`; each page
calls `pageMetadata()` with its own address.

## Where to look

| File                          | What it holds                                            |
| ----------------------------- | -------------------------------------------------------- |
| `docs/decisions.md`           | Every decision and its reason, newest first              |
| `docs/roadmap.md`             | The full checklist                                       |
| `docs/shot-list.md`           | Image briefs and placements                              |
| `docs/content-to-make.md`     | Guides and stories to write, with search phrases         |
| `docs/translation-process.md` | How a card goes from draft to on sale                    |
| `docs/research/`              | Competitors, search demand, the reference stores         |
| `src/content/`                | Cards, catalogue, pricing, FAQ, story, comparison chart  |
| `src/components/shop/`        | The store's components (buy box, cart, footer, sections) |
