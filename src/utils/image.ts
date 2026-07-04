import { createHash } from 'node:crypto'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

import type { ImageMetadata } from 'astro'
import sharp from 'sharp'

interface PlaceholderOptions {
  width?: number
  blur?: number
  quality?: number
}

const cacheDirectory = path.join(process.cwd(), '.cache', 'image-placeholders')
const manifestPath = path.join(cacheDirectory, 'manifest.json')

type Manifest = Record<string, string>

let manifestCache: Manifest | undefined
const dataUrlCache: Map<string, string | null> = new Map()

/**
 * Normalize an image key/source by removing query params and normalizing /@fs paths.
 *
 * @param source - The raw image source or key.
 * @returns normalized source key.
 */
export const normalizeImageKey = (source: string): string => {
  return decodeURIComponent(source.split('?')[0]).replace('/@fs', '')
}

const sourceImageModules = import.meta.glob<ImageMetadata>(
  '/src/**/*.{avif,gif,jpeg,jpg,png,webp}',
  {
    eager: true,
    import: 'default',
  }
)

const sourcePathByOutputSrc: Map<string, string> = new Map(
  Object.entries(sourceImageModules).map(([sourcePath, metadata]) => [
    normalizeImageKey(metadata.src),
    sourcePath,
  ])
)

const loadManifest = async (): Promise<Manifest> => {
  if (manifestCache) {
    return manifestCache
  }

  try {
    const content = await readFile(manifestPath, 'utf-8')
    manifestCache = JSON.parse(content) as Manifest
  } catch {
    manifestCache = {}
  }

  return manifestCache
}

const persistManifest = async (manifest: Manifest): Promise<void> => {
  await mkdir(cacheDirectory, { recursive: true })
  await writeFile(manifestPath, JSON.stringify(manifest), 'utf-8')
}

const toAbsoluteProjectPath = (projectPath: string): string => {
  return path.join(process.cwd(), projectPath.replace(/^\//, ''))
}

const resolveImageSourcePath = async (image: ImageMetadata): Promise<string | null> => {
  const normalizedSrc = normalizeImageKey(image.src)

  if (normalizedSrc.startsWith('/@fs/')) {
    return normalizedSrc.replace('/@fs', '')
  }

  const sourcePath =
    sourcePathByOutputSrc.get(normalizedSrc) ??
    sourcePathByOutputSrc.get(normalizedSrc.startsWith('/') ? normalizedSrc : `/${normalizedSrc}`)
  if (sourcePath) {
    return toAbsoluteProjectPath(sourcePath)
  }

  const fallbackPath = path.join(process.cwd(), 'dist', normalizedSrc)
  try {
    await stat(fallbackPath)
    return fallbackPath
  } catch {
    return null
  }
}

const buildCacheKey = async (sourcePath: string, options: Required<PlaceholderOptions>) => {
  const sourceStat = await stat(sourcePath)
  return createHash('sha256')
    .update(
      JSON.stringify({
        blur: options.blur,
        mtime: sourceStat.mtimeMs,
        quality: options.quality,
        size: sourceStat.size,
        sourcePath: sourcePath,
        width: options.width,
      })
    )
    .digest('hex')
}

/**
 * Create a tiny blurred image data URL placeholder.
 *
 * Returns null if source-path resolution or transformation fails.
 */
export const createBlurDataUrl = async (
  image: ImageMetadata,
  options: PlaceholderOptions = {}
): Promise<string | null> => {
  const resolvedOptions: Required<PlaceholderOptions> = {
    blur: options.blur ?? 4,
    quality: options.quality ?? 70,
    width: options.width ?? 96,
  }

  try {
    const sourcePath = await resolveImageSourcePath(image)
    if (!sourcePath) {
      return null
    }

    const cacheKey = await buildCacheKey(sourcePath, resolvedOptions)
    if (dataUrlCache.has(cacheKey)) {
      return dataUrlCache.get(cacheKey) ?? null
    }

    const manifest = await loadManifest()
    if (manifest[cacheKey]) {
      dataUrlCache.set(cacheKey, manifest[cacheKey])
      return manifest[cacheKey]
    }

    const sourceBuffer = await readFile(sourcePath)
    const blurredBuffer = await sharp(sourceBuffer)
      .resize({ width: resolvedOptions.width, withoutEnlargement: true })
      .blur(resolvedOptions.blur)
      .jpeg({ quality: resolvedOptions.quality })
      .toBuffer()

    const dataUrl = `data:image/jpeg;base64,${blurredBuffer.toString('base64')}`
    manifest[cacheKey] = dataUrl
    dataUrlCache.set(cacheKey, dataUrl)
    await persistManifest(manifest)
    return dataUrl
  } catch {
    return null
  }
}
