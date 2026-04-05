# Repository Instructions

Use the local skill at `.agents/skills/code-linter-fixer` whenever a task changes any `.js`, `.mjs`, `.cjs`, `.ts`, or `.astro` file in this repository.

Use the local skill at `.agents/skills/markdown-linter-fixer` whenever a task changes any `.md` or `.mdx` file in this repository.

After those edits, run these scripts before finishing:

```bash
pnpm run lint:fix
pnpm run format:fix
```

For Markdown edits, run the local markdown linter fixer workflow before finishing. Use the repository dependency through `pnpm exec markdownlint-cli2`.
