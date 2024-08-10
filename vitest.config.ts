/// <reference types="vitest" />
import { getViteConfig } from "astro/config"

export default getViteConfig({
  test: {
    coverage: {
      include: ["**/src/**"],
      extension: [".js", ".cjs", ".mjs", ".ts", ".astro"],
      reporter: ["text", "json-summary", "json"],
      reportsDirectory: "./coverage",
      reportOnFailure: true,
    },
  },
})
