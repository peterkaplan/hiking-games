# Peanut Allergy Cards

**peanutallergycards.com**: peanut allergy cards in other languages, for
people travelling and eating out. A small side business: a website with free
and paid cards, plus an Etsy store.

**Status:** setup. This project lives in the `hiking-games` repo for now and
moves to its own repo later (see [Moving to its own repo](#moving-to-its-own-repo)).

## Where things are

| Path                                                         | What's in it                                             |
| ------------------------------------------------------------ | -------------------------------------------------------- |
| [`docs/strategy.md`](docs/strategy.md)                       | What we're building, for whom, how it makes money        |
| [`docs/roadmap.md`](docs/roadmap.md)                         | Phases and the next tasks (checklist)                    |
| [`docs/decisions.md`](docs/decisions.md)                     | Decision log: what we decided and why                    |
| [`docs/translation-process.md`](docs/translation-process.md) | How a translation goes from draft to live                |
| [`docs/research/`](docs/research/)                           | Dated research notes (competitors, search demand)        |
| [`src/content/cards/`](src/content/cards/)                   | Card text for every language: the single source of truth |
| [`src/app/`](src/app/)                                       | The website (Next.js)                                    |

## Run it

```bash
cd peanutallergycards
npm install
npm run dev        # http://localhost:3000
npm run check      # lint and format check (Biome, via Ultracite)
npm run fix        # apply lint and format fixes
npm run typecheck
npm run build
```

## How the card content works

All card wording lives in `src/content/cards/`, one file per language. The
English file is the source; every translation records which English version it
came from and who reviewed it. A language only shows as **Available** when a
native speaker has reviewed it against the current English text. Change the
English wording → bump `ENGLISH_SOURCE_VERSION` → every translation shows as
out of date until it's redone. Details in
[`docs/translation-process.md`](docs/translation-process.md).

## Moving to its own repo

Everything for this project is inside this folder, so it can be split out with
its history:

```bash
# from the hiking-games repo root
git subtree split --prefix=peanutallergycards -b peanutallergycards-export
git push <new-repo-url> peanutallergycards-export:main
```
