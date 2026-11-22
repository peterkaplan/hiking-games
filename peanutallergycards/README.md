# Peanut Allergy Cards

**peanutallergycards.com**: peanut allergy cards in other languages, for
people travelling and eating out. A small side business: a website with free
and paid cards, plus an Etsy store.

**Status:** pre-launch. This project lives in the `hiking-games` repo for now and
moves to its own repo later (see [Moving to its own repo](#moving-to-its-own-repo)).

## Where things are

| Path                                                         | What's in it                                                     |
| ------------------------------------------------------------ | ---------------------------------------------------------------- |
| [`docs/strategy.md`](docs/strategy.md)                       | What we're building, for whom, how it makes money                |
| [`docs/roadmap.md`](docs/roadmap.md)                         | Phases and the next tasks (checklist)                            |
| [`docs/decisions.md`](docs/decisions.md)                     | Decision log: what we decided and why                            |
| [`docs/translation-process.md`](docs/translation-process.md) | How a translation goes from draft to live                        |
| [`docs/content-to-make.md`](docs/content-to-make.md)         | Guides and stories to write, with the search phrases behind them |
| [`docs/shot-list.md`](docs/shot-list.md)                     | Images to generate, with the brief for each                      |
| [`docs/research/`](docs/research/)                           | Dated research notes (competitors, search demand)                |
| [`src/content/cards/`](src/content/cards/)                   | Card text for every language: the single source of truth         |
| [`src/app/`](src/app/)                                       | The website (Next.js)                                            |

## Run it

```bash
cd peanutallergycards
npm install
npm run dev        # http://localhost:3000
npm run check      # lint and format check (Biome, via Ultracite)
npm run fix        # apply lint and format fixes
npm run typecheck
npm run build      # writes the whole site to out/ as plain files
npm run preview    # build, then serve out/ the way Cloudflare will
```

## Hosting: Cloudflare

Every page is built ahead of time, so the site is plain files in `out/`,
served by Cloudflare Workers static assets (`wrangler.jsonc`). There is no
server yet; checkout will add a small Worker.

To let Cloudflare build from GitHub, import the repository under
Workers & Pages and set:

| Setting        | Value                 |
| -------------- | --------------------- |
| Root directory | `peanutallergycards`  |
| Build command  | `npm run build`       |
| Deploy command | `npx wrangler deploy` |

Or deploy by hand with `npm run deploy` (needs `wrangler login` or a
`CLOUDFLARE_API_TOKEN`).

Two switches, set as build variables in Cloudflare:

- `NEXT_PUBLIC_SITE_LIVE=on` lets search engines in. Leave it off until the
  store is really open: `robots.txt` blocks everything without it.
- `NEXT_PUBLIC_LAUNCH_PREVIEW=off` shows each card's real review state
  instead of the launch-day look.

## How the card content works

We sell **two cards per destination**: a **chef card** for restaurant staff and
an **emergency card** for anyone nearby during a reaction. Each has the local
language on the front and English on the back.

All card wording lives in `src/content/cards/`:

- `english.ts`: the English text, used for every back and as the source for translations;
- one file per destination (`japan.ts`, `thailand.ts`): its fronts and emergency number;
- `index.ts`: the destination list and the rules for when a card is ready.

Every translation records which English version it came from and who reviewed
it. A destination only shows as **Available** once a native speaker has
reviewed every part against the current English. The build also fails on
mistakes like the wrong emergency number. Details in
[`docs/translation-process.md`](docs/translation-process.md).

## Moving to its own repo

Everything for this project is inside this folder, so it can be split out with
its history:

```bash
# from the hiking-games repo root
git subtree split --prefix=peanutallergycards -b peanutallergycards-export
git push <new-repo-url> peanutallergycards-export:main
```
