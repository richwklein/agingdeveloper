import { getEntry } from 'astro:content'

/**
 * Get the data about this site.
 *
 * @returns the site metadata
 */
export const getSite = async () => {
  const site = await getEntry('site', 'agingdeveloper')

  // replace the origin when not in production mode
  if (!import.meta.env.PROD) {
    site.data.origin = import.meta.env.SITE
  }
  return site
}
