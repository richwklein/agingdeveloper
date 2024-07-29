import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import robots from "astro-robots";
import netlify from "@astrojs/netlify";

const {
  URL: SITE_URL,
  DEPLOY_PRIME_URL: DEPLOY_URL,
  CONTEXT: DEPLOY_CONTEXT = "dev",
} = process.env;

const siteUrl = (DEPLOY_CONTEXT === "dev") ? "http://localhost:4321" :
  (DEPLOY_CONTEXT == "production") ? SITE_URL : DEPLOY_URL;

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: siteUrl,
  trailingSlash: "never",
  integrations: [
    icon(),
    robots({}),
    tailwind({
      applyBaseStyles: false
    })
  ],
  image: {},
  vite: {
    resolve: {
      // allow symlinking content into the src directory
      preserveSymlinks: true
    }
  },
  adapter: netlify()
});