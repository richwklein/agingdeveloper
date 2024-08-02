/**
 * The page used to create the webmanifest file.
 */
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

const siteId = import.meta.env.SITE_ID;
const entry = await getEntry("site", siteId);
const site = entry.data;
const baseUrl = import.meta.env.SITE;

const manifest = {
  name: site.title,
  short_name: site.title,
  description: site.tagline,
  categories: [site.category],
  start_url: "/",
  display: "browser",
  background_color: "#ffffff",
  theme_color: "#37474f",
  lang: "en-US",
  scope: baseUrl,
  icons: [
    { src: "/icons/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    { src: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { src: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { src: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    { src: "/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
  ]
};

const webmanifest = JSON.stringify(manifest, null, 2);

export const GET: APIRoute = () => {
  return new Response(webmanifest, {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
};
