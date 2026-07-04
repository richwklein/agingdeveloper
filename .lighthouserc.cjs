/* global module, process */

const auditedPaths = [
  '/',
  '/article/2026-04-04-irs-account-save-act',
  '/article/archive-1',
  '/author/richwklein',
  '/tag',
]
const baseUrl = (process.env.LIGHTHOUSE_BASE_URL || '').replace(/\/$/, '')
const numberOfRuns = Number.parseInt(process.env.LIGHTHOUSE_NUMBER_OF_RUNS || '1', 10)
const formFactor = (process.env.LIGHTHOUSE_FORM_FACTOR || 'mobile').toLowerCase()

if (!baseUrl) {
  throw new Error('LIGHTHOUSE_BASE_URL is required for Lighthouse CI runs')
}

if (!Number.isInteger(numberOfRuns) || numberOfRuns < 1) {
  throw new Error('LIGHTHOUSE_NUMBER_OF_RUNS must be an integer greater than 0')
}

if (!['mobile', 'desktop'].includes(formFactor)) {
  throw new Error('LIGHTHOUSE_FORM_FACTOR must be either "mobile" or "desktop"')
}

const collectSettings = {
  chromeFlags: '--headless=new --no-sandbox',
  formFactor,
}

if (formFactor === 'desktop') {
  collectSettings.preset = 'desktop'
}

module.exports = {
  ci: {
    collect: {
      numberOfRuns,
      url: auditedPaths.map((currentPath) => `${baseUrl}${currentPath}`),
      settings: collectSettings,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
  },
}
