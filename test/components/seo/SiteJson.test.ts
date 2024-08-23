import SiteJson from '@components/seo/SiteJson.astro'
import { getSite } from '@utils/site'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, expect, test } from 'vitest'

let site = await getSite()
let siteJson: string

beforeAll(async () => {
  site = await getSite()
  siteJson = await render()
  console.log(siteJson)
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
