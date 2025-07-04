/**
 * The page used to create the json feed.
 */
import { feedInfo, getFeed } from '@utils/feed'
import type { APIRoute } from 'astro'

const info = feedInfo.find((f) => f.id === 'feed')
if (!info) {
  throw new Error('Json feed info not found')
}

const feed = await getFeed()

export const GET: APIRoute = async () => {
  return new Response(feed.json1(), {
    headers: {
      'Content-Type': `${info.type}; charset=utf-8`,
    },
  })
}
