---
description: Add the weekly chalkboard quote to quote.json (release-please cuts the patch release from the commit)
---

You are helping add the weekly chalkboard quote for the agingdeveloper site.

## Theme

$ARGUMENTS

## Step 1 — Find a quote

Read `src/content/data/quote.json` to understand the existing quote style and to check for duplicates.

Then search the web for quotes that fit the theme above. Prefer **shorter quotes** that are easy to write on a chalkboard. Favor quotes with verifiable citation sources, though a source is not required.

Suggest **3–5 candidates** that have not already appeared in `quote.json`, each on its own numbered line in this format:

```
1. "Quote text" — Author (Source title, year) [if known]
2. ...
```

Ask the user to pick a number, paste their own quote, or request more options. If no quote is selected, restart this step with fresh candidates.

## Step 2 — Collect details

Once a quote is chosen, confirm with the user:

- **text** — exact quote text
- **author** — full name (use `"Unknown"` if truly anonymous)
- **source** (optional) — title, type (`book` | `movie` | `show` | `play` | `speech` | `letter` | `song` | `magazine` | `newspaper` | `other`), and year

Do not invent source details. If uncertain, ask or omit the source object.

## Step 3 — Build the JSON entry

Generate a UUID v4 for the `id` field using:

```bash
node .claude/scripts/gen-uuid.js
```

Set `chalked` to the current day in `YYYY-MM-DD` format.

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
    "type": "<book|movie|show|play|speech|letter|song|magazine|newspaper|other>",
    "year": <year>
  }
}
```

## Step 4 — Prepend to quote.json

Insert the new entry as the **first element** of the array in `src/content/data/quote.json`.

## Step 5 — Lint and format

Run the repository fix and verify scripts:

```bash
npm run lint:fix
npm run format:fix
npm run verify
```

Surface any failures clearly before finishing.

## Step 6 — Commit message

**Do not bump `package.json` manually.** release-please owns versioning and will open a release PR based on the commit message.

Suggest a [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) message in this form so release-please cuts a patch release:

```
fix(quote): add weekly quote for <Month D, YYYY>
```

Example: `fix(quote): add weekly quote for May 18, 2026`

Do not commit unless the user asks.
