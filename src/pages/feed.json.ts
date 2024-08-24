/**
 * The page used to create the json feed.
 */
import { getFeed } from '@utils/feed'
import type { APIRoute } from 'astro'

const feed = await getFeed()

export const GET: APIRoute = async () => {
  return new Response(feed.json1(), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
