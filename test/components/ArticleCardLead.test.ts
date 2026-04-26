import ArticleCardLead from '@components/ArticleCardLead.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { type CollectionEntry, render } from 'astro:content'
import { beforeEach, describe, expect, test, vi } from 'vitest'

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
    vi.mocked(render).mockReset()
    vi.mocked(render).mockResolvedValue({
      remarkPluginFrontmatter: {
        excerpt: 'A readable lead card excerpt',
      },
    } as any)
  })

  test('uses non-overlay text styles for small screens', async () => {
    const html = await renderCard()

    expect(html).toContain('fetchpriority="high"')
    expect(html).toContain('bg-card-light w-full')
    expect(html).toContain('text-fg-light')
    expect(html).toContain('text-fg-main')
    expect(html).toContain('text-fg-dark')
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
