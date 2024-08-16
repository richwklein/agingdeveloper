import slugify from '@sindresorhus/slugify'

/**
 * Calculates a font weight between 300 and 900 rounding up to the nearest 100.
 *
 * @param value - the number of a given object.
 * @param total - the total number of objects.
 * @return - a new value in the range between 300 and 900.
 */
export const calculateWeight = (value: number, total: number): number => {
  const zeroBased = value - 1
  const normalized = zeroBased / (total - 1)
  const shifted = normalized * (900 - 300) + 300
  return Math.ceil(shifted / 100) * 100
}

/**
 * Capitalize each word in a string.
 *
 * @param value - the string to capitalize.
 */
export const capitalize = (value: string) => {
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

type AbsoluteUrlOptions = { path?: string; id?: string; clean?: boolean }
export const absoluteUrl = async ({ path, id, clean = false }: AbsoluteUrlOptions = {}) => {
  const slug = id == null ? null : clean ? slugify(id) : id
  const siteUrl = import.meta.env.SITE
  const parts = [siteUrl, path, slug]

  // remove any null values, strip trailing slashes, then join with slash
  return parts
    .filter((part) => part != null)
    .map((part) => (part.endsWith('/') ? part.substring(-1) : part))
    .join('/')
}
