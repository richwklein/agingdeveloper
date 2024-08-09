import { getEntry, type CollectionEntry } from 'astro:content'

let site: CollectionEntry<'site'>

export const getSite = async () => {
  if (site == null) {
    site = await getEntry('site', 'agingdeveloper')
  }
  return site
}

export const getSiteAuthor = async () => {
  const site = await getSite()
  return await getEntry(site.data.author)
}
