# Strategy

_Last updated: 2026-11-20_

## Value proposition

**Eat abroad with confidence.** You show the card, the kitchen reads exactly
what you can't eat in their own language, and they **confirm** whether they can
make your meal safely. The point isn't translation; it's getting a clear
yes or no so you know you can eat.

The site's headline says it in three beats: _Show the card. Get a clear yes.
Eat with confidence._

## Goal

A small, low-maintenance side business. Optimise for low running costs and
little ongoing work, not for growth at any cost.

## Who it's for

- People with a peanut allergy, and parents of children with one, **travelling
  abroad or eating at restaurants where staff speak another language**.
- They're anxious and motivated: someone searching "peanut allergy card
  japanese" usually has a trip booked.
- Searches are low-volume but have little competition (see
  [search demand research](research/2026-11-20-search-demand.md)).

## What we sell

The core product is a **pair of cards per destination**, each with the local
language on the front and English on the back:

- **Chef card:** handed to restaurant staff. Says the allergy can kill, lists
  what to avoid, gives kitchen instructions, and asks whether they can make
  100% safe food.
- **Emergency card:** shown to anyone nearby during a reaction. Says it's
  anaphylaxis and asks them to call the local ambulance number.

| Product                                                              | Price             | Purpose                                            |
| -------------------------------------------------------------------- | ----------------- | -------------------------------------------------- |
| Free card pair, per destination (PDF and phone image)                | Free              | Matches "free" searches; brings people to the site |
| Custom cards (name, peanut oil yes/no, tree nuts, emergency contact) | One-off fee (TBD) | Main paid product                                  |
| Multi-destination bundle (e.g. a whole trip)                         | One-off fee (TBD) | Upsell                                             |
| Printed, laminated card pair                                         | TBD               | Later, once digital sells                          |

One-off prices, no subscriptions. The market leader's subscription pricing
draws complaints (see [competitive landscape](research/2026-11-20-competitive-landscape.md)).

## Channels

1. **Website.** One page per destination (`/japan`, `/thailand`…). Titles
   should use both forms people search: "peanut allergy card japan" and
   "japanese peanut allergy card".
2. **Etsy.** Digital downloads first (no fulfilment cost); physical cards later.
   Etsy brings its own buyers, which matters while Google volume is small.
3. **App: deferred.** Phone wallet passes, phone-sized images and an
   installable website cover most of what an app would do.

## How we're different

- **Peanut-first.** Competitors cover every allergen. We go deeper on peanut:
  peanut oil (tolerance varies), "groundnut" and satay naming, cross-contact,
  and the cuisines where peanut is common.
- **Reviewed translations.** Every card is checked by a native speaker, and the
  site shows the review status. This is competitors' weak spot.
- **Free to start, one-off prices after.**

## Language priority

From Google autocomplete and Trends (see research):

1. Japanese (launch language)
2. Chinese (Simplified)
3. Spanish (Mexico first)
4. Thai
5. Italian

Then French, Indonesian, Vietnamese, Korean, Greek and German.

## Risks

- **Translation errors could hurt someone.** Mitigated by native review, the
  review-status model in code, and a clear disclaimer.
- **Low search volume.** Mitigated by Etsy, Reddit and Facebook travel or allergy
  groups, and low costs.
- **Free alternatives** (FARE, Allergy & Anaphylaxis Australia). We compete on
  personalisation, peanut-specific detail and design.
- **Childhood peanut allergy is declining** (early-introduction guidelines). The
  adult market (about 4.5M US adults) remains.

## Open questions

- Is peanutallergycards.com registered?
- Who reviews the Japanese translation, and at what cost?
- Prices for the custom card and bundle.
- Hosting (Vercel is the default choice for Next.js) and payments (Stripe, or
  Etsy only at first).
- Success targets for the first 3 months (proposal: Japanese page on Google
  page 1 for "peanut allergy card japanese", and the first 10 Etsy sales).
