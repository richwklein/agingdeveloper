# Repository Instructions

These instructions apply to any agent (Claude Code, Copilot, etc.) working in repositories generated from `repo-template-astro`.

## Toolchain

- Node.js (version pinned in `.tool-versions`)
- npm as the package manager and script runner

## After editing source

When a task changes any `.js`, `.mjs`, `.cjs`, `.ts`, `.astro`, `.md`, or `.mdx` file, run these scripts before finishing:

```bash
npm run lint:fix
npm run format:fix
```

For larger changes, dependency changes, CI changes, or changes that may affect build/runtime behavior, also run:

```bash
npm run verify
```

`verify` runs lint, format-check, tests, and build — the same checks CI runs.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. release-please parses these to generate changelogs and version bumps.

Allowed types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `build`, `ci`, `perf`, `style`.

Breaking changes: append `!` (e.g., `feat!: rename public API`) or include a `BREAKING CHANGE:` footer.

## Release versioning

`package.json` is the version source of truth, owned by release-please. **Do not manually edit the `version` field** — release-please opens a release PR that bumps it. Merging the release PR cuts the tag + GitHub Release.

## Branching

- `main` is the default branch and is protected by a ruleset.
- All work happens in feature branches merged via pull request.
- Squash merges only — no merge commits, no rebase merges.
- Branches must be up to date with `main` before merging (strict status checks).
- Commits must be signed.

## Required gates before merge

- `lint` (eslint + prettier)
- `test` (vitest with coverage)
- `build` (astro check + astro build)
- `analyze (actions)` (CodeQL workflow analysis)
- `analyze (javascript-typescript)` (CodeQL source analysis)

## Drift audit

Install the audit skill: `npx skills add richwklein/skills`

Run `/repo-template-audit richwklein/repo-template-astro` to check that template-tracked files and GitHub repo settings still match the template.
