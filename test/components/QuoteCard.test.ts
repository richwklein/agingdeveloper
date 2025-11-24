import QuoteCard from '@components/QuoteCard.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeAll, describe, expect, test } from 'vitest'

describe('quoteCard', () => {
  type RenderOptions = { className?: string }

  let quote: CollectionEntry<'quote'>
  let card: string

  beforeAll(async () => {
    quote = {
      id: '2e7e1215-5333-47e7-8b5c-d44afa2a2ad1',
      collection: 'quote',
      data: {
        text: 'No matter what happens, travel gives you a story to tell.',
        author: 'Jewish Proverb',
        chalked: new Date(),
      },
    }

    card = await render()
  })

  const render = async ({ className }: RenderOptions = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(QuoteCard, {
      props: {
        quote: quote,
        class: className,
      },
    })
  }

  test('that the card contains the text', async () => {
    expect(card).toContain(`${quote.data.text}</blockquote>`)
  })

  test('that the card contains the author', async () => {
    expect(card).toContain(`&mdash;&nbsp;${quote.data.author}`)
  })

  test('that the card contains the chalked date', async () => {
    expect(card).toContain(`<time datetime="${quote.data.chalked.toISOString()}"`)
  })

  test('that the card does not include source when absent', async () => {
    expect(card).not.toContain('from')
  })

  test('that the card contains source title and type when provided', async () => {
    const sourceQuote: CollectionEntry<'quote'> = {
      ...quote,
      data: {
        ...quote.data,
        source: {
          title: 'Garden Spells',
          type: 'book',
          year: 2007,
        },
      },
    }

    const container = await AstroContainer.create()
    const html = await container.renderToString(QuoteCard, {
      props: { quote: sourceQuote },
    })

    expect(html).toContain('from')
    expect(html).toContain('Garden Spells')
    expect(html).toContain('2007')
  })

  test('that class is set', async () => {
    const result = await render({ className: 'test-class' })
    expect(result).toContain('test-class')
  })
})
