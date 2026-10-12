import { renderSearchResultItem } from '@utils/searchResult'
import { describe, expect, test } from 'vitest'

describe('renderSearchResultItem', () => {
  const html = renderSearchResultItem({
    pathname: '/article/example',
    frontmatter: {
      title: 'Example Article',
      description: 'An example',
      category: 'testing',
      tags: ['example'],
    },
  })

  test('that the link and title are rendered', () => {
    expect(html).toContain('href="/article/example"')
    expect(html).toContain('>Example Article</a>')
  })

  test('that the highlight uses theme tokens', () => {
    expect(html).toContain('hover:bg-card-main')
    expect(html).toContain('focus:bg-card-main')
    expect(html).not.toMatch(/stone-|gray-|bg-white/)
  })

  test('that focus shows an inset ring', () => {
    expect(html).toContain('focus:ring-2')
    expect(html).toContain('focus:ring-inset')
    expect(html).toContain('focus:ring-focus-main')
  })
})
