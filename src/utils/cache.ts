import { CACHE_MAX_AGE } from 'astro:env/server'

const cacheControl = `public, max-age=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_MAX_AGE}`

/**
 * Returns the Cache-Control header value used for static responses.
 */
export const getStaticCacheControl = () => {
  return cacheControl
}
