import ArticleTimeToRead from '@components/ArticleTimeToRead.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, expect, test } from 'vitest'

type RenderOptions = { className?: string }
let ttr: string

beforeAll(async () => {
  ttr = await render()
})

const render = async ({ className }: RenderOptions = {}) => {
  const container = await AstroContainer.create()
  return await container.renderToString(ArticleTimeToRead, {
    props: {
      minutes: 10,
      words: 100,
      class: className,
    },
  })
}
test('that it contains small tags', async () => {
  expect(ttr).toContain('<small')
})

test('that it contains the time to read', async () => {
  expect(ttr).toContain('>10 min read<')
})

test('that it contains the number of words', async () => {
  expect(ttr).toContain('>100 words<')
})

test('that class is set', async () => {
  const result = await render({ className: 'test-class' })
  expect(result).toContain('test-class')
})
