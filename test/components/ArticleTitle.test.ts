import ArticleTitle from '@components/ArticleTitle.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, test } from 'vitest'

describe('articleTitle', () => {
  type RenderOptions = { className?: string }

  let title: string

  beforeAll(async () => {
    title = await render()
  })

  const render = async ({ className }: RenderOptions = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(ArticleTitle, {
      props: {
        title: 'Title',
        description: 'Description',
        class: className,
      },
    })
  }
  test('that it contains correct tags', async () => {
    expect(title).toContain('<hgroup')
    expect(title).toContain('<h2')
    expect(title).toContain('<h3')
  })

  test('that it contains the title', async () => {
    expect(title).toContain('>Title</h2>')
  })

  test('that it contains the number of words', async () => {
    expect(title).toContain('>Description</h3>')
  })

  test('that class is set', async () => {
    const result = await render({ className: 'test-class' })
    expect(result).toContain('test-class')
  })
})
