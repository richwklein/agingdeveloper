import { beforeEach, describe, expect, test, vi } from 'vitest'

const { mockGetArticles, mockGetDefaultSite, mockGetImage } = vi.hoisted(() => {
  return {
    mockGetArticles: vi.fn(),
    mockGetDefaultSite: vi.fn(),
    mockGetImage: vi.fn(async ({ src }: { src: string | { src: string } }) => {
      const imageSrc = typeof src === 'string' ? src : src.src
      return { src: `/_mock/${imageSrc.replace(/^\.\//, '')}` }
    }),
  }
})

vi.mock('@utils/article', () => ({
  getArticles: mockGetArticles,
}))

vi.mock('@utils/site', () => ({
  getDefaultSite: mockGetDefaultSite,
}))

vi.mock('astro:assets', () => ({
  getImage: mockGetImage,
}))

import { feedInfo, getFeed } from '@utils/feed'

describe('getFeed', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockGetDefaultSite.mockResolvedValue({
      id: 'mock-site-1',
      collection: 'site',
      data: {
        title: 'Mock Feed Title',
        tagline: 'Mock Feed Tagline',
        category: 'mock-category-1',
        origin: 'https://feed.example.com',
        avatar: { src: './site-avatar.jpg' },
        icon: { src: './site-icon.jpg' },
      },
    })

    mockGetArticles.mockResolvedValue([
      {
        id: 'mock-feed-article',
        body: [
          'Intro paragraph.',
          '',
          '![Inline image](/_astro/inline-image.jpg)',
          '',
          '[Relative link](/about)',
        ].join('\n'),
        data: {
          title: 'Mock Feed Article',
          description: 'Mock feed description',
          published: new Date('2026-04-10'),
          author: { id: 'mock-author-1' },
          featured: {
            image: { src: '/_astro/featured-image.jpg' },
            author: {
              name: 'Jane Photographer',
              url: 'https://images.example.com/jane',
            },
            site: {
              name: 'Example Photos',
              url: 'https://images.example.com',
            },
          },
        },
      },
    ])
  })

  test('prepends the description and featured image block to feed content', async () => {
    const feed = await getFeed()
    const json = JSON.parse(feed.json1())
    const item = json.items[0]

    expect(item.content_html).toContain('<p>Mock feed description</p>')
    expect(item.content_html).toContain('<img')
    expect(item.content_html).toContain('src="https://feed.example.com/_astro/featured-image.jpg"')
    expect(item.content_html).toContain('alt="Jane Photographer"')
    expect(item.content_html).toContain('Image by')
    expect(item.content_html).toContain('href="https://images.example.com/jane"')
    expect(item.content_html).toContain('>Example Photos<')
    expect(item.content_html).toContain('<p>Intro paragraph.</p>')

    const descriptionIndex = item.content_html.indexOf('<p>Mock feed description</p>')
    const imageIndex = item.content_html.indexOf(
      'src="https://feed.example.com/_astro/featured-image.jpg"'
    )
    const bodyIndex = item.content_html.indexOf('<p>Intro paragraph.</p>')

    expect(descriptionIndex).toBeGreaterThanOrEqual(0)
    expect(imageIndex).toBeGreaterThan(descriptionIndex)
    expect(imageIndex).toBeGreaterThanOrEqual(0)
    expect(bodyIndex).toBeGreaterThan(imageIndex)
  })

  test('keeps inline markdown links and images absolute in feed content', async () => {
    const feed = await getFeed()
    const json = JSON.parse(feed.json1())
    const item = json.items[0]

    expect(item.content_html).toContain('src="https://feed.example.com/_astro/inline-image.jpg"')
    expect(item.content_html).toContain('href="https://feed.example.com/about"')
    expect(item.image.url).toBe('https://feed.example.com/_astro/featured-image.jpg')
    expect(item.author.name).toBe('Mock Name 1')
  })
})

describe('feedInfo', () => {
  test('should have required feed properties', () => {
    expect(feedInfo).toHaveLength(3)
    feedInfo.forEach((info) => {
      expect(info).toHaveProperty('id')
      expect(info).toHaveProperty('type')
      expect(info).toHaveProperty('path')
    })
  })

  test('should include rss, atom, and feed ids', () => {
    const ids = feedInfo.map((f) => f.id)
    expect(ids).toContain('rss')
    expect(ids).toContain('atom')
    expect(ids).toContain('feed')
  })
})
