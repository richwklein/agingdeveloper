import ArticleCardLead from '@components/ArticleCardLead.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const { mockRender } = vi.hoisted(() => ({
  mockRender: vi.fn(),
}))

vi.mock('astro:content', () => ({
  render: mockRender,
}))

describe('articleCardLead', () => {
  const article = {
    id: '2026-04-12-lead-card-layout',
    collection: 'article',
    data: {
      title: 'Lead card layout update',
      published: new Date('2026-04-12'),
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

  const renderCard = async (className?: string) => {
    const container = await AstroContainer.create()
    return await container.renderToString(ArticleCardLead, {
      props: {
        article,
        class: className,
      },
    })
  }

  beforeEach(() => {
    mockRender.mockReset()
    mockRender.mockResolvedValue({
      remarkPluginFrontmatter: {
        excerpt: 'A readable lead card excerpt',
      },
    })
  })

  test('uses non-overlay text styles for small screens', async () => {
    const html = await renderCard()

    expect(html).toContain('fetchpriority="high"')
    expect(html).toContain('w-full bg-white')
    expect(html).toContain('text-lg leading-snug font-medium text-stone-900')
    expect(html).toContain('text-sm text-stone-600')
    expect(html).toContain('text-md mt-2 leading-relaxed text-stone-700')
  })

  test('keeps overlay treatment for large screens', async () => {
    const html = await renderCard()

    expect(html).toContain('lg:bg-transparent')
    expect(html).toContain('lg:absolute lg:top-0 lg:left-0 lg:h-full')
    expect(html).toContain(
      'lg:from-primary-main/75 lg:via-primary-main/60 lg:bg-linear-to-r lg:to-transparent'
    )
    expect(html).toContain('lg:text-primary-contrast lg:text-4xl')
    expect(html).toContain('lg:drop-shadow-lg')
  })

  test('adds custom classes when provided', async () => {
    const html = await renderCard('test-class')

    expect(html).toContain('test-class')
  })
})
