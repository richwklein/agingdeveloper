import Pagniation from '@components/Pagniation.astro'
import type { Page } from 'astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, test } from 'vitest'

describe('pagination', () => {
  const page: Page = {
    data: [],
    start: 0,
    end: 50,
    total: 98,
    currentPage: 2,
    size: 50,
    lastPage: 2,
    url: {
      current: '/page/2',
      prev: '/page/1',
      first: '/page/1',
      next: undefined,
      last: '/page/2',
    },
  }

  let pagination: string

  beforeAll(async () => {
    pagination = await render(page, 'test-class')
  })

  const render = async (page: Page, className?: string) => {
    const container = await AstroContainer.create()
    return await container.renderToString(Pagniation, {
      props: {
        page: page,
        class: className,
      },
    })
  }

  test('that it tells the current page', async () => {
    expect(pagination).toContain('<nav class="')
    expect(pagination).toContain('<ol class="flex')
  })

  test('that it is made up of a nav and ol', async () => {
    expect(pagination).toContain(`Page ${page.currentPage} of ${page.lastPage}`)
  })

  test('that there are links for each of the pages', async () => {
    expect(pagination).toContain(`href="${page.url.first}"`)
    expect(pagination).toContain(`href="${page.url.prev}"`)
    expect(pagination).toContain(`href="${page.url.last}"`)
  })

  test('that there all the icons are present', async () => {
    expect(pagination).toContain('data-icon="mdi:chevron-double-left"')
    expect(pagination).toContain('data-icon="mdi:chevron-left"')
    expect(pagination).toContain('data-icon="mdi:chevron-right"')
    expect(pagination).toContain('data-icon="mdi:chevron-double-right"')
  })

  test('that class is set', async () => {
    expect(pagination).toContain('test-class')
  })
})
