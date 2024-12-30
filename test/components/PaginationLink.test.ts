import PaginationLink from '@components/PaginationLink.astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, test } from 'vitest'

describe('paginationLink', () => {
  type RenderOptions = { link?: string; icon: string; title: string; className?: string }

  const render = async ({ link, icon, title, className }: RenderOptions) => {
    const container = await AstroContainer.create()
    return await container.renderToString(PaginationLink, {
      props: {
        link: link,
        icon: icon,
        title: title,
        class: className,
      },
    })
  }

  test('that a link produces a standard anchor with icon', async () => {
    const result = await render({
      link: '/page/2',
      icon: 'mdi:chevron-right',
      title: 'Next',
      className: 'test-class',
    })
    expect(result).toContain('test-class')
    expect(result).toContain(
      '<a data-link="internal" data-astro-prefetch="hover" target="_self" href="/page/2"'
    )
    expect(result).toContain(
      '<svg width="1em" height="1em" class="h-8 w-8" data-icon="mdi:chevron-right"'
    )
  })

  test('that no link creates a div with an icon', async () => {
    const result = await render({
      icon: 'mdi:chevron-right',
      title: 'Next',
      className: 'test-class',
    })
    expect(result).toContain('test-class')
    expect(result).toContain('<div class="block')
    expect(result).toContain(
      '<svg width="1em" height="1em" class="h-8 w-8" data-icon="mdi:chevron-right"'
    )
  })
})
