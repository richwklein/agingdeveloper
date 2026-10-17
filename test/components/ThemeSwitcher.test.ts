import ThemeSwitcher from '@components/ThemeSwitcher.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, test } from 'vitest'

describe('themeSwitcher', () => {
  const render = async () => {
    const container = await AstroContainer.create()
    return await container.renderToString(ThemeSwitcher)
  }

  test('renders a dropdown with system, light, and dark options', async () => {
    const html = await render()

    expect(html).toContain('<theme-switcher')
    expect(html).toContain('data-theme-select')
    expect(html).toContain('aria-label="Theme"')
    expect(html).toContain('option value="system"')
    expect(html).toContain('option value="light"')
    expect(html).toContain('option value="dark"')
    expect(html).toContain('>System</option>')
    expect(html).toContain('>Light</option>')
    expect(html).toContain('>Dark</option>')
  })

  test('renders state icons and dropdown chevron', async () => {
    const html = await render()

    expect(html).toContain('data-theme-icon="system"')
    expect(html).toContain('data-theme-icon="light"')
    expect(html).toContain('data-theme-icon="dark"')
    expect(html).toContain('bi:display')
    expect(html).toContain('bi:sun')
    expect(html).toContain('bi:moon')
    expect(html).toContain('bi:chevron-down')
  })
})
