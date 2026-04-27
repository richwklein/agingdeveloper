---
description: Add the weekly chalkboard quote to quote.json and cut a patch release
---

You are helping add the weekly chalkboard quote for the agingdeveloper site.

## Theme

$ARGUMENTS

## Step 1 — Find a quote

Read `src/content/data/quote.json` to understand the existing quote style and to avoid suggesting duplicates.

Then search the web for quotes that fit the theme above. Suggest **3–5 candidates**, each on its own numbered line in this format:

```
1. "Quote text" — Author (Source title, year) [if known]
2. ...
```

Ask the user to pick a number, paste their own quote, or request more options before continuing.

## Step 2 — Collect details

Once a quote is chosen, confirm with the user:

- **text** — exact quote text
- **author** — full name (use `"Unknown"` if truly anonymous)
- **source** (optional) — title, type (`book` | `movie` | `play` | `speech` | `letter` | `song` | `magazine` | `newspaper` | `other`), and year

Do not invent source details. If uncertain, ask or omit the source object.

## Step 3 — Build the JSON entry

Generate a UUID v4 for the `id` field using:

```bash
node .claude/scripts/gen-uuid.js
```

Set `chalked` to the Monday of the current week in `YYYY-MM-DD` format.

Build the entry using the appropriate shape:

Without source:

```json
{
  "id": "<uuid>",
  "text": "<text>",
  "author": "<author>",
  "chalked": "<YYYY-MM-DD>"
}
```

With source:

```json
{
  "id": "<uuid>",
  "text": "<text>",
  "author": "<author>",
  "chalked": "<YYYY-MM-DD>",
  "source": {
    "title": "<title>",
    "type": "<type>",
    "year": <year>
  }
}
```

## Step 4 — Prepend to quote.json

Insert the new entry as the **first element** of the array in `src/content/data/quote.json`.

## Step 5 — Bump the patch version

Increment the patch segment of `version` in `package.json` (e.g. `6.6.4` → `6.6.5`).

## Step 6 — Lint and format

Run the repository fix and verify scripts:

```bash
pnpm run lint:fix
pnpm run format:fix
pnpm run verify
```

Surface any failures clearly before finishing.
