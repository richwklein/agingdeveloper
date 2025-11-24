import ArticleLicense from '@components/ArticleLicense.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, test } from 'vitest'

describe('articleLicense', () => {
  const render = async (props: Record<string, unknown> = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(ArticleLicense, { props })
  }

  test('renders the default CC BY-SA 4.0 license when none provided', async () => {
    const html = await render()

    expect(html).toContain('CC BY-SA 4.0')
    expect(html).toContain('Creative Commons Attribution-ShareAlike 4.0 International')
    expect(html).toContain('https://creativecommons.org/licenses/by-sa/4.0/')
    expect(html).toContain('mdi:creative-commons')
    expect(html).toContain('title="CC BY-SA 4.0"')
  })

  test('renders a custom license when provided', async () => {
    const html = await render({
      license: {
        name: 'MIT License',
        short: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
        icon: 'mdi:license',
      },
    })

    expect(html).toContain('MIT')
    expect(html).toContain('MIT License')
    expect(html).toContain('https://opensource.org/licenses/MIT')
    expect(html).toContain('mdi:license')
    expect(html).toContain('title="MIT"')
  })

  test('applies custom class names', async () => {
    const html = await render({ class: 'my-class' })
    expect(html).toContain('my-class')
  })
})
