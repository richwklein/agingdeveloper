// vitest.setup.ts
import { DEFAULT_AUTHOR_ID } from '@utils/author'
import { DEFAULT_SITE_ID } from '@utils/site'
import authorData from 'src/content/data/author.json'
import siteData from 'src/content/data/site.json'
import { vi } from 'vitest'

// Mock astro:content module
vi.mock('astro:content', () => {
  return {
    getEntry: vi.fn(async (collection, id) => {
      if (collection === 'site' && id === DEFAULT_SITE_ID) {
        return {
          id: DEFAULT_SITE_ID,
          data: siteData.find((entry) => entry.id == DEFAULT_SITE_ID),
        }
      } else if (collection == 'author' && id == DEFAULT_AUTHOR_ID) {
        return {
          id: DEFAULT_SITE_ID,
          data: authorData.find((entry) => entry.id == DEFAULT_AUTHOR_ID),
        }
      }
      return null // Simulate no entry found
    }),
  }
})

// Mock environment variables if needed
vi.stubEnv('PROD', false)
vi.stubEnv('SITE', 'http://localhost:4321')
