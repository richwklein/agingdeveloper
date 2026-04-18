import PageFooter from '@components/PageFooter.astro'
import { getDefaultSite } from '@utils/site'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeAll, describe, expect, test } from 'vitest'

describe('pageFooter', () => {
  let site: CollectionEntry<'site'>

  beforeAll(async () => {
    site = await getDefaultSite()
  })

  const render = async (className?: string) => {
    const container = await AstroContainer.create()
    return await container.renderToString(PageFooter, {
      props: { site, class: className },
    })
  }

  test('renders footer action buttons', async () => {
    const html = await render()

    expect(html).toContain('href="/rss.xml"')
    expect(html).toContain(`href="${site.data.repository}"`)
    expect(html).toContain(`title="${site.data.title} - RSS"`)
    expect(html).toContain(`title="${site.data.title} - Repository"`)
    expect(html).toContain('class="block rounded-full p-2')
    expect(html).toContain('hover:bg-card-main focus:bg-card-dark')
    expect(html).toContain('mdi:rss-feed')
    expect(html).toContain('mdi:github')
  })

  test('renders theme switcher in footer', async () => {
    const html = await render()

    expect(html).toContain('<theme-switcher')
  })

  test('renders copyright text with current year and site title', async () => {
    const html = await render()
    const year = new Date().getFullYear()

    expect(html).toContain(`text-center text-xs`)
    expect(html).toContain(`${year} ${site.data.title}`)
  })

  test('adds custom classes when provided', async () => {
    const html = await render('test-class')
    expect(html).toContain('test-class')
  })
})
