/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    environment: 'node',
    setupFiles: './vitest.setup.ts',
    coverage: {
      include: ['**/src/**'],
      extension: ['.js', '.cjs', '.mjs', '.ts', '.astro'],
      reporter: ['text', 'json-summary', 'json'],
      reportsDirectory: './coverage',
      reportOnFailure: true,
      thresholds: {
        lines: 60,
        branches: 70,
        functions: 60,
        statements: 60,
      },
    },
  },
})
