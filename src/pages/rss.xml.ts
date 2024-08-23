/**
 * The page used to create the rss feed.
 */
import { getFeed } from '@utils/feed'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ site }) => {
  const feed = await getFeed(site)

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
