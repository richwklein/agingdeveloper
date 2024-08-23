/**
 * The page used to create the robots.txt file.
 */
import { createAbsoluteUrl } from '@utils/misc'
import type { APIRoute } from 'astro'

const url = createAbsoluteUrl('sitemap-index.xml')

const robotsTxt = `
User-agent: *
Allow: /
Sitemap: ${url}
`.trim()

export const GET: APIRoute = async () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
