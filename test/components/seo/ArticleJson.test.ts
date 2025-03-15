import ArticleJson from '@components/seo/ArticleJson.astro'
import { getArticleById } from '@utils/article'
import { getDefaultAuthor } from '@utils/author'
import { buildUrl } from '@utils/misc'
import { getDefaultSite } from '@utils/site'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import { beforeAll, describe, expect, test } from 'vitest'

describe('articleJson', () => {
  let article: CollectionEntry<'article'> | undefined
  let author: CollectionEntry<'author'>
  let site: CollectionEntry<'site'>

  let linkedData: string

  beforeAll(async () => {
    site = await getDefaultSite()
    article = await getArticleById('mock-article-1')
    author = await getDefaultAuthor()

    linkedData = await render(site, author, article)
  })

  const render = async (
    site: CollectionEntry<'site'>,
    author: CollectionEntry<'author'>,
    article?: CollectionEntry<'article'>
  ) => {
    if (!article) {
      linkedData = ''
    }

    const container = await AstroContainer.create()
    return await container.renderToString(ArticleJson, {
      props: {
        site: site,
        article: article,
        author: author,
        wordCount: 100,
      },
    })
  }

  test('that it contains an ld+json', async () => {
    expect(linkedData).toContain('<script type="application/ld+json">')
  })

  test('that it contains a blog posting', async () => {
    expect(linkedData).toContain('"@type":"BlogPosting"')
  })

  test('that it contains the title', async () => {
    expect(linkedData).toContain(`"headline":"${article?.data.title}"`)
  })

  test('that it contains the description', async () => {
    expect(linkedData).toContain(`"description":"${article?.data.description}"`)
  })

  test('that it contains an image url', async () => {
    if (!article) {
      throw new Error('Article is not defined')
    }

    const imageUrl = buildUrl(article?.data.featured.image.src, site.data.origin)
    expect(linkedData).toContain(`"image":["${imageUrl.href}"]`)
  })

  test('that it contains the date published', async () => {
    expect(linkedData).toContain(`"datePublished":"${article?.data.published.toISOString()}"`)
  })

  test('that it contains the date modified', async () => {
    expect(linkedData).toContain(`"dateModified":"${article?.data.published.toISOString()}"`)
  })

  test('that it contains the date modified when different from published', async () => {
    const modifiedArticle = await getArticleById('mock-article-with-modified')
    const linkedData = await render(site, author, modifiedArticle)

    expect(linkedData).toContain(
      `"dateModified":"${modifiedArticle?.data.modified?.toISOString()}"`
    )
  })

  test('that it contains an author', async () => {
    expect(linkedData).toContain('"author":[')
    expect(linkedData).toContain('"@type":"Person"')
  })

  test('that it contains the author id', async () => {
    expect(linkedData).toContain(`"identifier":"${author.id}"`)
  })

  test('that it contains the author name', async () => {
    expect(linkedData).toContain(`"name":"${author.data.name}"`)
  })

  test('that it contains the author url', async () => {
    expect(linkedData).toContain(`"url":"${buildUrl(`/author/${author.id}`, site.data.origin)}"`)
  })

  test('that it contains the word count', async () => {
    expect(linkedData).toContain(`"wordCount":100`)
  })

  test('that it contains the section', async () => {
    expect(linkedData).toContain(`"articleSection":"${article?.data.category}"`)
  })

  test('that it contains the tags', async () => {
    const tags = `["${article?.data.tags.join('","')}"]`
    expect(linkedData).toContain(`"keywords":${tags}`)
  })
})
