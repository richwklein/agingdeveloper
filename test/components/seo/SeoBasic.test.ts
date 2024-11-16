import SeoBasic from '@components/seo/SeoBasic.astro'
import { getSite } from '@utils/site'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeAll, describe, expect, test } from 'vitest'

describe('seoBasic', () => {
  type RenderOptions = { path?: string }
  let site: CollectionEntry<'site'>
  let seo: string

  beforeAll(async () => {
    site = await getSite()
    seo = await render()
  })

  const render = async ({ path }: RenderOptions = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(SeoBasic, {
      props: {
        site: site,
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
    expect(seo).toContain('<link rel="canonical" href="http://localhost:4321/">')
  })

  test('that canonical will be created with a path', async () => {
    const result = await render({ path: '/article/slug' })
    expect(result).toContain('<link rel="canonical" href="http://localhost:4321/article/slug">')
  })
})
