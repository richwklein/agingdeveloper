import { remarkReadTime } from '@utils/readTime'
import { describe, expect, test } from 'vitest'

describe('readTime', () => {
  test('readtime is set based on the passed in markdown', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'alpha beta gamma '.repeat(100) }],
        },
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'delta epsilon zeta '.repeat(100) }],
        },
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'eta theta iota '.repeat(100) }],
        },
      ],
    }

    const data: any = { astro: { frontmatter: {} } }

    remarkReadTime()(tree, { data })
    expect(data.astro.frontmatter.readTime).toBeDefined()
    expect(data.astro.frontmatter.readTime.text).toBe('5 min read')
    expect(data.astro.frontmatter.readTime.time).toBe(270000)
    expect(data.astro.frontmatter.readTime.words).toBe(900)
    expect(data.astro.frontmatter.readTime.minutes).toBe(4.5)
  })
})
