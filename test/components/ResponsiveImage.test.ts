import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const { mockCreateBlurDataUrl } = vi.hoisted(() => ({
  mockCreateBlurDataUrl: vi.fn(),
}))

vi.mock('@utils/image', () => ({
  createBlurDataUrl: mockCreateBlurDataUrl,
}))

import ResponsiveImage from '@components/ResponsiveImage.astro'

describe('responsiveImage', () => {
  const image = {
    src: '/_astro/mock-image.jpg',
    width: 1200,
    height: 800,
    format: 'jpg',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const render = async (quality?: number) => {
    const container = await AstroContainer.create()
    return await container.renderToString(ResponsiveImage, {
      props: {
        image,
        alt: 'Mock image',
        width: 640,
        loading: 'lazy',
        quality,
      },
    })
  }

  test('adds placeholder styles and cleanup handlers when blur data URL is available', async () => {
    mockCreateBlurDataUrl.mockResolvedValue('data:image/jpeg;base64,abc123')

    const html = await render()

    expect(mockCreateBlurDataUrl).toHaveBeenCalledWith(image)
    expect(html).toContain('background-image:url(&#34;data:image/jpeg;base64,abc123&#34;)')
    expect(html).toContain('color:transparent')
    expect(html).toContain('onload="')
    expect(html).toContain('onerror="')
    expect(html).toContain("removeProperty('background-image')")
    expect(html).toContain("removeProperty('color')")
  })

  test('omits placeholder styles and cleanup handlers when no blur data URL is available', async () => {
    mockCreateBlurDataUrl.mockResolvedValue(null)

    const html = await render()

    expect(mockCreateBlurDataUrl).toHaveBeenCalledWith(image)
    expect(html).not.toContain('background-image:url(')
    expect(html).not.toContain('color:transparent')
    expect(html).not.toContain('onload="')
    expect(html).not.toContain('onerror="')
    expect(html).not.toContain("removeProperty('background-image')")
  })

  test('passes quality through to the transformed image request when provided', async () => {
    mockCreateBlurDataUrl.mockResolvedValue(null)

    const html = await render(60)

    expect(html).toContain('&#38;q=60')
  })
})
