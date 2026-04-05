---
name: code-linter-fixer
description: Run the repository's lint and formatting fix scripts after changing any JavaScript, TypeScript, or Astro-based source file. Use this whenever edits touch files such as .js, .mjs, .cjs, .ts, or .astro.
---

# JS/TS Post-Edit Fixers

When your changes modify any of these file types, run both fix scripts before finishing:

- `.js`
- `.mjs`
- `.cjs`
- `.ts`
- `.astro`

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

Do not run these scripts for edits that only touch non-code files such as Markdown unless a matching source file also changed.
