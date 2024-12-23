import { getCategories, getCategoriesWithCount, getTags, getTagsWithCount } from '@utils/tag'
import { describe, expect, test } from 'vitest'

describe('getCategories', () => {
  test('that categories are returned in alpha order', async () => {
    const categories = await getCategories()
    expect(categories).toHaveLength(3)
    expect(categories[0]).toBe('mock-category-1')
    expect(categories[1]).toBe('mock-category-2')
    expect(categories[2]).toBe('mock-category-3')
  })
})

describe('getCategoriesWithCount', () => {
  test('that categories are returned with counts of articles in each', async () => {
    const results = await getCategoriesWithCount()
    expect(results.tags.get('mock-category-1')).toBe(2)
    expect(results.tags.get('mock-category-2')).toBe(1)
    expect(results.tags.get('mock-category-3')).toBe(2)
    expect(results.total).toBe(5)
  })
})

describe('getTags', () => {
  test('that tags are returned in alpha order', async () => {
    const categories = await getTags()
    expect(categories).toHaveLength(5)
    expect(categories[0]).toBe('mock-tag-1')
    expect(categories[1]).toBe('mock-tag-2')
    expect(categories[2]).toBe('mock-tag-3')
    expect(categories[3]).toBe('mock-tag-4')
  })
})

describe('getTagsWithCount', () => {
  test('that tags are returned with counts of articles in each', async () => {
    const results = await getTagsWithCount()
    expect(results.tags.get('mock-tag-1')).toBe(4)
    expect(results.tags.get('mock-tag-2')).toBe(4)
    expect(results.tags.get('mock-tag-3')).toBe(4)
    expect(results.tags.get('mock-tag-4')).toBe(2)
    expect(results.total).toBe(5)
  })
})
