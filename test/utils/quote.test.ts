import { getLatestQuote, getQuotes } from '@utils/quote'
import { describe, expect, test } from 'vitest'

describe('getQuotes', () => {
  test('that it returns an array of quotes', async () => {
    const quotes = await getQuotes()
    expect(quotes).toHaveLength(4)
  })
  test('that the quotes are sorted by chalked date', async () => {
    const quotes = await getQuotes()
    expect(quotes).toHaveLength(4)
    expect(quotes[0].id).toBe('mock-quote-3')
    expect(quotes[1].id).toBe('mock-quote-4')
    expect(quotes[2].id).toBe('mock-quote-1')
    expect(quotes[3].id).toBe('mock-quote-2')
  })

  test('that an quote can be excluded', async () => {
    const quotes = await getQuotes(undefined, 'mock-quote-4')
    expect(quotes).toHaveLength(3)
    expect(quotes[0].id).toBe('mock-quote-3')
    expect(quotes[1].id).toBe('mock-quote-1')
  })

  test('that an invalid id does not exclude anything', async () => {
    const quotes = await getQuotes(undefined, 'nonexistent')
    expect(quotes).toHaveLength(4)
  })

  test('that the quotes are limited to the limit provided', async () => {
    const quotes = await getQuotes(2)
    expect(quotes).toHaveLength(2)
  })
})

describe('getLatestQuote', () => {
  test('that it returns the most recent quote', async () => {
    const latest = await getLatestQuote()
    expect(latest).toBeDefined()
    expect(latest.id).toBe('mock-quote-3')
  })
})
