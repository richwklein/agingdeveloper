---
name: code-linter-fixer
description: Run the repository's lint and formatting fix scripts after changing JavaScript, TypeScript, Astro, Markdown, or MDX source files. Use this whenever edits touch files such as .js, .mjs, .cjs, .ts, .astro, .md, or .mdx.
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
pnpm run lint:fix
pnpm run format:fix
```

Workflow:

1. Detect whether the current task changed any matching files.
2. If yes, run `pnpm run lint:fix`.
3. Then run `pnpm run format:fix`.
4. If either command fails, surface the failure clearly in the final response.

For Markdown and MDX edits, Prettier is the source of truth. Do not run a separate Markdown linter or Markdown auto-fixer.
