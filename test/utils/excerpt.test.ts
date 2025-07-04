import { remarkExcerpt } from '@utils/excerpt'
import { describe, expect, test } from 'vitest'

describe('excerpt', () => {
  test('should set excerpt to the first 280 characters of the page text', () => {
    // Construct a simple mdast tree with a paragraph and text node
    const tree = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'a'.repeat(300) }],
        },
      ],
    }

    const data: any = { astro: { frontmatter: {} } }

    remarkExcerpt()(tree, { data })
    expect(data.astro.frontmatter.excerpt).toBe('a'.repeat(280))
  })
})
