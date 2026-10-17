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
    expect(html).toContain('bi:book')
    expect(html).toContain('<svg')
  })

  test('renders the correct icon for movie', async () => {
    const html = await render('movie')
    expect(html).toContain('bi:film')
  })

  test('renders the correct icon for song', async () => {
    const html = await render('song')
    expect(html).toContain('bi:music-note')
  })

  test('renders the correct icon for speech', async () => {
    const html = await render('speech')
    expect(html).toContain('bi:mic')
  })

  test('renders the correct icon for letter', async () => {
    const html = await render('letter')
    expect(html).toContain('bi:envelope-open')
  })

  test('renders the correct icon for show', async () => {
    const html = await render('show')
    expect(html).toContain('bi:tv')
  })

  test('renders the correct icon for play', async () => {
    const html = await render('play')
    expect(html).toContain('bi:ticket-perforated')
  })

  test('renders the correct icon for magazine', async () => {
    const html = await render('magazine')
    expect(html).toContain('bi:journal-richtext')
  })

  test('renders the correct icon for newspaper', async () => {
    const html = await render('newspaper')
    expect(html).toContain('bi:newspaper')
  })

  test('falls back to the "other" icon for unknown types', async () => {
    const html = await render('unknown-type')
    expect(html).toContain('bi:chat-quote')
  })

  test('that class is set', async () => {
    const result = await render('book', 'test-class')
    expect(result).toContain('test-class')
  })
})
