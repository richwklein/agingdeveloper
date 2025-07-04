import { DEFAULT_AUTHOR_ID, getAuthorById, getDefaultAuthor } from '@utils/author'
import { describe, expect, test } from 'vitest'

describe('getDefaultAuthor', () => {
  test('that it returns the author defined by the default id', async () => {
    const author = await getDefaultAuthor()
    expect(author).toBeDefined()
    expect(author.id).toBe(DEFAULT_AUTHOR_ID)
  })
})

describe('getAuthorById', () => {
  test('that it returns the author by id', async () => {
    const author = getAuthorById('mock-author-1')
    expect(author).toBeDefined()
  })

  test('that it throws if author is not found', async () => {
    await expect(getAuthorById('nonexistent')).rejects.toThrow('Author nonexistent is required')
  })
})
