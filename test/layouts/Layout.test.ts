import { getDefaultSite } from '@utils/site'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'

describe('layout', () => {
  type RenderOptions = {
    deployContext?: string
    analyticsTrackingId?: string
    seoSlot?: string
    defaultSlot?: string
  }

  let site: CollectionEntry<'site'>

  beforeAll(async () => {
    site = await getDefaultSite()
  })

  afterEach(() => {
    vi.doUnmock('astro:env/client')
    vi.doUnmock('astro:env/server')
    vi.resetModules()
  })

  const render = async ({
    deployContext = 'dev',
    analyticsTrackingId = '',
    seoSlot = '<meta name="description" content="SEO slot description" />',
    defaultSlot = '<p>Layout body content</p>',
  }: RenderOptions = {}) => {
    vi.resetModules()
    vi.doMock('astro:env/client', () => ({
      ANALYTICS_TRACKING_ID: analyticsTrackingId,
    }))
    vi.doMock('astro:env/server', () => ({
      DEPLOY_CONTEXT: deployContext,
    }))

    const Layout = (await import('@layouts/Layout.astro')).default
    const container = await AstroContainer.create()

    return await container.renderToString(Layout, {
      props: { site },
      slots: {
        seo: seoSlot,
        default: defaultSlot,
      },
    })
  }

  test('renders the layout shell and named slots', async () => {
    const html = await render()

    expect(html).toContain('<html lang="en">')
    expect(html).toContain(`<meta name="theme-color" content="${site.data.theme}">`)
    expect(html).toContain('<link rel="manifest" href="/site.webmanifest">')
    expect(html).toContain('<link rel="sitemap" href="/sitemap-index.xml">')
    expect(html).toContain('<link rel="alternate" type="application/xml"')
    expect(html).toContain('href="http://localhost:4321/rss.xml"')
    expect(html).toContain('href="http://localhost:4321/atom.xml"')
    expect(html).toContain('href="http://localhost:4321/feed.json"')
    expect(html).toContain('<meta name="description" content="SEO slot description" />')
    expect(html).toContain('<main class="container mx-auto px-4 xl:max-w-(--breakpoint-xl)"')
    expect(html).toContain('<p>Layout body content</p>')
  })

  test('does not inject analytics when deploy context is not production', async () => {
    const html = await render({
      deployContext: 'deploy-preview',
      analyticsTrackingId: 'G-TEST123',
    })

    expect(html).not.toContain('https://www.googletagmanager.com/gtag/js')
    expect(html).not.toContain(`gtag('config', "G-TEST123");`)
  })

  test('injects analytics scripts in production when a tracking id is configured', async () => {
    const html = await render({
      deployContext: 'production',
      analyticsTrackingId: 'G-TEST123',
    })

    expect(html).toContain(
      '<script async src="https://www.googletagmanager.com/gtag/js?id=G-TEST123"></script>'
    )
    expect(html).toContain('window.dataLayer = window.dataLayer || [];')
    expect(html).toContain(`gtag('config', "G-TEST123");`)
  })

  test('does not inject analytics in production when the tracking id is empty', async () => {
    const html = await render({
      deployContext: 'production',
      analyticsTrackingId: '',
    })

    expect(html).not.toContain('https://www.googletagmanager.com/gtag/js')
    expect(html).not.toContain('window.dataLayer = window.dataLayer || [];')
  })
})
