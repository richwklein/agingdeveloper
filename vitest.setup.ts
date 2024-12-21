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
          collection: 'site',
          data: siteData.find((entry) => entry.id == DEFAULT_SITE_ID),
        }
      } else if (collection == 'author' && id == DEFAULT_AUTHOR_ID) {
        return {
          id: DEFAULT_AUTHOR_ID,
          collection: 'author',
          data: authorData.find((entry) => entry.id == DEFAULT_AUTHOR_ID),
        }
      } else if (collection == 'article') {
        switch (id) {
          case 'mock-article-1':
            return {
              id: `${id}`,
              collection: 'article',
              data: {
                title: 'Mock Article 1',
                description: 'Mock article 1 description',
                featured: {
                  image: {
                    src: 'mock-article-image.jpg',
                  },
                },
                published: new Date(),
                category: 'mock-category',
                tags: ['mock-tag'],
              },
            }

          case 'mock-article-with-modified':
            return {
              id: `${id}`,
              collection: 'article',
              data: {
                title: 'Mock Article with Modified',
                description: 'Mock article with modified description',
                featured: {
                  image: {
                    src: 'mock-article-image.jpg',
                  },
                },
                published: new Date(),
                modified: new Date(),
                category: 'mock-category',
                tags: ['mock-tag'],
              },
            }

          default:
            return null // Simulate no entry found
        }
      }
      return null // Simulate no entry found
    }),
  }
})

// Mock environment variables if needed
vi.stubEnv('PROD', false)
vi.stubEnv('SITE', 'http://localhost:4321')
