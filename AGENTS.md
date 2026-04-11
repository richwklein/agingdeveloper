# Repository Instructions

## Toolchain

This repository uses:

- Node.js for runtime and scripts
- `pnpm` as the package manager and script runner

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

## Release Versioning

`package.json` is the release version source of truth.
A new release is indicated by bumping the `version` field in `package.json`.
Do not change the version unless the work is intended to produce a release.
