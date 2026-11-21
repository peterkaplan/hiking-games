# Peanut Allergy Cards: notes for Claude

Start with `README.md`, then `docs/strategy.md` and `docs/roadmap.md`.
The repo-root `.claude/CLAUDE.md` (Ultracite and Biome code rules) applies here too.

## What this is

peanutallergycards.com: peanut allergy cards in other languages for travellers.
A small, low-maintenance side business: website (free and paid cards) plus Etsy.
A native app is deliberately deferred (see `docs/decisions.md`).

## Rules

### Card safety

People rely on these cards to avoid a serious allergic reaction.

- Card wording lives only in `src/content/cards/`. Pages, PDFs, Etsy files and
  wallet passes are generated from it. Never copy card text into components.
- Never mark a translation `reviewed` yourself. AI or machine drafts must stay
  `status: "draft"`. Only a named native-speaker reviewer moves a card to `reviewed`.
- When you change English card wording, bump `ENGLISH_SOURCE_VERSION` in
  `src/content/cards/english.ts` and say so in the commit message.
- Only offer a destination's cards as ready when `isReady(destination)` is true.
- Never weaken `contentProblems()` in `src/content/cards/index.ts` to get a
  build passing. Fix the content instead.
- Don't copy Thai or Burmese text from PDFs without checking it; see
  "Copying text from Google Drawings PDFs" in `docs/translation-process.md`.
- Site copy must not give medical advice. Keep the "not medical advice"
  disclaimer on every page that shows a card.

### Notes

- Record decisions in `docs/decisions.md`, newest first, with the reason.
- Put research in `docs/research/YYYY-MM-DD-topic.md`, with sources and what it means for us.
- Ideas for guides, stories and other content go in `docs/content-to-make.md`.
- Tick off `docs/roadmap.md` items when they're done, and add new ones you discover.

### Code

- Keep this folder self-contained: no imports from outside `peanutallergycards/`
  and no changes to the hiking-games app. It will move to its own repo.
- Before committing, run `npm run check`, `npm run typecheck` and `npm run build`
  from this folder.
