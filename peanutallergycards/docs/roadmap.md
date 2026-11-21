# Roadmap

Tick items off as they're done; add new ones as they come up.

## Phase 0: Setup

- [x] Competitive landscape ([research](research/2026-11-20-competitive-landscape.md))
- [x] Search demand first pass ([research](research/2026-11-20-search-demand.md))
- [x] Project folder, notes and website shell
- [x] Card format: chef card and emergency card per destination, local language front, English back
- [x] Owner's Thailand cards and Japan emergency card added as drafts, with preview pages
- [ ] Check peanutallergycards.com is registered (and the .co.uk / .com.au if wanted)
- [ ] Get real monthly search volumes from Google Keyword Planner (keyword list in the search-demand note)
- [ ] Choose hosting (Vercel?) and connect the domain

## Phase 1: Japan launch (Thailand alongside if its review is done first)

- [ ] Fix the existing Japan emergency card PDF: its English back says "call 1669" (Thailand's number); Japan is 119
- [ ] Paste the Burmese kitchen-staff note for Thailand from the original Google Drawing
- [ ] Write the Japanese chef card; adapt the kitchen lines for Japanese kitchens
- [ ] Decide whether the English chef card should mention local items the Thai front adds (ground roasted peanuts, curry paste)
- [ ] Finalise the English wording (compare with FARE's chef card; decide peanut oil wording)
- [ ] Find native Japanese and Thai reviewers ([process](translation-process.md))
- [ ] Decide the physical card size (e.g. credit card, A6/4×6 postcard) and design the print layout
- [ ] Downloadable print-ready PDF (front and back, fonts embedded) and phone-sized images
- [x] Homepage and destination buy page (`/thailand`, `/japan`): card viewer, format picker, FAQ
- [ ] Set real prices in `src/content/pricing.ts` (currently placeholders: $8 digital, $18 printed)
- [ ] Connect checkout to the buy button (Stripe Checkout, or link to the Etsy listing). It stays disabled until a destination is reviewed
- [x] Redesign the site around "eat with confidence", with a pixel-art identity and micro-animations
- [x] Fix the blurry pixel font (grid-aligned Jersey 15 and Tiny5)
- [x] Variant 2: Shopify-style store at `/v2` ([research](research/2026-11-21-shopify-store-patterns.md))
- [x] Choose a variant: the store; the pixel variant is deleted
- [ ] Product photography of the real printed cards, to replace the staged card shots in variant 2
- [ ] Collect real reviews after launch; until then keep the "No reviews yet" and placeholder labels
- [x] Copy and sections review against the Shopify stores ([notes](research/2026-11-21-copy-review.md)): offer in the announcement bar and header, tile buttons, translation desk, product nickname, Details and Delivery
- [x] Guarantee: decided against one for now (see decision log)
- [ ] Card size and printed-shipping details, to replace "to be confirmed" on product pages
- [ ] Write the pieces in [content to make](content-to-make.md), starting with the Japan and Thailand guides
- [x] Founder story: homepage teaser plus an "Our story" page (`/v2/our-story`), structured like the reference stores' story pages
- [ ] Julia to approve or rewrite her note, then set `approvedByJulia: true` in `src/content/story.ts` (removes the draft tag); confirm the other details marked "to confirm" there
- [ ] Write the local peanut guide for each country (promised on the store; see `docs/content-to-make.md` #8)
- [ ] Before going live: set up the hello@peanutallergycards.com mailbox and connect the email sign-up form (it currently saves nothing)
- [ ] Make the chef card's kitchen lines per-country (they are shared and Thailand-specific today), then write Japan's for Japanese kitchens
- [ ] Connect checkout (Shopify or Stripe) to the cart; it must refuse any country where `isReady()` is false
- [ ] Confirm the language for each catalogue country before writing its cards (`src/content/catalogue.ts`)
- [ ] Cloudflare: import the repo (settings in the README), then attach peanutallergycards.com
- [ ] Stripe: account, then the checkout Worker (test mode first), thank-you page and order email
- [ ] Privacy, terms, and refunds and shipping pages
- [ ] Before opening: `NEXT_PUBLIC_LAUNCH_PREVIEW=off` and `NEXT_PUBLIC_SITE_LIVE=on`
- [ ] A photo of Julia (or of the original cards from the trip) for the story page, if she's happy to share one
- [ ] If possible, a named allergist or dietitian who has looked at the cards
- [x] Store review (2026-11-21): mobile menus, product first on phones, contrast, favicon, fonts via next/font (no layout shift). Lighthouse 94–97 performance and 100 accessibility / best practices / SEO on all four pages; axe-core: no violations
- [ ] Redesign the cards (current ones are placeholders). The chef card needs a clear yes / no answer section staff can point to, since the site promises a clear answer
- [ ] Review the website copy: Thailand "where peanuts turn up" list, FAQ, meal steps
- [ ] Disclaimer, About and Contact pages
- [ ] SEO basics: titles, descriptions, sitemap, Open Graph images
- [ ] Analytics (privacy-friendly, e.g. Plausible or Vercel Analytics)
- [ ] Launch, and post in relevant Reddit communities (e.g. Japan travel, food allergies)

## Phase 2: More destinations and the paid card

- [ ] China, Mexico, Italy (and Thailand if not launched in Phase 1)
- [ ] Spanish-speaking countries share one translation but need their own emergency numbers (Mexico 911, Spain 112)
- [ ] Custom card builder (name, peanut oil, tree nuts, emergency contact)
- [ ] Payments (Stripe Checkout, or send buyers to Etsy at first)

## Phase 3: Etsy

- [ ] Etsy shop set-up
- [ ] Digital download listings per destination, with mockups
- [ ] Listing copy and tags based on the keyword research

## Phase 4: Physical cards

- [ ] Choose a print or laminate supplier (print-on-demand vs batch)
- [ ] Price and shipping

## Later (only if demand shows)

- [ ] Apple Wallet pass for each card (promised on the store). Needs an Apple Developer account ($99/year), a Pass Type ID certificate and a signing step, or a hosted pass service. Build one test pass first: the front of a pass only fits short fields, so check the full card text reads well
- [ ] Google Wallet pass for Android (separate system from Apple's)
- [ ] Installable, offline-ready website (PWA)
- [ ] Native app
- [ ] School and caregiver cards for parents
- [ ] Tree nut cards
