import { getCollection } from "astro:content"
import { getSite } from "./site"
import { Feed } from "feed"
import slugify from "@sindresorhus/slugify"
import sanitizeHtml from "sanitize-html"
import MarkdownIt from "markdown-it"
import { getArticles } from "./article"

const parser = new MarkdownIt()

export const feedInfo = [
  { id: "rss", type: "application/xml", path: "/rss.xml" },
  { id: "atom", type: "application/atom+xml", path: "/atom.xml" },
  { id: "feed", type: "application/json", path: "/feed.json" },
]

export const getFeed = async () => {
  const siteEntry = await getSite()
  const site = siteEntry.data
  const baseUrl = import.meta.env.SITE
  const authorEntries = await getCollection("author")
  const articleEntries = await getArticles()

  // setup basic feed structure
  const feed = new Feed({
    title: site.title,
    description: site.tagline,
    id: baseUrl,
    link: baseUrl,
    language: site.lang,
    image: `${baseUrl}${site.avatar.src.split("?")[0]}`,
    favicon: `${baseUrl}${site.icon.src.split("?")[0]}`,
    feedLinks: new Map(feedInfo.map(({ id, path }) => [id, `${baseUrl}${path}`])),
    copyright: new Date().toISOString(),
  })

  feed.addCategory(site.category)

  // add the authors as contributors
  authorEntries.map(({ id, data: { name, email } }) => {
    return feed.addContributor({
      name: name,
      email: email,
      link: `${baseUrl}/author/${slugify(id)}`,
    })
  })

  // add an item for each article
  articleEntries.map((entry) => {
    const article = entry.data
    const authorEntry = authorEntries.filter((entry) => entry.id == article.author.id)[0]
    const author = authorEntry.data

    return feed.addItem({
      title: article.title,
      id: `${baseUrl}/article/${entry.slug}`,
      link: `${baseUrl}/article/${entry.slug}`,
      description: article.description,
      date: article.modified || article.published,
      published: article.published,
      author: [
        {
          name: author.name,
          email: author.email,
          link: `${baseUrl}/author/${slugify(authorEntry.id)}`,
        },
      ],
      image: {
        url: `${baseUrl}${article.featured.image.src.split("?")[0]}`,
      },
      content: sanitizeHtml(parser.render(entry.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })
  })

  return feed
}
