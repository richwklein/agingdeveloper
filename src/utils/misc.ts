const baseUrl = import.meta.env.SITE

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
export const capitalize = (value: string): string => {
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Get the intersection of two string arrays as a set.
 *
 * @param first - the first array to compare.
 * @param second - the second array to compare.
 */
export const intersection = (first: Array<string>, second: Array<string>): Set<string> => {
  return new Set<string>(second.filter((val) => first.includes(val)))
}

/**
 * Create an absolute url for the given path.
 *
 * @param path - the path to construct the url for.
 * @param baseUrl - the base url or undefined.
 * @returns the full url.
 */
export const createAbsoluteUrl = (path: string) => {
  return new URL(path, baseUrl).href
}
