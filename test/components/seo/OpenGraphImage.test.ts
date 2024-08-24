import OpenGraphImage from '@components/seo/OpenGraphImage.astro'
import { getSite } from '@utils/site'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, expect, test } from 'vitest'

const site = await getSite()
let headers: string | undefined

beforeAll(async () => {
  headers = await render()
})

const render = async () => {
  const image: ImageMetadata = {
    src: '/image.jpg',
    width: 1200,
    height: 630,
    format: 'jpg',
  }
  const container = await AstroContainer.create()
  return await container.renderToString(OpenGraphImage, {
    props: {
      site: site,
      image: image,
      imageAlt: 'Image',
    },
  })
}

test('that it contains an open graph image', async () => {
  expect(headers).toContain('meta property="og:image" content="http://localhost:4321/image.jpg"')
})

test('that it contains an open graph image type', async () => {
  expect(headers).toContain('meta property="og:image:type" content="image/jpeg"')
})

test('that it contains an open graph image width', async () => {
  expect(headers).toContain('meta property="og:image:width" content="1200"')
})

test('that it contains an open graph image height', async () => {
  expect(headers).toContain('meta property="og:image:height" content="630"')
})

test('that it contains an open graph image alt', async () => {
  expect(headers).toContain('meta property="og:image:alt" content="Image"')
})
