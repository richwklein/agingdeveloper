import { readFile } from 'node:fs/promises'

import type { ImageMetadata } from 'astro'
import path from 'path'
import sharp from 'sharp'

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
 * Build an absolute url for the given path and origin.
 *
 * @param path - the path to construct the url for.
 * @param base - the origin.
 * @returns the full url.
 */
export const buildUrl = (path: string, origin: URL | string | undefined) => {
  return new URL(path, origin)
}

/**
 * Calculate a height value for a given width and aspect ratio.
 *
 * @param width - The width to use
 * @param aspect - The aspect ratio
 * @returns the calculated height
 */
export const calculateHeight = (width: number, aspect: string) => {
  const aspectRatio = aspect == 'square' ? '1/1' : aspect == 'video' ? '16/9' : aspect
  const [ratioWidth, ratioHeight] = aspectRatio.split('/').map(Number)
  const height = Math.floor((width * ratioHeight) / ratioWidth)

  return height
}

/**
 * Create a data url for a placeholder image.
 *
 * @param image - The image to create a placeholder for.
 * @param width - The width of the image to use.
 * @returns a blurred image as a base64 data url.
 */
export const createPlaceholderUrl = async (image: ImageMetadata, width: number) => {
  let srcPath: string
  if (import.meta.env.MODE === 'development') {
    srcPath = image.src.replace('/@fs', '').split('?')[0]
  } else {
    const cwd = process.cwd()
    // We need to resolve /_astro to <process.cwd>/dist/_astro
    const location = path.join(cwd, 'dist', image.src)
    srcPath = location
  }

  const { buffer } = await readFile(srcPath)
  const blurred = await sharp(buffer)
    .resize({ width: width, fit: sharp.fit.cover, position: sharp.gravity.northwest })
    .blur(20)
    .toBuffer()

  return `data:image/${image.format};base64,${blurred.toString('base64')}`
}
