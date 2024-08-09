import ArticleByLine from '@components/ArticleByLine.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { getEntry, type CollectionEntry } from 'astro:content'
import { beforeAll, describe, expect, test } from 'vitest'

type RenderOptions = { className?: string }

describe('ArticleByLine', () => {
  const published = new Date()
  let byLine: string
  let author: CollectionEntry<'author'>

  beforeAll(async () => {
    author = await getEntry('author', 'richwklein')
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
})
