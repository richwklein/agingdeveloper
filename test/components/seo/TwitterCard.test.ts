import TwitterCard from '@components/seo/TwitterCard.astro'
import { getDefaultAuthor } from '@utils/author'
import { buildUrl } from '@utils/misc'
import { getDefaultSite } from '@utils/site'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeAll, describe, expect, test } from 'vitest'

describe('twitterCard', () => {
  let author: CollectionEntry<'author'>
  let site: CollectionEntry<'site'>
  let image: ImageMetadata
  let content: string

  beforeAll(async () => {
    site = await getDefaultSite()
    author = await getDefaultAuthor()
    image = {
      src: 'https://example.com/image.jpg',
      format: 'jpg',
      width: 1200,
      height: 630,
    }

    content = await render(site, author, image, 'Test Image Alt')
  })

  const render = async (
    site: CollectionEntry<'site'>,
    author?: CollectionEntry<'author'>,
    image?: ImageMetadata,
    imageAlt?: string
  ) => {
    const container = await AstroContainer.create()
    return await container.renderToString(TwitterCard, {
      props: {
        site: site,
        title: 'Test Title',
        description: 'Test Description',
        image: image,
        imageAlt: imageAlt,
        author: author,
      },
    })
  }

  test('that it contains a twitter card', async () => {
    expect(content).toContain('<meta name="twitter:card" content="summary_large_image">')
  })

  test('that it contains the title', async () => {
    expect(content).toContain('<meta name="twitter:title" content="Test Title">')
  })

  test('that it contains the description', async () => {
    expect(content).toContain('<meta name="twitter:description" content="Test Description">')
  })

  test('that it contains the image', async () => {
    const imageUrl = buildUrl(image.src, site.data.origin)
    expect(content).toContain(`<meta name="twitter:image" content="${imageUrl.href}">`)
  })

  test('that it contains the imageAlt', async () => {
    expect(content).toContain(`<meta name="twitter:image:alt" content="Test Image Alt">`)
  })

  test('that it contains the author', async () => {
    expect(content).toContain(
      `<meta name="twitter:creator" content="${author.data.twitterUsername}">`
    )
  })

  test('that a basic card', async () => {
    const result = await render(site)
    expect(result).toContain('<meta name="twitter:title" content="Test Title">')
    expect(result).toContain('<meta name="twitter:description" content="Test Description">')
    expect(result).not.toContain('<meta name="twitter:image"')
    expect(result).not.toContain('<meta name="twitter:image:alt"')
    expect(result).not.toContain('<meta name="twitter:creator"')
  })
})
