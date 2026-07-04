/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    environment: 'node',
    setupFiles: './vitest.setup.ts',
    coverage: {
      include: ['src/**/*.{js,cjs,mjs,ts,astro}'],
      reporter: ['text', 'json-summary', 'json'],
      reportsDirectory: './coverage',
      reportOnFailure: true,
      thresholds: {
        lines: 30,
        statements: 45,
        functions: 50,
        branches: 50,
      },
    },
  },
})
