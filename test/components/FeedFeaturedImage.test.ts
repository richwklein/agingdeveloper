import FeedFeaturedImage from '@components/FeedFeaturedImage.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, test } from 'vitest'

describe('feedFeaturedImage', () => {
  const render = async (
    featured: Record<string, unknown>,
    imageUrl = 'https://example.com/image.jpg'
  ) => {
    const container = await AstroContainer.create()
    return await container.renderToString(FeedFeaturedImage, {
      props: {
        featured,
        imageUrl,
      },
    })
  }

  test('renders the featured image and attribution metadata', async () => {
    const html = await render({
      image: { src: './featured.jpg' },
      author: {
        name: 'Jane Photographer',
        url: 'https://example.com/jane',
      },
      site: {
        name: 'Example Photos',
        url: 'https://example.com/photos',
      },
    })

    expect(html).toContain('<figure')
    expect(html).toContain('src="https://example.com/image.jpg"')
    expect(html).toContain('alt="Jane Photographer"')
    expect(html).toContain('Image by')
    expect(html).toContain('href="https://example.com/jane"')
    expect(html).toContain('>Jane Photographer<')
    expect(html).toContain('href="https://example.com/photos"')
    expect(html).toContain('>Example Photos<')
  })

  test('omits the caption when attribution metadata is missing', async () => {
    const html = await render({
      image: { src: './featured.jpg' },
    })

    expect(html).toContain('<figure')
    expect(html).toContain('alt="unknown"')
    expect(html).not.toContain('<figcaption')
    expect(html).not.toContain('Image by')
  })
})
