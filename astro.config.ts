import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import robots from "astro-robots";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://agingdeveloper.com",
  // TODO set dynamically based on environment
  trailingSlash: "never",
  integrations: [icon(), robots({}), tailwind({
    applyBaseStyles: false
  })],
  image: {},
  vite: {
    resolve: {
      // allow symlinking content into the src directory
      preserveSymlinks: true
    }
  },
  adapter: netlify()
});