import { type CollectionEntry, getEntry } from 'astro:content'

export const DEFAULT_SITE_ID = 'agingdeveloper'

/**
 * @name getDefaultSite
 *
 * Get the data about the default site.
 *
 * @returns the site metadata
 */
export const getDefaultSite = async (): Promise<CollectionEntry<'site'>> => {
  return getSite(DEFAULT_SITE_ID)
}

/**
 * @name getSite
 *
 * Get the data about a specific site.
 *
 * @param {number} id - The id of the site
 * @returns the site metadata
 */
export const getSite = async (id: string): Promise<CollectionEntry<'site'>> => {
  const site = await getEntry('site', id)
  if (!site) {
    throw new Error(`Site ${id} is required`)
  }

  // replace the origin when not in production mode
  if (!import.meta.env.PROD) {
    site.data.origin = import.meta.env.SITE
  }
  return site
}
