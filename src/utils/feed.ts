import { getCollection } from 'astro:content'
import { getSite } from './site'
import { Feed } from 'feed'
import slugify from '@sindresorhus/slugify'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
import { getArticles } from './article'

const parser = new MarkdownIt()

export const feedInfo = [
  { id: 'rss', type: 'application/xml', path: '/rss.xml' },
  { id: 'atom', type: 'application/atom+xml', path: '/atom.xml' },
  { id: 'feed', type: 'application/json', path: '/feed.json' },
]

export const getFeed = async () => {
  const site = await getSite()
  const baseUrl = import.meta.env.SITE
  const authors = await getCollection('author')
  const articles = await getArticles()

  // setup basic feed structure
  const feed = new Feed({
    title: site.data.title,
    description: site.data.tagline,
    id: baseUrl,
    link: baseUrl,
    image: `${baseUrl}${site.data.avatar.src.split('?')[0]}`,
    favicon: `${baseUrl}${site.data.icon.src.split('?')[0]}`,
    feedLinks: new Map(feedInfo.map(({ id, path }) => [id, `${baseUrl}${path}`])),
    copyright: new Date().toISOString(),
  })

  feed.addCategory(site.data.category)

  // add the authors as contributors
  authors.map(({ id, data: { name, email } }) => {
    return feed.addContributor({
      name: name,
      email: email,
      link: `${baseUrl}/author/${slugify(id)}`,
    })
  })

  // add an item for each article
  articles.map((article) => {
    const author = authors.filter((author) => author.id == article.data.author.id)[0]

    return feed.addItem({
      title: article.data.title,
      id: `${baseUrl}/article/${article.slug}`,
      link: `${baseUrl}/article/${article.slug}`,
      description: article.data.description,
      date: article.data.modified || article.data.published,
      published: article.data.published,
      author: [
        {
          name: author.data.name,
          email: author.data.email,
          link: `${baseUrl}/author/${slugify(author.id)}`,
        },
      ],
      image: {
        url: `${baseUrl}${article.data.featured.image.src.split('?')[0]}`,
      },
      content: sanitizeHtml(parser.render(article.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
    })
  })

  return feed
}
