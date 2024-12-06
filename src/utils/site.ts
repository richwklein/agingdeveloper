import { type CollectionEntry, getEntry } from 'astro:content'

const SITE_ID = 'agingdeveloper'

/**
 * Get the data about this site.
 *
 * @returns the site metadata
 */
export const getSite = async (): Promise<CollectionEntry<'site'>> => {
  const site = await getEntry('site', SITE_ID)
  if (!site) {
    throw new Error(`Site ${SITE_ID} is required`)
  }

  // replace the origin when not in production mode
  if (!import.meta.env.PROD) {
    site.data.origin = import.meta.env.SITE
  }
  return site
}
