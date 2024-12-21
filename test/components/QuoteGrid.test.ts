import QuoteGrid from '@components/QuoteGrid.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeAll, describe, expect, test } from 'vitest'

describe('quoteGrid', () => {
  type RenderOptions = { className?: string }

  const quotes: CollectionEntry<'quote'>[] = [
    {
      id: '2e7e1215-5333-47e7-8b5c-d44afa2a2ad1',
      collection: 'quote',
      data: {
        text: 'No matter what happens, travel gives you a story to tell.',
        author: 'Jewish Proverb',
        chalked: new Date(),
      },
    },
    {
      id: 'bddc1c1d-7186-4d81-826a-334caece9c85',
      collection: 'quote',
      data: {
        text: 'Little by little, one travels far',
        author: 'J.R.R. Tolkien',
        chalked: new Date('2024-12-02'),
      },
    },
    {
      id: 'bc98a363-7f45-4018-a3a1-570400493f2d',
      collection: 'quote',
      data: {
        text: 'Health is not valued till sickness comes.',
        author: 'Thomas Fuller',
        chalked: new Date('2024-12-09'),
      },
    },
  ]
  let grid: string

  beforeAll(async () => {
    grid = await render()
  })

  const render = async ({ className }: RenderOptions = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(QuoteGrid, {
      props: {
        quotes: quotes,
        class: className,
      },
    })
  }

  test('that the grid is an ordered list', async () => {
    expect(grid).toContain('<ol>')
  })

  test('that the grid contains the quotes', async () => {
    quotes.forEach((quote) => {
      expect(grid).toContain(quote.data.text)
    })
  })

  test('that class is set', async () => {
    const result = await render({ className: 'test-class' })
    expect(result).toContain('test-class')
  })
})
