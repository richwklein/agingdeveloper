import ArticleTagGrid from '@components/ArticleTagGrid.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, test } from 'vitest'
type RenderOptions = { className?: string }

describe('articleTagGrid', () => {
  let tagGrid: string

  beforeAll(async () => {
    tagGrid = await render()
  })

  const render = async ({ className }: RenderOptions = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(ArticleTagGrid, {
      props: {
        tags: ['tag1', 'tag2', 'tag3'],
        category: 'category',
        class: className,
      },
    })
  }

  test('that it is a nav element', async () => {
    expect(tagGrid).toContain('<nav id="article-tags"')
  })

  test('that it is contains an ordered list', async () => {
    expect(tagGrid).toContain('</ol>')
  })

  test('that the category is linked', async () => {
    expect(tagGrid).toContain('href="/category/category"')
    expect(tagGrid).toContain('category</a>')
  })

  test('that it contains tag links', async () => {
    expect(tagGrid).toContain('href="/tag/tag1"')
    expect(tagGrid).toContain('tag1</a>')
    expect(tagGrid).toContain('href="/tag/tag2"')
    expect(tagGrid).toContain('tag2</a>')
    expect(tagGrid).toContain('href="/tag/tag3"')
    expect(tagGrid).toContain('tag3</a>')
  })

  test('that class is set', async () => {
    const result = await render({ className: 'test-class' })
    expect(result).toContain('test-class')
  })
})
