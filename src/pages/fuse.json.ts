import { getStaticCacheControl } from '@utils/cache'
import { getSearchIndexPayload } from '@utils/search'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const payload = await getSearchIndexPayload()

  return new Response(JSON.stringify(payload), {
    headers: {
      'Cache-Control': getStaticCacheControl(),
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
