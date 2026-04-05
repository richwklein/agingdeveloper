import { getStaticCacheControl } from '@utils/cache'
import { CACHE_MAX_AGE } from 'astro:env/server'
import { describe, expect, test } from 'vitest'

describe('getStaticCacheControl', () => {
  test('returns the configured static cache control header value', () => {
    expect(getStaticCacheControl()).toBe(
      `public, max-age=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_MAX_AGE}`
    )
  })
})
