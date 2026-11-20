# Translation process

People rely on these cards to avoid a serious allergic reaction, so a
translation is only offered as ready after a native speaker has reviewed it.

## States

The site works these out from each language file in `src/content/cards/`:

| State         | Meaning                                                       | Shown on site as |
| ------------- | ------------------------------------------------------------- | ---------------- |
| `missing`     | No translation yet (`translation: null`)                      | Coming soon      |
| `draft`       | Translated, not yet reviewed                                  | In review        |
| `out-of-date` | Made from an older version of the English text                | Being updated    |
| `ready`       | Reviewed by a native speaker against the current English text | Available        |

## Adding or updating a language

1. Translate from the **current** English card (`src/content/cards/en.ts`).
   An AI or machine draft is fine as a starting point.
2. Save it with `sourceVersion` set to the current `ENGLISH_SOURCE_VERSION`
   and `review: { status: "draft" }`.
3. A **native speaker** reviews it, ideally someone who knows restaurant kitchens.
   They check:
   - "Peanut" is the everyday word, and common local names, sauces and dishes
     that contain peanut are covered.
   - The peanut oil sentence says exactly what the English says.
   - "Even a very small amount" and "life-threatening" read as serious, not as a
     preference or diet.
   - The cross-contact sentence (pans, utensils, surfaces) is clear to kitchen staff.
   - The emergency sentence is how a local would ask for an ambulance.
   - Tone is polite for that culture.
4. Get a back-translation: have the reviewer, or a second person, translate it
   back into English and compare.
5. Record the review: `status: "reviewed"`, `reviewer`, `reviewedOn` and any
   `notes`. The language then shows as **Available**.

## When the English text changes

Bump `ENGLISH_SOURCE_VERSION` in `en.ts`. Every translation then shows as
**Being updated** until it's revised from the new English and reviewed again.

## Reviewer log

| Language | Reviewer | Date | Paid? | Notes |
| -------- | -------- | ---- | ----- | ----- |
|          |          |      |       |       |
