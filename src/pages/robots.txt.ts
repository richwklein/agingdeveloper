/**
 * The page used to create the robots.txt file.
 */
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

const siteId = import.meta.env.SITE_ID;
const entry = await getEntry("site", siteId);
const site = entry.data;

const robotsTxt = `
User-agent: *
Allow: /


Sitemap: ${new URL("sitemap-index.xml", site.url)}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
