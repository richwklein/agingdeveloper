/**
 * The page used to create the atom feed.
 */
import { getFeed } from '@utils/feed'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ site }) => {
  const feed = await getFeed(site)
  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
