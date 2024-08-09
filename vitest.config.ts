/// <reference types="vitest" />
import { getViteConfig } from "astro/config"

export default getViteConfig({
  test: {
    coverage: {
      include: ["**/src/**"],
      extension: [".js", ".cjs", ".mjs", ".ts", ".astro"],
      reporter: ["text", "json-summary", "json"],
      reportsDirectory: "./test/coverage",
      reportOnFailure: true,
      thresholds: {
        lines: 60,
        branches: 60,
        functions: 60,
        statements: 60,
      },
    },
  },
})
