/**
 * The page used to create the robots.txt file.
 */
import type { APIRoute } from "astro"
const url = new URL("sitemap-index.xml", import.meta.env.SITE)

const robotsTxt = `
User-agent: *
Allow: /
Sitemap: ${url.href}
Host: ${url.host}
`.trim()

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
