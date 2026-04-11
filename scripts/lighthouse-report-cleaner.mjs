#!/usr/bin/env node
/* eslint-disable no-undef */
import fs from 'node:fs'

const manifestPath = process.argv[2]
const publicPath = process.argv[3]

const manifest =
  manifestPath && fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : []

const publicText =
  publicPath && fs.existsSync(publicPath) ? fs.readFileSync(publicPath, 'utf8') : ''

const previewUrl = process.env.LIGHTHOUSE_BASE_URL || 'n/a'
const runs = process.env.LIGHTHOUSE_NUMBER_OF_RUNS || 'n/a'
const commitSha = process.env.COMMIT_SHA || 'n/a'
const workflowUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`

const pct = (value) => (typeof value === 'number' ? `${Math.round(value * 100)}` : 'n/a')

const representativeRuns = manifest.filter((run) => run.isRepresentativeRun !== false)

const publicLinks = [
  ...publicText.matchAll(/https:\/\/storage\.googleapis\.com\/lhci[^\s)]+/g),
].map((match) => match[0])

let body = '## Lighthouse CI\n\n'
body += `- Preview: ${previewUrl}\n`
body += `- Commit: \`${commitSha}\`\n`
body += `- Runs per URL: ${runs}\n`
body += `- Workflow: [#${process.env.GITHUB_RUN_ID}](${workflowUrl})\n\n`

if (representativeRuns.length) {
  body += '| URL | Performance | Accessibility | Best Practices | SEO |\n'
  body += '|---|---:|---:|---:|---:|\n'

  for (const run of representativeRuns) {
    const summary = run.summary || {}
    body += `| ${run.url} | ${pct(summary.performance)} | ${pct(summary.accessibility)} | ${pct(summary['best-practices'])} | ${pct(summary.seo)} |\n`
  }
} else {
  body += 'No representative Lighthouse runs were found.\n'
}

if (publicLinks.length) {
  body += '\n### Reports\n'
  publicLinks.forEach((link, index) => {
    body += `- [Open report ${index + 1}](${link})\n`
  })
}

body +=
  '\nYou can also download the full Lighthouse reports as an artifact from the workflow run.\n'

process.stdout.write(body)
