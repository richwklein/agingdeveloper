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
    id: '2026-04-26-equal-height-cards',
    collection: 'article',
    data: {
      title: 'Equal height card layout',
      published: new Date('2026-04-26'),
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

  type RenderOptions = { className?: string; lazy?: boolean }

  const renderCard = async ({ className, lazy }: RenderOptions = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(ArticleCard, {
      props: {
        article,
        class: className,
        lazy,
      },
    })
  }

  beforeEach(() => {
    mockRender.mockReset()
    mockRender.mockResolvedValue({
      remarkPluginFrontmatter: {
        excerpt: 'A readable article card excerpt',
      },
    })
  })

  test('renders the article title, date, and excerpt', async () => {
    const html = await renderCard()

    expect(html).toContain('Equal height card layout')
    expect(html).toContain(`datetime="${article.data.published.toISOString()}"`)
    expect(html).toContain('A readable article card excerpt')
  })

  test('links to the article detail page', async () => {
    const html = await renderCard()

    expect(html).toContain(`href="/article/${article.id}"`)
  })

  test('stretches the link to fill the grid cell', async () => {
    const html = await renderCard()

    expect(html).toContain('class="block h-full"')
  })

  test('lays out the card as a full-height column so siblings match height', async () => {
    const html = await renderCard()

    expect(html).toMatch(/<article[^>]*class="[^"]*\bflex\b[^"]*"/)
    expect(html).toMatch(/<article[^>]*class="[^"]*\bh-full\b[^"]*"/)
    expect(html).toMatch(/<article[^>]*class="[^"]*\bflex-col\b[^"]*"/)
  })

  test('switches to a constrained horizontal layout at xl', async () => {
    const html = await renderCard()

    expect(html).toMatch(/<article[^>]*class="[^"]*\bxl:flex-row-reverse\b[^"]*"/)
    expect(html).toMatch(/<article[^>]*class="[^"]*\bxl:max-h-60\b[^"]*"/)
  })

  test('lets the content region absorb slack so the card paints full height', async () => {
    const html = await renderCard()

    expect(html).toMatch(/<div class="flex-1 px-4 pt-3 pb-2"/)
  })

  test('eagerly loads the image by default', async () => {
    const html = await renderCard()

    expect(html).toContain('loading="eager"')
  })

  test('lazy loads the image when lazy is true', async () => {
    const html = await renderCard({ lazy: true })

    expect(html).toContain('loading="lazy"')
  })

  test('adds custom classes when provided', async () => {
    const html = await renderCard({ className: 'test-class' })

    expect(html).toContain('test-class')
  })
})
