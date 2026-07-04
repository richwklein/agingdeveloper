import { createBlurDataUrl, normalizeImageKey } from '@utils/image'
import { describe, expect, test } from 'vitest'

describe('normalizeImageKey', () => {
  test('removes query strings and decodes URL-encoded paths', () => {
    expect(normalizeImageKey('/_astro/my%20image.jpg?v=123')).toBe('/_astro/my image.jpg')
  })

  test('normalizes /@fs sources to absolute filesystem paths', () => {
    expect(
      normalizeImageKey('/@fs/Users/example/project/src/content/article/image.jpg?import')
    ).toBe('/Users/example/project/src/content/article/image.jpg')
  })
})

describe('createBlurDataUrl', () => {
  test('returns null when the source image path cannot be resolved', async () => {
    const result = await createBlurDataUrl({
      src: '/_astro/does-not-exist.jpg',
      width: 100,
      height: 80,
      format: 'jpg',
    })

    expect(result).toBeNull()
  })
})
