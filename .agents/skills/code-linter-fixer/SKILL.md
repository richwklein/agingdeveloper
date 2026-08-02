---
name: code-linter-fixer
description: Run the repository's lint and formatting fix scripts after changing JavaScript, TypeScript, Astro, Markdown, or MDX source files. Use this whenever edits touch files such as .js, .mjs, .cjs, .ts, .astro, .md, or .mdx.
allowed-tools: Bash(npm run lint:fix) Bash(npm run format:fix)
---

# Source Post-Edit Fixers

When your changes modify any of these file types, run both fix scripts before finishing:

- `.js`
- `.mjs`
- `.cjs`
- `.ts`
- `.astro`
- `.md`
- `.mdx`

Use the repository scripts exactly as defined in `package.json`:

```bash
npm run lint:fix
npm run format:fix
```

Workflow:

1. Detect whether the current task changed any matching files.
2. If yes, run `npm run lint:fix`.
3. Then run `npm run format:fix`.
4. If either command fails, surface the failure clearly in the final response.

For Markdown and MDX edits, Prettier is the source of truth. Do not run a separate Markdown linter or Markdown auto-fixer.
