import AuthorJson from '@components/seo/AuthorJson.astro'
import { getDefaultAuthor } from '@utils/author'
import { getDefaultSite } from '@utils/site'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeAll, describe, expect, test } from 'vitest'

describe('authorJson', () => {
  let author: CollectionEntry<'author'>
  let site: CollectionEntry<'site'>

  let linkedData: string

  beforeAll(async () => {
    site = await getDefaultSite()
    author = await getDefaultAuthor()

    linkedData = await render(site, author)
  })

  const render = async (site: CollectionEntry<'site'>, author: CollectionEntry<'author'>) => {
    const container = await AstroContainer.create()
    return await container.renderToString(AuthorJson, {
      props: {
        site: site,
        author: author,
        writeCount: 25,
      },
    })
  }

  test('that it contains an ld+json', async () => {
    expect(linkedData).toContain('<script type="application/ld+json">')
  })

  test('that it contains a profile page', async () => {
    expect(linkedData).toContain('"@type":"ProfilePage"')
  })
  test('that it contains a person', async () => {
    expect(linkedData).toContain('"mainEntity":{')
    expect(linkedData).toContain('"@type":"Person"')
  })

  test('that it contains the date created', async () => {
    expect(linkedData).toContain(`"dateCreated":"${author.data.published.toISOString()}"`)
  })

  test('that it contains the date modified', async () => {
    expect(linkedData).toContain(`"dateModified":"${author.data.published.toISOString()}"`)
  })

  test('that it contains the date modified when different from published', async () => {
    const modifiedAuthor = await getDefaultAuthor()
    modifiedAuthor.data.modified = new Date('2024-12-21')
    const linkedData = await render(site, modifiedAuthor)

    expect(linkedData).toContain(`"dateModified":"${modifiedAuthor.data.modified?.toISOString()}"`)
  })

  test('that it contains the author id', async () => {
    expect(linkedData).toContain(`"identifier":"${author.id}"`)
  })

  test('that it contains the author name', async () => {
    expect(linkedData).toContain(`"name":"${author.data.name}"`)
  })

  test('that it contains the write count', async () => {
    expect(linkedData).toContain('"interactionType":"https://schema.org/WriteAction"')
    expect(linkedData).toContain('"userInteractionCount":25')
  })

  test.todo('that it contains the author avatar')

  test('that it contains the author socials', async () => {
    expect(linkedData).toContain('"sameAs":[')
    author.data.socials?.forEach((social) => {
      expect(linkedData).toContain(`"${social.url}"`)
    })
  })
})
