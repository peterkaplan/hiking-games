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
- [ ] Choose a variant (or merge the best of both) and delete the other
- [ ] Product photography of the real printed cards, to replace the staged card shots in variant 2
- [ ] Collect real reviews after launch; until then keep the "No reviews yet" and placeholder labels
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

- [ ] Apple Wallet and Google Wallet passes
- [ ] Installable, offline-ready website (PWA)
- [ ] Native app
- [ ] School and caregiver cards for parents
- [ ] Tree nut cards
