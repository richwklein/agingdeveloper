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

const pct = (value) => (typeof value === 'number' ? `${Math.round(value * 100)}` : 'n/a')

const representativeRuns = manifest.filter((run) => run.isRepresentativeRun !== false)

const publicLinks = [
  ...publicText.matchAll(/https:\/\/storage\.googleapis\.com\/[^\s)]+\.report\.html/g),
].map((match) => match[0])

let body = ''

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

process.stdout.write(body)
