# Repository Instructions

Use the local skill at `.agents/skills/code-linter-fixer` whenever a task changes any `.js`, `.mjs`, `.cjs`, `.ts`, `.astro`, `.md`, or `.mdx` file in this repository.

After those edits, run these scripts before finishing:

```bash
pnpm run lint:fix
pnpm run format:fix
```

For larger changes, dependency changes, CI changes, or changes that may affect build/runtime behavior, also run:

```bash
pnpm run verify
```
