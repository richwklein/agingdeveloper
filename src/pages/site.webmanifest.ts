/**
 * The page used to create the webmanifest file.
 */
import { buildUrl } from '@utils/misc'
import { getSite } from '@utils/site'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const site = await getSite()

  const manifest = {
    id: site.id,
    name: site.data.title,
    short_name: site.data.title,
    description: site.data.tagline,
    categories: [site.data.category],
    start_url: buildUrl('', site.data.origin),
    display: 'browser',
    background_color: site.data.background,
    theme_color: site.data.theme,
    scope: buildUrl('', site.data.origin),
    icons: [
      { src: '/icons/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { src: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { src: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { src: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  }

  const webmanifest = JSON.stringify(manifest, null, 2)

  return new Response(webmanifest, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
