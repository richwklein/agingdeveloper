/**
 * The page used to create the robots.txt file.
 */
import { buildUrl } from '@utils/misc'
import { getSite } from '@utils/site'
import type { APIRoute } from 'astro'

const site = await getSite()
const url = buildUrl('sitemap-index.xml', site.data.origin)

const robotsTxt = `
User-agent: *
Allow: /
Sitemap: ${url}
Host: ${url.host}
`.trim()

export const GET: APIRoute = async () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
