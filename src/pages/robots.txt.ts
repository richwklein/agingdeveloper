/**
 * The page used to create the robots.txt file.
 */
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ site }) => {
  const url = new URL('sitemap-index.xml', site)
  const robotsTxt = `
  User-agent: *
  Allow: /
  Sitemap: ${url.href}
  Host: ${url.host}
  `.trim()

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
