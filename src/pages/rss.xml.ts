/**
 * The page used to create the rss feed.
 */
import { feedInfo, getFeed } from '@utils/feed'
import type { APIRoute } from 'astro'

const info = feedInfo.find((f) => f.id === 'rss')
if (!info) {
  throw new Error('RSS feed info not found')
}

const feed = await getFeed()

export const GET: APIRoute = async () => {
  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': `${info.type}; charset=utf-8`,
    },
  })
}
