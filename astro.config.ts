import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import icon from "astro-icon"
import { remarkReadingTime } from "./src/utils/readTime.ts"
import { remarkExcerpt } from "./src/utils/excerpt.ts"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import netlify from "@astrojs/netlify"
const { URL: SITE_URL, DEPLOY_PRIME_URL: DEPLOY_URL, CONTEXT: DEPLOY_CONTEXT = "dev" } = process.env
const siteUrl =
  DEPLOY_CONTEXT === "dev"
    ? "http://localhost:4321"
    : DEPLOY_CONTEXT == "production"
      ? SITE_URL
      : DEPLOY_URL

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkExcerpt],
  },
  output: "static",
  prefetch: true,
  image: {},
  integrations: [
    icon(),
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  redirects: {
    "/article": {
      destination: "/article/archive-1",
      status: 308,
    },
    "/article/": {
      destination: "/article/archive-1",
      status: 308,
    },
  },
  site: siteUrl,
})
