import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField, fontProviders } from 'astro/config'
import icon from 'astro-icon'

import { remarkExcerpt } from './src/utils/excerpt.ts'
import { remarkReadTime } from './src/utils/readTime.ts'

const siteUrl =
  process.env.SITE_ORIGIN ??
  (process.env.DEPLOY_CONTEXT === 'production'
    ? 'https://agingdeveloper.com'
    : 'http://localhost:4321')

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  build: { format: 'file' },
  // Fonts are self-hosted via the local provider so builds never fetch font
  // binaries from a CDN. The npm provider (even with `remote: false`) rewrites
  // the fontsource CSS's relative URLs to jsDelivr and downloads each .woff2 at
  // build time, which makes builds fail during a CDN outage.
  //
  // The .woff2 files in src/assets/fonts are the exact latin/400/normal subset
  // Astro previously bundled, copied from the @fontsource/* packages. Those
  // packages are no longer dependencies since the files are vendored. To update
  // a font, `pnpm add -D @fontsource/<name>`, copy its
  // files/<name>-latin-400-normal.woff2 into src/assets/fonts, then remove the
  // package again.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Noto Sans Georgian',
      cssVariable: '--font-noto-sans-georgian',
      options: {
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: ['./src/assets/fonts/noto-sans-georgian-latin-400-normal.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Noto Serif Georgian',
      cssVariable: '--font-noto-serif-georgian',
      options: {
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: ['./src/assets/fonts/noto-serif-georgian-latin-400-normal.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Fira Code',
      cssVariable: '--font-fira-code',
      options: {
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: ['./src/assets/fonts/fira-code-latin-400-normal.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Walter Turncoat',
      cssVariable: '--font-walter-turncoat',
      options: {
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: ['./src/assets/fonts/walter-turncoat-latin-400-normal.woff2'],
          },
        ],
      },
    },
  ],
  env: {
    schema: {
      DEPLOY_CONTEXT: envField.string({
        access: 'public',
        context: 'server',
        default: 'dev',
      }),
      SITE_ORIGIN: envField.string({
        access: 'public',
        context: 'server',
        default: siteUrl,
      }),
      CACHE_MAX_AGE: envField.number({
        access: 'public',
        context: 'server',
        default: 60 * 60 * 24,
      }),
      ANALYTICS_TRACKING_ID: envField.string({
        access: 'public',
        context: 'client',
        optional: true,
      }),
    },
  },
  experimental: { contentIntellisense: true },
  markdown: { remarkPlugins: [remarkReadTime, remarkExcerpt] },
  output: 'static',
  prefetch: true,
  image: {},
  integrations: [icon(), mdx(), sitemap()],
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
    '/article/2026-2026-01-11-breaking-bias': {
      destination: '/article/2026-01-11-breaking-bias',
      status: 308,
    },
  },
  site: siteUrl,
  trailingSlash: 'ignore',
  vite: { plugins: [tailwindcss()] },
})
