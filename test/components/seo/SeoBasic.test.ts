import SeoBasic from '@components/seo/SeoBasic.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, expect, test } from 'vitest'

type RenderOptions = { path?: string }
let seo: string

beforeAll(async () => {
  seo = await render()
})

const render = async ({ path }: RenderOptions = {}) => {
  const container = await AstroContainer.create()
  return await container.renderToString(SeoBasic, {
    props: {
      title: 'Title',
      description: 'Description',
      path: path,
    },
  })
}

test('that it contains the title', async () => {
  expect(seo).toContain('<title>Title</title>')
})

test('that it contains the description', async () => {
  expect(seo).toContain('<meta name="description" content="Description">')
})

test('that it contains a canonical url without a path', async () => {
  expect(seo).toContain('<link rel="canonical" href="http://localhost:4321">')
})

test('that canonical will be created with a path', async () => {
  const result = await render({ path: '/article/slug' })
  expect(result).toContain('<link rel="canonical" href="http://localhost:4321/article/slug">')
})
