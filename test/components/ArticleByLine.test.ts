import ArticleByLine from '@components/ArticleByLine.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { getEntry } from 'astro:content'
import { beforeAll, expect, test } from 'vitest'

type RenderOptions = { className?: string }

const published = new Date()
const author = await getEntry('author', 'richwklein')
let byLine: string

beforeAll(async () => {
  byLine = await render()
})

const render = async ({ className }: RenderOptions = {}) => {
  const container = await AstroContainer.create()
  return await container.renderToString(ArticleByLine, {
    props: {
      author: author,
      published: published,
      class: className,
    },
  })
}

test('that it is an address element', async () => {
  expect(byLine).toContain('<address id="article-byline"')
})

test('that it links to the author', async () => {
  expect(byLine).toContain(`href="/author/${author.id}"`)
})

test('that the date is correct', async () => {
  expect(byLine).toContain(`<time datetime="${published.toISOString()}"`)
})

test('that class is set', async () => {
  const result = await render({ className: 'test-class' })
  expect(result).toContain('test-class')
})
