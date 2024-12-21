import BreadcrumbJson from '@components/seo/BreadcrumbJson.astro'
import { getDefaultSite } from '@utils/site'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeAll, describe, expect, test } from 'vitest'

describe('breadcrumbJson', () => {
  let site: CollectionEntry<'site'>
  let linkedData: string

  beforeAll(async () => {
    site = await getDefaultSite()
    linkedData = await render()
  })

  const render = async () => {
    const container = await AstroContainer.create()
    return await container.renderToString(BreadcrumbJson, {
      props: {
        crumbs: [
          { name: 'Articles', path: '/article' },
          { name: 'Title', path: '/article/slug' },
        ],
        site: site,
      },
    })
  }

  test('that it contains an ld+json', async () => {
    expect(linkedData).toContain('<script type="application/ld+json">')
  })

  test('that it contains an breadcrumb list', async () => {
    expect(linkedData).toContain('"@type":"BreadcrumbList"')
  })

  test('that it contains site as the base item', async () => {
    expect(linkedData).toContain(
      '"position":1,"name":"The Aging Developer","item":"http://localhost:4321'
    )
  })

  test('that it contains the article index crumb', async () => {
    expect(linkedData).toContain(
      '"position":2,"name":"Articles","item":"http://localhost:4321/article"'
    )
  })

  test('that it contains the article crumb', async () => {
    expect(linkedData).toContain(
      '"position":3,"name":"Title","item":"http://localhost:4321/article/slug"'
    )
  })
})
