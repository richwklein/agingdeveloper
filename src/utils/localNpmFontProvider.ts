import { fileURLToPath } from 'node:url'

import { fontProviders } from 'astro/config'

export function localNpmFontProvider() {
  const provider = fontProviders.npm({ remote: false })

  return {
    ...provider,
    name: 'local-npm-file-path',
    async resolveFont(options: Parameters<typeof provider.resolveFont>[0]) {
      const result = await provider.resolveFont(options)
      if (!result) return result

      // Astro's font loader requires absolute paths for local files:
      // https://github.com/withastro/astro/blob/astro@7.4.12/packages/astro/src/assets/fonts/infra/cached-font-fetcher.ts
      return {
        ...result,
        fonts: result.fonts.map((font) => ({
          ...font,
          src: font.src.map((source) =>
            'url' in source && source.url.startsWith('file:')
              ? { ...source, url: fileURLToPath(source.url) }
              : source
          ),
        })),
      }
    },
  }
}
