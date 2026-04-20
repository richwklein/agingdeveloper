import ArticleCard from '@components/ArticleCard.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const { mockRender } = vi.hoisted(() => ({
  mockRender: vi.fn(),
}))

vi.mock('astro:content', () => ({
  render: mockRender,
}))

describe('articleCard', () => {
  const article = {
    id: '2026-04-20-image-delivery',
    collection: 'article',
    data: {
      title: 'Reduce image transfer size',
      published: new Date('2026-04-20'),
      featured: {
        image: {
          src: '/_astro/article-image.jpg',
          width: 1280,
          height: 720,
          format: 'jpg',
        },
      },
    },
  } as CollectionEntry<'article'>

  const renderCard = async (lazy = false) => {
    const container = await AstroContainer.create()
    return await container.renderToString(ArticleCard, {
      props: {
        article,
        lazy,
      },
    })
  }

  beforeEach(() => {
    mockRender.mockReset()
    mockRender.mockResolvedValue({
      remarkPluginFrontmatter: {
        excerpt: 'An excerpt to validate card rendering.',
      },
    })
  })

  test('uses tuned responsive image candidates for article cards', async () => {
    const html = await renderCard()

    expect(html).toContain('width="768"')
    expect(html).toContain('w=180&#38;h=')
    expect(html).toContain('w=360&#38;h=')
    expect(html).toContain('w=384&#38;h=')
    expect(html).toContain('w=420&#38;h=')
    expect(html).toContain('w=640&#38;h=')
    expect(html).toContain('w=768&#38;h=')
    expect(html).toContain('&#38;q=60')
    expect(html).toContain('(min-width: 1280px) 180px')
    expect(html).toContain('(min-width: 1024px) 384px')
  })

  test('loads eagerly by default and lazily when requested', async () => {
    const eagerHtml = await renderCard()
    const lazyHtml = await renderCard(true)

    expect(eagerHtml).toContain('loading="eager"')
    expect(lazyHtml).toContain('loading="lazy"')
  })
})
