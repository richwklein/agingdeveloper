import OpenGraphCore from '@components/seo/OpenGraphCore.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, expect, test } from 'vitest'

type RenderOptions = { type?: string; path?: string }
let headers: string | undefined

beforeAll(async () => {
  headers = await render()
})

const render = async ({ type = 'website', path }: RenderOptions = {}) => {
  const container = await AstroContainer.create()
  return await container.renderToString(OpenGraphCore, {
    props: {
      title: 'Title',
      description: 'Description',
      path: path,
      type: type,
    },
  })
}

test('that it contains an open graph type', async () => {
  expect(headers).toContain('meta property="og:type" content="website"')
})

test('that it contains an open graph url', async () => {
  const baseUrl = import.meta.env.SITE
  expect(headers).toContain(`meta property="og:url" content="${baseUrl}/"`)
})

test('that it contains an open graph title', async () => {
  expect(headers).toContain('meta property="og:title" content="Title"')
})

test('that it contains an open graph description', async () => {
  expect(headers).toContain('meta property="og:description" content="Description"')
})

test('that it can take an article type', async () => {
  const result = await render({ type: 'article' })
  expect(result).toContain('meta property="og:type" content="article"')
})

test('that it can take a profile type', async () => {
  const result = await render({ type: 'profile' })
  expect(result).toContain('meta property="og:type" content="profile"')
})

test('that it can take a path', async () => {
  const result = await render({ path: '/article' })
  const baseUrl = import.meta.env.SITE
  expect(result).toContain(`meta property="og:url" content="${baseUrl}/article"`)
})
