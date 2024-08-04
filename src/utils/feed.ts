import { getCollection } from "astro:content"
import { getSite } from "./site"
import { Feed } from "feed"
import slugify from "@sindresorhus/slugify"
import sanitizeHtml from "sanitize-html"
import MarkdownIt from "markdown-it"

const parser = new MarkdownIt()

export const feedPaths = [
  { id: "rss", path: "/rss.xml" },
  { id: "atom", path: "/atom.xml" },
  { id: "json", path: "/feed.json" },
]

export const getFeed = async () => {
  const siteEntry = await getSite()
  const site = siteEntry.data
  const baseUrl = import.meta.env.SITE
  const authorEntries = await getCollection("author")
  const articleEntries = await getCollection("article")

  // setup basic feed structure
  const feed = new Feed({
    title: site.title,
    description: site.tagline,
    id: baseUrl,
    link: baseUrl,
    language: site.lang,
    feedLinks: new Map(feedPaths.map(({ id, path }) => [id, `${baseUrl}${path}`])),
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
      id: entry.slug,
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
      content: sanitizeHtml(parser.render(entry.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })
  })

  return feed
}
