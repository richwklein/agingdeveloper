import slugify from '@sindresorhus/slugify'
import { type CollectionEntry, getCollection } from 'astro:content'
import { Feed } from 'feed'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

import { getArticles } from './article'
import { createAbsoluteUrl } from './misc'
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
 * @param baseUrl - The base url to construct absolute urls from.
 * @returns the feed object
 */
export const getFeed = async (baseUrl?: URL) => {
  const site = await getSite()
  const authors = await getCollection('author')
  const articles = await getArticles()

  // setup basic feed structure
  const feed = new Feed({
    title: site.data.title,
    description: site.data.tagline,
    id: createAbsoluteUrl('/', baseUrl),
    link: createAbsoluteUrl('/', baseUrl),
    image: createAbsoluteUrl(site.data.avatar.src.split('?')[0], baseUrl),
    favicon: createAbsoluteUrl(site.data.icon.src.split('?')[0], baseUrl),
    feedLinks: new Map(feedInfo.map(({ id, path }) => [id, createAbsoluteUrl(path, baseUrl)])),
    copyright: new Date().toISOString(),
  })

  feed.addCategory(site.data.category)

  // add the authors as contributors
  authors.map(({ id, data: { name, email } }: CollectionEntry<'author'>) => {
    return feed.addContributor({
      name: name,
      email: email,
      link: createAbsoluteUrl(`/author/${slugify(id)}`, baseUrl),
    })
  })

  // add an item for each article
  articles.map((article) => {
    const author = authors.filter(
      (author: CollectionEntry<'author'>) => author.id == article.data.author.id
    )[0]

    const articleUrl = createAbsoluteUrl(`/article/${article.slug}`, baseUrl)

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
          link: createAbsoluteUrl(`/author/${slugify(author.id)}`, baseUrl),
        },
      ],
      image: {
        url: createAbsoluteUrl(article.data.featured.image.src.split('?')[0], baseUrl),
      },
      content: sanitizeHtml(parser.render(article.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
    })
  })

  return feed
}
