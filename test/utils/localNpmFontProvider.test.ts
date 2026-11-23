import { readFile } from 'node:fs/promises'
import { isAbsolute } from 'node:path'
import { pathToFileURL } from 'node:url'

import { localNpmFontProvider } from '@utils/localNpmFontProvider'
import { fontProviders } from 'astro/config'
import { afterEach, describe, expect, test, vi } from 'vitest'

describe('localNpmFontProvider', () => {
  afterEach(() => vi.restoreAllMocks())

  test.each([
    ['Noto Sans Georgian', '@fontsource/noto-sans-georgian'],
    ['Noto Serif Georgian', '@fontsource/noto-serif-georgian'],
    ['Fira Code', '@fontsource/fira-code'],
    ['Walter Turncoat', '@fontsource/walter-turncoat'],
  ])('resolves local files and preserves metadata for %s', async (familyName, packageName) => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Unexpected fetch'))
    const provider = localNpmFontProvider()
    const original = fontProviders.npm({ remote: false })
    const blockedFetch = vi.fn<typeof fetch>().mockRejectedValue(new Error('Unexpected fetch'))
    async function getItem<T>(key: string): Promise<T | null>
    async function getItem<T>(key: string, init: () => T | Promise<T>): Promise<T>
    async function getItem<T>(_key: string, init?: () => T | Promise<T>): Promise<T | null> {
      return init ? await init() : null
    }
    const context: Parameters<NonNullable<typeof provider.init>>[0] & { fetch: typeof fetch } = {
      root: pathToFileURL(`${process.cwd()}/`),
      storage: { getItem, async setItem() {} },
      fetch: blockedFetch,
    }
    await provider.init?.(context)
    await original.init?.(context)
    const options: Parameters<typeof provider.resolveFont>[0] = {
      familyName,
      weights: ['400'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      formats: ['woff2'],
      options: { package: packageName },
    }
    const result = await provider.resolveFont(options)
    const upstream = await original.resolveFont(options)
    expect(result?.fonts.length).toBeGreaterThan(0)
    expect(result?.fonts.length).toBe(upstream?.fonts.length)
    for (const [index, font] of result!.fonts.entries()) {
      const { src, ...metadata } = font
      const { src: originalSources, ...originalMetadata } = upstream!.fonts[index]
      expect(metadata).toEqual(originalMetadata)
      const withoutUrls = (sources: typeof src) =>
        sources.map((source) => ('url' in source ? { ...source, url: '' } : source))
      expect(withoutUrls(src)).toEqual(withoutUrls(originalSources))
      const paths = src.flatMap((source) => ('url' in source ? [source.url] : []))
      expect(paths.length).toBeGreaterThan(0)
      expect(paths.every(isAbsolute)).toBe(true)
      const files = await Promise.all(paths.map((path) => readFile(path)))
      expect(files.every((file) => file.byteLength > 0)).toBe(true)
    }
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(blockedFetch).not.toHaveBeenCalled()
  })

  test('returns undefined before initialization', async () => {
    const provider = localNpmFontProvider()
    await expect(
      provider.resolveFont({
        familyName: 'Missing',
        weights: ['400'],
        styles: ['normal'],
        subsets: ['latin'],
        formats: ['woff2'],
        options: undefined,
      })
    ).resolves.toBeUndefined()
  })
})
