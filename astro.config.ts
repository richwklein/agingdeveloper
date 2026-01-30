import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import fuse from 'astro-fuse'
import icon from 'astro-icon'

import { remarkExcerpt } from './src/utils/excerpt.ts'
import { remarkReadTime } from './src/utils/readTime.ts'

const { URL: SITE_URL, DEPLOY_PRIME_URL: DEPLOY_URL, CONTEXT: DEPLOY_CONTEXT = 'dev' } = process.env
const siteUrl =
  DEPLOY_CONTEXT === 'dev'
    ? 'http://localhost:4321'
    : DEPLOY_CONTEXT == 'production'
      ? SITE_URL
      : DEPLOY_URL

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  build: { format: 'file' },
  experimental: { contentIntellisense: true },
  markdown: { remarkPlugins: [remarkReadTime, remarkExcerpt] },
  output: 'static',
  prefetch: true,
  image: {},
  integrations: [
    icon(),
    fuse(
      [
        'content',
        'frontmatter.title',
        'frontmatter.description',
        'frontmatter.category',
        'frontmatter.tags',
      ],
      {
        filter: (path) => /^\/article\/(?!archive).*/.test(path),
        extractContentFromHTML: ($) => $('.prose'),
        extractFrontmatterFromHTML: ($) => {
          const frontmatter: Record<string, any> = {}
          const ld = $('script[type="application/ld+json"]').html() ?? '{}'
          const ldJson = JSON.parse(ld)

          // TODO update this when BlogPosting moves to the mainEntity
          if (ldJson['@type'] === 'BlogPosting') {
            frontmatter.title = ldJson.headline
            frontmatter.description = ldJson.description
            frontmatter.category = ldJson.articleSection
            frontmatter.tags = ldJson.keywords
          }

          return frontmatter
        },
      }
    ),
    mdx(),
    sitemap(),
  ],
  redirects: {
    '/article': { destination: '/article/archive-1', status: 308 },
    '/article/rss-dead-long-live-rss': {
      destination: '/article/2021-05-17-rss-dead-long-live-rss',
      status: 308,
    },
    '/article/2020/08/14/default-http-config': {
      destination: '/article/2020-08-14-default-http-config',
      status: 308,
    },
    '/article/2020/08/08/custoPathm-domain': {
      destination: '/article/2020-08-14-default-http-config',
      status: 308,
    },
    '/article/2020/08/08/custom-domain': {
      destination: '/article/2020-08-08-custom-domain',
      status: 308,
    },
    '/article/2020/07/26/false-start': {
      destination: '/article/2020-07-26-false-start',
      status: 308,
    },
    '/article/2020/07/21/intro': {
      destination: '/article/2020-07-21-intro',
      status: 308,
    },
    'article/2026-2026-01-11-breaking-bias': {
      destination: 'article/2026-01-11-breaking-bias',
      status: 308,
    },
  },
  site: siteUrl,
  trailingSlash: 'ignore',
  vite: { plugins: [tailwindcss()] },
})
