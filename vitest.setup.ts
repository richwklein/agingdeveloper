// vitest.setup.ts
import authorData from 'src/content/data/author.json'
import siteData from 'src/content/data/site.json'
import { vi } from 'vitest'

const getJson = (id: string, source: Array<Record<string, any>>): Record<string, any> => {
  const data = source.find((entry) => entry.id == id)
  if (!data) {
    return {}
  }
  if (data.published) {
    data.published = new Date(data.published)
  }
  if (data.modified) {
    data.modified = new Date(data.modified)
  }
  if (data.avatar) {
    data.avatar = {
      src: data.avatar,
    }
  }

  return data
}

const MockArticles = [
  {
    id: 'mock-article-1',
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
  {
    id: 'mock-article-with-modified',
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
]
// Mock astro:content module
vi.mock('astro:content', () => {
  return {
    getEntry: vi.fn(async (collection, id) => {
      switch (collection) {
        case 'site':
          return {
            id: id,
            collection: collection,
            data: getJson(id, siteData),
          }
        case 'author':
          return {
            id: id,
            collection: collection,
            data: getJson(id, authorData),
          }

        case 'article':
          return {
            id: id,
            collection: collection,
            data: getJson(id, MockArticles),
          }
        default:
          return null // Simulate no entry found
      }
    }),
  }
})

// Mock environment variables if needed
vi.stubEnv('PROD', false)
vi.stubEnv('SITE', 'http://localhost:4321')
