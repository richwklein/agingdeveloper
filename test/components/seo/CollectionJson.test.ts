import CollectionJson from '@components/seo/CollectionJson.astro'
import { getDefaultSite } from '@utils/site'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeAll, describe, expect, test } from 'vitest'

describe('collectionJson', () => {
  let site: CollectionEntry<'site'>
  let linkedData: string

  beforeAll(async () => {
    site = await getDefaultSite()
    linkedData = await render()
  })

  const render = async () => {
    const container = await AstroContainer.create()
    return await container.renderToString(CollectionJson, {
      props: {
        name: 'Code',
        path: '/category/code',
        items: [
          { name: 'First Article', path: '/article/first' },
          { name: 'Second Article', path: '/article/second' },
        ],
        site: site,
      },
    })
  }

  test('that it contains an ld+json', async () => {
    expect(linkedData).toContain('<script type="application/ld+json">')
  })

  test('that it contains a collection page', async () => {
    expect(linkedData).toContain('"@type":"CollectionPage"')
  })

  test('that it names the collection and links to its url', async () => {
    expect(linkedData).toContain('"name":"Code"')
    expect(linkedData).toContain('"url":"http://localhost:4321/category/code"')
  })

  test('that it contains an item list with the number of items shown', async () => {
    expect(linkedData).toContain('"@type":"ItemList"')
    expect(linkedData).toContain('"numberOfItems":2')
  })

  test('that it lists the first entry', async () => {
    expect(linkedData).toContain(
      '"position":1,"name":"First Article","url":"http://localhost:4321/article/first"'
    )
  })

  test('that it lists the second entry', async () => {
    expect(linkedData).toContain(
      '"position":2,"name":"Second Article","url":"http://localhost:4321/article/second"'
    )
  })
})
