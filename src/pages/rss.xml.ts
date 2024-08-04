/**
 * The page used to create the rss feed.
 */
import { getFeed } from "@utils/feed"
import type { APIRoute } from "astro"

const feed = await getFeed()

export const GET: APIRoute = () => {
  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}
