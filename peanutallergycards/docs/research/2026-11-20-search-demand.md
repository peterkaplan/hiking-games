# Search demand

_Pulled 2026-11-20 from Google autocomplete (US, English) and Google Trends._

## Summary

- **Japan is the top destination.** "japanese" is Google's first suggestion
  after "peanut allergy card", and Japan leads peanut-allergy destination searches.
- **Volume is low**, with probably tens to a few hundred searches a month for each
  card phrase. Our exact phrases are below Google Trends' reporting threshold.
  That's an estimate, not a measurement; get real numbers from Keyword Planner
  (list below).
- People search for **free** cards, and for **tree nut** as well as peanut.
- People research peanut allergy and Japan on **Reddit** ("peanut allergy japan reddit").

## Google autocomplete

Roughly ordered by popularity.

| Typed                        | Suggestions                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| peanut allergy card          | **japanese**, italian, thailand, chinese, in french, in spanish, indonesia                          |
| peanut allergy card in       | french, thai, spanish, indonesia, japanese, italian, chinese, greek, vietnamese, german             |
| japanese peanut allergy card | japanese nut / food / tree nut allergy card, japanese peanut and tree nut allergy card              |
| peanut allergy in japanese   | nut / food allergy in japanese, peanut allergy in japan (reddit), i have peanut allergy in japanese |
| peanut allergy japan         | japanese card, japanese translation, japan reddit, japan travel, nut allergy japan                  |
| allergy translation card     | **free**, uk, australia, **free japanese**, spanish, french, japanese, greek                        |
| peanut allergy translation   | translation cards, thai / spanish / french / japanese / greek translation                           |
| allergy card japan           | shellfish, nut, gluten, seafood allergy card japanese                                               |

## Google Trends (5 years, relative 0–100 within each comparison)

| Comparison                                                                                                                | 5-year average      |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Worldwide destinations: peanut allergy + Japan / China / Mexico / Thailand / Italy                                        | 6 / 5 / 3 / 1 / 1   |
| Worldwide Japan topics: food allergy japan / celiac japan / allergy card japan / peanut allergy japan / nut allergy japan | 11 / 10 / 3 / 2 / 0 |
| US card terms: allergy card / food allergy card / allergy translation card / peanut allergy card / nut allergy card       | 11 / 1 / 0 / 0 / 0  |

**Caution:** almost every term reads near zero before 2024 and then rises sharply
in 2025–26, including unrelated control terms. With volumes this low, much of
that is likely sampling noise, so don't read it as exact growth.

## What it means for us

1. Build one page per language, matching "peanut allergy card in X". Japanese first.
2. Offer a free card; people search for "free".
3. Consider "peanut and tree nut" cards.
4. Reddit and Etsy matter as much as Google, because search volume alone is small.
5. Japan-allergy interest is broader than peanut (food allergy, celiac). That's a
   possible expansion later, but stay peanut-first for now.

## Next step: real volumes from Keyword Planner

Google Keyword Planner (free with a Google Ads account, no need to run ads)
gives monthly volume ranges. Fill this in:

| Keyword                        | US monthly volume | Global monthly volume |
| ------------------------------ | ----------------- | --------------------- |
| peanut allergy card            |                   |                       |
| peanut allergy card japanese   |                   |                       |
| japanese peanut allergy card   |                   |                       |
| peanut allergy in japanese     |                   |                       |
| peanut allergy japan           |                   |                       |
| nut allergy card japanese      |                   |                       |
| allergy translation cards      |                   |                       |
| allergy translation cards free |                   |                       |
| food allergy card japan        |                   |                       |
| peanut allergy card thai       |                   |                       |
| peanut allergy card spanish    |                   |                       |
| peanut allergy card chinese    |                   |                       |
| peanut allergy card italian    |                   |                       |
| peanut allergy chef card       |                   |                       |
| allergy chef card              |                   |                       |

## Method

- Autocomplete: `suggestqueries.google.com` (`client=firefox`, `hl=en`, `gl=us`).
- Trends: `trends.google.com` explore API, "today 5-y", averages per comparison set.
- Both hosts are allowed in the `peanutallergycards` cloud environment.
