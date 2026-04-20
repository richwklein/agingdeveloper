import ArticleGrid from '@components/ArticleGrid.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const { mockRender } = vi.hoisted(() => ({
  mockRender: vi.fn(),
}))

vi.mock('astro:content', () => ({
  render: mockRender,
}))

describe('articleGrid', () => {
  const buildArticle = (id: string): CollectionEntry<'article'> =>
    ({
      id,
      collection: 'article',
      data: {
        title: `Article ${id}`,
        published: new Date('2026-04-20'),
        featured: {
          image: {
            src: `/_astro/${id}.jpg`,
            width: 1280,
            height: 720,
            format: 'jpg',
          },
        },
      },
    }) as CollectionEntry<'article'>

  const articles = [
    buildArticle('a-1'),
    buildArticle('a-2'),
    buildArticle('a-3'),
    buildArticle('a-4'),
  ]

  const renderGrid = async (foldCount = 2) => {
    const container = await AstroContainer.create()
    return await container.renderToString(ArticleGrid, {
      props: {
        articles,
        foldCount,
      },
    })
  }

  beforeEach(() => {
    mockRender.mockReset()
    mockRender.mockResolvedValue({
      remarkPluginFrontmatter: {
        excerpt: 'Article card excerpt',
      },
    })
  })

  test('renders the article grid container', async () => {
    const html = await renderGrid()

    expect(html).toContain('<ol class="grid grid-cols-1 gap-6 lg:grid-cols-2"')
  })

  test('marks cards beyond the default fold count as lazy in server markup', async () => {
    const html = await renderGrid(2)

    expect(html).toContain('loading="eager"')
    expect(html.match(/<img[^>]+loading="lazy"/g)?.length).toBe(2)
  })
})
