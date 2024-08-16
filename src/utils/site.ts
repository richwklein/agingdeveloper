import { getEntry } from 'astro:content'

export const getSite = async () => {
  return await getEntry('site', 'agingdeveloper')
}
