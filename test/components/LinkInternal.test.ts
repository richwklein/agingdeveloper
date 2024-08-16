import LinkInternal from '@components/LinkInternal.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, expect, test } from 'vitest'

type RenderOptions = { title?: string; className?: string }
let link: string

beforeAll(async () => {
  link = await render()
})

const render = async ({ title, className }: RenderOptions = {}) => {
  const container = await AstroContainer.create()
  return await container.renderToString(LinkInternal, {
    props: {
      to: '/article',
      class: className,
    },
    slots: {
      default: 'Articles',
      title: title,
    },
  })
}

test('that it has a data-link of internal', async () => {
  expect(link).toContain('data-link="internal"')
})

test('that it has a data-astro-prefetch', async () => {
  expect(link).toContain('data-astro-prefetch="hover"')
})

test('that it targets self', async () => {
  expect(link).toContain('target="_self"')
})

test('that the href is set', async () => {
  expect(link).toContain('href="/article"')
})

test('that there is no title by default', async () => {
  expect(link).not.toContain('title')
})

test('that the slot is filled', async () => {
  expect(link).toContain('>Articles<')
})

test('that there is has a title when passed', async () => {
  const result = await render({ title: 'Title' })
  expect(result).not.toContain('title="Title"')
})

test('that class is set', async () => {
  const result = await render({ className: 'test-class' })
  expect(result).toContain('test-class')
})
