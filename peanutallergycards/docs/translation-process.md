# Translation process

People rely on these cards to avoid a serious allergic reaction, so a
translation is only offered as ready after a native speaker has reviewed it.

## What gets translated

Each destination has two cards. The front is in the local language; the back is
English, generated automatically from `src/content/cards/english.ts`.

| Card           | Front (translated)                                     | Back (English)                          |
| -------------- | ------------------------------------------------------ | --------------------------------------- |
| Chef card      | `chefCard.front`, plus optional `staffNotes`           | `englishChefCard`                       |
| Emergency card | `emergencyCard.front`, with the local emergency number | `englishEmergencyCard(emergencyNumber)` |

`staffNotes` are short notes in a second language for kitchen staff, e.g.
Burmese in Thailand, where many restaurant workers are from Myanmar.

## States

The site works these out for every translated part, and a destination takes the
worst state of its parts:

| State         | Meaning                                                       | Shown on site as |
| ------------- | ------------------------------------------------------------- | ---------------- |
| `missing`     | Not written yet (`front: null`)                               | Coming soon      |
| `out-of-date` | Made from an older version of the English text                | Being updated    |
| `draft`       | Written, not yet reviewed                                     | In review        |
| `ready`       | Reviewed by a native speaker against the current English text | Available        |

## Automatic checks

The build fails if any destination has:

- an emergency card front that doesn't contain the destination's emergency number;
- a chef card front with a different number of bullet points from the English.

These catch copy-paste mistakes, like an English back saying "call 1669"
(Thailand's number) on a Japan card. They don't replace the native-speaker review.

## Cards are adapted to each country's kitchens

A card is not only a translation. Its kitchen instructions must name the
cooking styles and equipment a waiter and chef in that country will
recognise. The Thailand card asks for a clean wok and fresh oil and says never
to use a mortar and pestle that has been used for peanuts; other countries
need their own equivalents (for example shared fryers, grills or sauces).

- Research the country's common cross-contact risks before writing its card,
  and record the sources in `docs/research/`.
- Have the native-speaker reviewer confirm the equipment words are the ones
  kitchens use.
- Set `kitchenFocus` on the destination so the store can say what the card
  covers.
- Today the English back and its kitchen lines are shared by every country
  (`english.ts`) and are written for Thailand. Before adding a country with
  different kitchen lines, make them per-destination (see `docs/roadmap.md`).

## Adding a destination or updating a translation

1. Add or edit the destination file in `src/content/cards/` (copy `thailand.ts`
   as a template) and list it in `index.ts`.
2. Translate from the **current** English in `english.ts`. Local additions are
   fine where they help, e.g. the Thai card names ground roasted peanuts and
   curry paste. Note them in `review.notes` so the English back can be updated
   to match if needed.
3. Set `sourceVersion` to the current `ENGLISH_SOURCE_VERSION`, written as a
   number, and `review: { status: "draft" }`.
4. A **native speaker** reviews it, ideally someone who knows restaurant kitchens.
   They check:
   - "Peanut" is the everyday word, and local peanut dishes, sauces and pastes are covered.
   - The peanut oil wording says exactly what the English says.
   - "I can die" reads as serious, not as a preference or diet.
   - The kitchen instructions suit local kitchens (a wok and mortar in Thailand
     may not be the right examples in Japan).
   - The emergency card asks for an ambulance the way a local would, with the right number.
   - Tone is polite for that culture.
5. Get a back-translation: have the reviewer, or a second person, translate it
   back into English and compare.
6. Record the review: `status: "reviewed"`, `reviewer`, `reviewedOn` and any
   `notes`. Once every part is reviewed, the destination shows as **Available**.

## When the English text changes

Bump `ENGLISH_SOURCE_VERSION` in `english.ts`. Every translation then shows as
**Being updated** until it's revised from the new English and reviewed again.

## Copying text from Google Drawings PDFs

PDF text is unreliable for Thai and Burmese: Thai tone marks come out as
private-use glyph codes, and Burmese characters come out in visual order. Copy
text straight from the Google Drawing instead. If you only have the PDF, check
the result against it character by character, as was done for the Thai cards.

## Reviewer log

| Destination | Language | Reviewer | Date | Paid? | Notes |
| ----------- | -------- | -------- | ---- | ----- | ----- |
|             |          |          |      |       |       |
