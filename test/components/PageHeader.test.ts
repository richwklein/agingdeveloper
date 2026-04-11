import PageHeader from '@components/PageHeader.astro'
import { getDefaultSite } from '@utils/site'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeAll, describe, expect, test } from 'vitest'

describe('pageHeader', () => {
  let site: CollectionEntry<'site'>

  beforeAll(async () => {
    site = await getDefaultSite()
  })

  const render = async () => {
    const container = await AstroContainer.create()
    return await container.renderToString(PageHeader, {
      props: { site },
    })
  }

  test('renders the site brand and global search', async () => {
    const html = await render()

    expect(html).toContain(`href="/"`)
    expect(html).toContain(site.data.title)
    expect(html).toContain(site.data.tagline)
    expect(html).toContain('aria-label="Open search"')
    expect(html).toContain('<typeahead-search')
  })

  test('uses a hamburger below lg and keeps the inline search from lg up', async () => {
    const html = await render()

    expect(html).toContain('lg:hidden')
    expect(html).toContain('hidden self-center lg:block')
    expect(html).toContain('flex items-center')
    expect(html).toContain('flex min-w-0 flex-1 items-center')
    expect(html).toContain('relative ml-auto lg:hidden')
    expect(html).toContain('ml-auto hidden self-center lg:block lg:w-80 lg:shrink-0 xl:w-[28rem]')
    expect(html).toContain('w-[min(20rem,calc(100vw-2rem))]')
    expect(html).toContain('bg-white/10')
    expect(html).toContain('text-primary-contrast')
  })
})
