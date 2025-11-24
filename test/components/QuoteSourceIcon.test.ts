import QuoteSourceIcon from '@components/QuoteSourceIcon.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, test } from 'vitest'

describe('quoteSourceIcon', () => {
  const render = async (type: string, className?: string) => {
    const container = await AstroContainer.create()
    return await container.renderToString(QuoteSourceIcon, { props: { type, class: className } })
  }

  test('renders the correct icon for book', async () => {
    const html = await render('book')
    expect(html).toContain('mdi:book-open-variant-outline')
    expect(html).toContain('astro-icon')
  })

  test('renders the correct icon for movie', async () => {
    const html = await render('movie')
    expect(html).toContain('mdi:movie-open-outline')
  })

  test('renders the correct icon for song', async () => {
    const html = await render('song')
    expect(html).toContain('mdi:music-note-outline')
  })

  test('renders the correct icon for speech', async () => {
    const html = await render('speech')
    expect(html).toContain('mdi:microphone-outline')
  })

  test('renders the correct icon for letter', async () => {
    const html = await render('letter')
    expect(html).toContain('mdi:email-open-outline')
  })

  test('renders the correct icon for show', async () => {
    const html = await render('show')
    expect(html).toContain('mdi:television-classic')
  })

  test('renders the correct icon for play', async () => {
    const html = await render('play')
    expect(html).toContain('mdi:comedy')
  })

  test('falls back to the "other" icon for unknown types', async () => {
    const html = await render('unknown-type')
    expect(html).toContain('mdi:star-four-points-outline')
  })

  test('that class is set', async () => {
    const result = await render('book', 'test-class')
    expect(result).toContain('test-class')
  })
})
