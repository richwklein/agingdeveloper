import { beforeEach, describe, expect, test, vi } from 'vitest'

const getCollection = vi.fn()

vi.mock('astro:content', () => ({
  getCollection,
}))

describe('searchKeys', () => {
  test('indexes article metadata fields without full content', async () => {
    const { searchKeys } = await import('@utils/searchTypes')

    expect(searchKeys).toEqual([
      'frontmatter.title',
      'frontmatter.description',
      'frontmatter.category',
      'frontmatter.tags',
    ])
  })
})

describe('getSearchableArticles', () => {
  beforeEach(() => {
    getCollection.mockReset()
  })

  test('returns searchable metadata and excludes archive articles', async () => {
    getCollection.mockResolvedValue([
      {
        id: '2026-04-05-test-article',
        body: '# Body content that should not be indexed',
        data: {
          title: 'Test Article',
          description: 'A searchable description',
          category: 'Testing',
          tags: ['Vitest', 'Astro'],
        },
      },
      {
        id: 'archive-2026-04-05-test-article',
        body: '# Archive content',
        data: {
          title: 'Archived Article',
          description: 'Should be filtered out',
          category: 'Archive',
          tags: ['Old'],
        },
      },
    ])

    const { getSearchableArticles } = await import('@utils/search')

    await expect(getSearchableArticles()).resolves.toEqual([
      {
        frontmatter: {
          title: 'Test Article',
          description: 'A searchable description',
          category: 'Testing',
          tags: ['Vitest', 'Astro'],
        },
        pathname: '/article/2026-04-05-test-article',
      },
    ])
  })
})
