import LinkExternal from '@components/LinkExternal.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, expect, test } from 'vitest'

type RenderOptions = { title?: string; className?: string }
let link: string

beforeAll(async () => {
  link = await render()
})

const render = async ({ title, className }: RenderOptions = {}) => {
  const container = await AstroContainer.create()
  return await container.renderToString(LinkExternal, {
    props: {
      to: 'https://github.com',
      class: className,
    },
    slots: {
      default: 'Github',
      title: title,
    },
  })
}

test('that it has a data-link of external', async () => {
  expect(link).toContain('data-link="external"')
})

test('that it does not have prefetch', async () => {
  expect(link).not.toContain('data-astro-prefetch')
})

test('that the targets blank', async () => {
  expect(link).toContain('target="_blank"')
})

test('that the rel is set', async () => {
  expect(link).toContain('rel="noopener noreferrer"')
})

test('that the href is set', async () => {
  expect(link).toContain('href="https://github.com"')
})

test('that there is no title by default', async () => {
  expect(link).not.toContain('title')
})

test('that the slot is filled', async () => {
  expect(link).toContain('>Github<')
})

test('that there is has a title when passed', async () => {
  const result = await render({ title: 'Title' })
  expect(result).not.toContain('title="Title"')
})

test('that class is set', async () => {
  const result = await render({ className: 'test-class' })
  expect(result).toContain('test-class')
})
