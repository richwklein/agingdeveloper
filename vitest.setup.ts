// vitest.setup.ts
import { DEFAULT_AUTHOR_ID } from '@utils/author'
import { DEFAULT_SITE_ID } from '@utils/site'
import { vi } from 'vitest'

const cleanEntry = (entry: Record<string, any>): Record<string, any> => {
  const dateKeys = ['published', 'modified', 'created', 'chalked']
  dateKeys.forEach((key) => {
    if (key in entry) {
      entry[key] = new Date(entry[key])
    }
  })

  if ('avatar' in entry) {
    entry.avatar = {
      src: entry.avatar,
    }
  }
  return entry
}

const MockSites: Record<string, any>[] = [
  {
    id: 'mock-site-1',
    title: 'Mock site 1 title',
    tagline: 'Mock site 1 tagline',
    category: 'mock-category-1',
    origin: 'https://mocksite1.com',
    repository: 'https://github.com/mock/site1',
    avatar: './mock-site-1-image.jpg',
    icon: './mock-site-1-image.jpg',
    background: '#ffffff',
    theme: '#37474f',
    displayLimit: 15,
  },
  {
    id: 'mock-site-2',
    title: 'Mock site 2 title',
    tagline: 'Mock site 2 tagline',
    category: 'mock-category-1',
    origin: 'https://mocksite2.com',
    repository: 'https://github.com/mock/site2',
    avatar: './mock-site-2-image.jpg',
    icon: './mock-site-2-image.jpg',
    background: '#ffffff',
    theme: '#37474f',
    displayLimit: 15,
  },
  {
    id: DEFAULT_SITE_ID,
    title: 'Default site title',
    tagline: 'Default site tagline',
    category: 'mock-category-1',
    origin: 'https://defaultsite.com',
    repository: 'https://github.com/defaultsite',
    avatar: './default-site-image.jpg',
    icon: './default-site-image.jpg',
    background: '#ffffff',
    theme: '#37474f',
    displayLimit: 15,
  },
]

const MockAuthors: Record<string, any>[] = [
  {
    id: 'mock-author-1',
    name: 'Mock Name 1',
    givenName: 'Name 1',
    familyName: 'Mock',
    email: 'mock.name.1@example.com',
    avatar: './mock-author-1-image.jpg',
    tagline: 'Mock author 1 tagline',
    bio: 'Mock author 1 bio',
    twitterUsername: '@mockauthor1',
    socials: [
      {
        name: 'Twitter',
        url: 'https://twitter.com/mockauthor1',
      },
    ],
    published: '2020-01-27',
  },
  {
    id: 'mock-author-2',
    name: 'Mock Name 2',
    givenName: 'Name 2',
    familyName: 'Mock',
    email: 'mock.name.2@example.com',
    avatar: './mock-author-2-image.jpg',
    tagline: 'Mock author 2 tagline',
    bio: 'Mock author 2 bio',
    twitterUsername: '@mockauthor2',
    socials: [
      {
        name: 'Twitter',
        url: 'https://twitter.com/mockauthor1',
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/mockauthor2',
      },
    ],
    published: '2024-12-23',
  },
  {
    id: DEFAULT_AUTHOR_ID,
    name: 'Default Name',
    givenName: 'Name',
    familyName: 'Default',
    email: 'default.name@example.com',
    avatar: './default-author-image.jpg',
    tagline: 'Default author tagline',
    bio: 'Default author bio',
    twitterUsername: '@defaultauthor',
    socials: [
      {
        name: 'Twitter',
        url: 'https://twitter.com/defaultauthor',
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/defaultauthor',
      },
    ],
    published: '2022-01-01',
  },
]

const MockArticles: Record<string, any>[] = [
  {
    id: 'mock-article-1',
    title: 'Mock Article 1',
    description: 'Mock article 1 description',
    featured: {
      image: {
        src: './mock-article-1-image.jpg',
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
        src: './mock-article-2-image.jpg',
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
        src: './mock-article-3-image.jpg',
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
        src: './mock-article-4-image.jpg',
      },
    },
    popular: false,
    published: '2023-4-01',
    author: { id: 'mock-author-2' },
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
    tags: ['mock-tag-4'],
  },
]

const MockQuotes: Record<string, any>[] = [
  {
    id: 'mock-quote-1',
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    chalked: '2024-07-02',
  },
  {
    id: 'mock-quote-2',
    text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    author: 'Winston Churchill',
    chalked: '2024-07-01',
  },
  {
    id: 'mock-quote-3',
    text: 'Do not wait to strike till the iron is hot; but make it hot by striking.',
    author: 'William Butler Yeats',
    chalked: '2024-07-04',
  },
  {
    id: 'mock-quote-4',
    text: 'What you do today can improve all your tomorrows.',
    author: 'Ralph Marston',
    chalked: '2024-07-03',
  },
]

// Mock astro:content module
vi.mock('astro:content', () => {
  return {
    getEntry: vi.fn(async (collection, id) => {
      let source: Record<string, any>[] | undefined = undefined

      switch (collection) {
        case 'site':
          source = MockSites
          break

        case 'author':
          source = MockAuthors
          break

        case 'article':
          source = MockArticles
          break

        case 'quote':
          source = MockQuotes
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
      let source: Record<string, any>[] | undefined = undefined

      switch (collection) {
        case 'site':
          source = MockSites
          break

        case 'author':
          source = MockAuthors
          break

        case 'article':
          source = MockArticles
          break

        case 'quote':
          source = MockQuotes
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
