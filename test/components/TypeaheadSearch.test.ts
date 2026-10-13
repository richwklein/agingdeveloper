import TypeaheadSearch from '@components/TypeaheadSearch.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, test } from 'vitest'

describe('typeaheadSearch', () => {
  type RenderOptions = {
    variant?: 'default' | 'header'
    placeholder?: string
    ariaLabel?: string
    className?: string
  }

  const render = async ({ variant, placeholder, ariaLabel, className }: RenderOptions = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(TypeaheadSearch, {
      props: {
        variant,
        placeholder,
        ariaLabel,
        class: className,
      },
    })
  }

  test('renders the default search input and results list', async () => {
    const html = await render()

    expect(html).toContain('<typeahead-search')
    expect(html).toContain('data-search-input')
    expect(html).toContain('placeholder="Search..."')
    expect(html).toContain('aria-label="Search articles"')
    expect(html).toContain('data-search-result')
    expect(html).toContain('border-stroke-light')
    expect(html).toContain('focus:ring-focus-main')
    expect(html).not.toContain('ring-blue-500')
  })

  test.each(['default', 'header'] as const)(
    'renders the %s results list with theme tokens',
    async (variant) => {
      const html = await render({ variant })
      const list = html.match(/<ul[^>]*data-search-result[^>]*>/)?.[0] ?? ''

      expect(list).toContain('dark:bg-primary-dark')
      expect(list).toContain('dark:border-stroke-main')
      expect(list).toContain('text-fg-light')
      expect(list).toContain('focus:ring-focus-main')
      expect(list).not.toMatch(/stone-|gray-|bg-white/)
    }
  )

  test('renders the header variant styling and custom props', async () => {
    const html = await render({
      variant: 'header',
      placeholder: 'Search articles...',
      ariaLabel: 'Search articles from the site',
      className: 'test-class',
    })

    expect(html).toContain('placeholder="Search articles..."')
    expect(html).toContain('aria-label="Search articles from the site"')
    expect(html).toContain('bg-white/10')
    expect(html).toContain('text-primary-contrast')
    expect(html).toContain('test-class')
    expect(html).toContain('focus:ring-secondary-light')
  })
})
