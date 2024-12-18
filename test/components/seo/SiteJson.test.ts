import SiteJson from '@components/seo/SiteJson.astro'
import { getDefaultSite } from '@utils/site'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeAll, describe, expect, test } from 'vitest'

describe('siteJson', () => {
  let site: CollectionEntry<'site'>
  let siteJson: string

  beforeAll(async () => {
    site = await getDefaultSite()
    siteJson = await render()
  })

  const render = async () => {
    const container = await AstroContainer.create()
    return await container.renderToString(SiteJson, {
      props: {
        site: site,
      },
    })
  }

  test('that it contains an ld+json', async () => {
    expect(siteJson).toContain('<script type="application/ld+json">')
  })

  test('that it contains an Website type', async () => {
    expect(siteJson).toContain('"@type":"WebSite"')
  })

  test('that it contains the site name', async () => {
    expect(siteJson).toContain('"name":"The Aging Developer"')
  })

  test('that it contains the site url', async () => {
    expect(siteJson).toContain('"url":"http://localhost:4321/"')
  })
})
