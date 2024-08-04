/**
 * The page used to create the atom feed.
 */
import { getFeed } from "@utils/feed"
import type { APIRoute } from "astro"

const feed = await getFeed()

export const GET: APIRoute = () => {
  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  })
}
