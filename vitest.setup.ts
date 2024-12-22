// vitest.setup.ts
import authorData from 'src/content/data/author.json'
import siteData from 'src/content/data/site.json'
import { vi } from 'vitest'

const cleanEntry = (entry: Record<string, any>): Record<string, any> => {
  if (entry.published) {
    entry.published = new Date(entry.published)
  }
  if (entry.modified) {
    entry.modified = new Date(entry.modified)
  }
  if (entry.avatar) {
    entry.avatar = {
      src: entry.avatar,
    }
  }

  return entry
}

const MockArticles = [
  {
    id: 'mock-article-1',
    title: 'Mock Article 1',
    description: 'Mock article 1 description',
    featured: {
      image: {
        src: 'mock-article-1-image.jpg',
      },
    },
    popular: false,
    published: '2023-10-19',
    author: { id: 'mock-author-1' },
    category: 'mock-category-1',
    tags: ['mock-tag-1', 'mock-tag-2', 'mock-tag-3', 'mock-tag-4'],
  },
  {
    id: 'mock-article-2',
    title: 'Mock Article 2',
    description: 'Mock article 2 description',
    featured: {
      image: {
        src: 'mock-article-2-image.jpg',
      },
    },
    popular: true,
    published: '2023-08-01',
    author: { id: 'mock-author-1' },
    category: 'mock-category-1',
    tags: ['mock-tag-1', 'mock-tag-2', 'mock-tag-3'],
  },
  {
    id: 'mock-article-3',
    title: 'Mock Article 3',
    description: 'Mock article 3 description',
    featured: {
      image: {
        src: 'mock-article-3-image.jpg',
      },
    },
    popular: false,
    published: '2024-05-01',
    author: { id: 'mock-author-1' },
    category: 'mock-category-1',
    tags: ['mock-tag-1', 'mock-tag-2', 'mock-tag-3'],
  },
  {
    id: 'mock-article-4', // article for related with different category
    title: 'Mock Article 4',
    description: 'Mock article 4 description',
    featured: {
      image: {
        src: 'mock-article-4-image.jpg',
      },
    },
    popular: false,
    published: '2023-4-01',
    author: { id: 'mock-author-1' },
    category: 'mock-category-2',
    tags: ['mock-tag-1', 'mock-tag-2', 'mock-tag-3'],
  },
  {
    id: 'mock-article-with-modified', // article with modified and no related articles
    title: 'Mock Article with Modified',
    description: 'Mock article with modified description',
    featured: {
      image: {
        src: 'mock-article-with-modified-image.jpg',
      },
    },
    popular: true,
    published: '2022-08-09',
    modified: '2024-12-21',
    category: 'mock-category-3',
    author: { id: 'mock-author-2' },
    tags: ['mock-tag-5'],
  },
]
// Mock astro:content module
vi.mock('astro:content', () => {
  return {
    getEntry: vi.fn(async (collection, id) => {
      let source: Array<Record<string, any>> | undefined = undefined

      switch (collection) {
        case 'site':
          source = siteData
          break

        case 'author':
          source = authorData
          break

        case 'article':
          source = MockArticles
          break

        default:
          break
      }

      if (!source) {
        return undefined
      }

      const entry = source.find((entry) => entry.id == id)
      if (!entry) {
        return undefined
      }

      return {
        id: id,
        collection: collection,
        data: cleanEntry(entry),
      }
    }),
    getCollection: vi.fn(async (collection) => {
      let source: Array<Record<string, any>> | undefined = undefined

      switch (collection) {
        case 'site':
          source = siteData
          break

        case 'author':
          source = authorData
          break

        case 'article':
          source = MockArticles
          break

        default:
          break
      }

      if (!source) {
        return undefined
      }

      return source.map((entry) => ({
        id: entry.id,
        collection: collection,
        data: cleanEntry(entry),
      }))
    }),
  }
})

// Mock environment variables if needed
vi.stubEnv('PROD', false)
vi.stubEnv('SITE', 'http://localhost:4321')
