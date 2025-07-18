import { DEFAULT_SITE_ID, getDefaultSite, getSiteById } from '@utils/site'
import { describe, expect, test } from 'vitest'

describe('getDefaultSite', () => {
  test('that it returns the site defined by the default id', async () => {
    const site = await getDefaultSite()
    expect(site).toBeDefined()
    expect(site.id).toBe(DEFAULT_SITE_ID)
  })
})

describe('getSiteById', () => {
  test('that it returns the site by id', async () => {
    const site = getSiteById('mock-site-1')
    expect(site).toBeDefined()
  })

  test('that it throws if site is not found', async () => {
    await expect(getSiteById('nonexistent')).rejects.toThrow('Site nonexistent is required')
  })

  test.todo('that it replaces the origin on local')
})
