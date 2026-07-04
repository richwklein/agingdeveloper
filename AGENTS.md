# Repository Instructions

These instructions apply to any agent (Claude Code, Copilot, etc.) working in repositories generated from `repo-template-astro`.

## Toolchain

- Node.js (version pinned in `.tool-versions`)
- pnpm as the package manager and script runner (version pinned in `.tool-versions` and `package.json` `packageManager`)

## After editing source

When a task changes any `.js`, `.mjs`, `.cjs`, `.ts`, `.astro`, `.md`, or `.mdx` file, run these scripts before finishing:

```bash
pnpm run lint:fix
pnpm run format:fix
```

For larger changes, dependency changes, CI changes, or changes that may affect build/runtime behavior, also run:

```bash
pnpm run verify
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

### Branch prefixes

Name branches with a hyphen-delimited type prefix that mirrors the Conventional Commit type. The PR labeler workflow uses this prefix to apply the matching label automatically.

| Prefix                                                                                                | Label           |
| ----------------------------------------------------------------------------------------------------- | --------------- |
| `feat-`, `feature-`                                                                                   | `enhancement`   |
| `fix-`, `bug-`, `bugfix-`                                                                             | `bug`           |
| `docs-`, `doc-`                                                                                       | `documentation` |
| `chore-`, `refactor-`, `test-`, `build-`, `ci-`, `perf-`, `style-`, `task-`, `maint-`, `maintenance-` | `task`          |

Example: `feature-add-search`, `fix-login-redirect`, `docs-readme-update`.

## Pull requests

This repo ships four PR templates aligned with the issue templates: `bug.md`, `enhancement.md`, `task.md`, `documentation.md` in `.github/PULL_REQUEST_TEMPLATE/`.

Pick one by appending `?template=<name>.md` to the compare URL, for example:

```text
https://github.com/<owner>/<repo>/compare/main...<branch>?template=enhancement.md
```

Type labels (`bug`, `enhancement`, `task`, `documentation`) are applied automatically by the PR labeler workflow based on the branch prefix above. Apply `breaking-change` manually when a PR introduces a backwards-incompatible change.

## Required gates before merge

- `lint` (eslint + prettier)
- `test` (vitest with coverage)
- `build` (astro check + astro build)
- `analyze (actions)` (CodeQL workflow analysis)
- `analyze (javascript-typescript)` (CodeQL source analysis)

## Drift audit

Install the audit skill: `npx skills add richwklein/skills`

Run `/repo-template-audit richwklein/repo-template-astro` to check that template-tracked files and GitHub repo settings still match the template.
