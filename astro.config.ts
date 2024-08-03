import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { remarkReadingTime } from "./src/utils/readTime.ts";
import { remarkExcerpt } from "./src/utils/excerpt.ts";
import mdx from "@astrojs/mdx";

const {
  URL: SITE_URL,
  DEPLOY_PRIME_URL: DEPLOY_URL,
  CONTEXT: DEPLOY_CONTEXT = "dev",
} = process.env;

const siteUrl =
  DEPLOY_CONTEXT === "dev"
    ? "http://localhost:4321"
    : DEPLOY_CONTEXT == "production"
      ? SITE_URL
      : DEPLOY_URL;

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: siteUrl,
  trailingSlash: "never",
  integrations: [
    icon(),
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkExcerpt],
  },
  image: {},
});
