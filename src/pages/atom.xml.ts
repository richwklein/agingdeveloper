/**
 * The page used to create the atom feed.
 */
import { getStaticCacheControl } from '@utils/cache'
import { feedInfo, getFeed, renderAtom } from '@utils/feed'
import type { APIRoute } from 'astro'

const info = feedInfo.find((f) => f.id === 'atom')
if (!info) {
  throw new Error('Atom feed info not found')
}

const feed = await getFeed()

export const GET: APIRoute = async () => {
  return new Response(renderAtom(feed), {
    headers: {
      'Cache-Control': getStaticCacheControl(),
      'Content-Type': `${info.type}; charset=utf-8`,
    },
  })
}
