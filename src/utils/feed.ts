import { type CollectionEntry, getCollection } from 'astro:content'
import { Feed } from 'feed'
import MarkdownIt from 'markdown-it'
import mime from 'mime'
import sanitizeHtml from 'sanitize-html'

import { getArticles } from './article'
import { buildUrl } from './misc'
import { getSite } from './site'

const parser = new MarkdownIt()

/**
 * Information about the various feeds the site supports
 */
export const feedInfo = [
  { id: 'rss', type: 'application/xml', path: '/rss.xml' },
  { id: 'atom', type: 'application/atom+xml', path: '/atom.xml' },
  { id: 'feed', type: 'application/json', path: '/feed.json' },
]

/**
 * Function for constructing a feed object to then render.
 *
 * @returns the feed object
 */
export const getFeed = async (): Promise<Feed> => {
  const site = await getSite()
  const authors = await getCollection('author')
  const articles = await getArticles()

  // setup basic feed structure
  const feed = new Feed({
    title: site.data.title,
    description: site.data.tagline,
    id: buildUrl('', site.data.origin).href,
    link: buildUrl('', site.data.origin).href,
    image: buildUrl(site.data.avatar.src, site.data.origin).href,
    favicon: buildUrl(site.data.icon.src, site.data.origin).href,
    feedLinks: new Map(feedInfo.map(({ id, path }) => [id, buildUrl(path, site.data.origin).href])),
    copyright: new Date().toISOString(),
  })

  feed.addCategory(site.data.category)

  // add the authors as contributors
  authors.map(({ id, data: { name, email } }: CollectionEntry<'author'>) => {
    return feed.addContributor({
      name: name,
      email: email,
      link: buildUrl(`/author/${id}`, site.data.origin).href,
    })
  })

  // add an item for each article
  articles.map((article) => {
    const author = authors.filter(
      (author: CollectionEntry<'author'>) => author.id == article.data.author.id
    )[0]

    const articleUrl = buildUrl(`/article/${article.id}`, site.data.origin).href
    return feed.addItem({
      title: article.data.title,
      id: articleUrl,
      link: articleUrl,
      description: article.data.description,
      date: article.data.modified || article.data.published,
      published: article.data.published,
      author: [
        {
          name: author.data.name,
          email: author.data.email,
          link: buildUrl(`/author/${author.id}`, site.data.origin).href,
        },
      ],
      image: {
        url: escapeXmlAttr(buildUrl(article.data.featured.image.src, site.data.origin).href),
        type: mime.getType(article.data.featured.image.src.split('?')[0]) || undefined,
      },
      content: sanitizeHtml(parser.render(article.body || ''), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
    })
  })

  return feed
}

/**
 * Method to escape xml attributes. This is needed for the image enclosure on the feed.
 *
 * @param unsafe - The unsafe string to escape.
 * @returns the escaped string.
 */
const escapeXmlAttr = (unsafe: string) => {
  return unsafe.replace(/[<>&'"]/g, (c: string) => {
    switch (c) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&apos;'
      case '"':
        return '&quot;'
      default:
        return c
    }
  })
}
