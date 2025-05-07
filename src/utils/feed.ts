import { getImage } from 'astro:assets'
import { type CollectionEntry, getCollection } from 'astro:content'
import { Feed } from 'feed'
import MarkdownIt from 'markdown-it'
import mime from 'mime'
import sanitizeHtml from 'sanitize-html'

import { getArticles } from './article'
import { buildUrl } from './misc'
import { getDefaultSite } from './site'

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
  const site = await getDefaultSite()
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

  // map of image urls that can be replaced in the content
  const imageUrls = await buildImageUrls()

  // add an item for each article
  articles.map((article) => {
    const author = authors.filter(
      (author: CollectionEntry<'author'>) => author.id == article.data.author.id
    )[0]

    const articleUrl = buildUrl(`/article/${article.id}`, site.data.origin).href

    // convert the image path to something that can be looked up in the imageUrls map
    const imagePath = article.data.featured.image.src
      .split('/article/')[1]
      .split('?')[0]
      .replace(/^(\d{4})\/([^/]+)/, (_, year, rest) => {
        return `${year}-${rest}`
      })
    const imageSrc = imageUrls.get(imagePath) || article.data.featured.image.src
    console.log('imageSrc', imageSrc)

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
        url: escapeXmlAttr(buildUrl(imageSrc, site.data.origin).href),
        type: mime.getType(imageSrc.split('?')[0]) || undefined,
      },
      content: sanitizeHtml(parser.render(article.body || ''), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        transformTags: {
          img: (tagName, attribs) => {
            const { src } = attribs
            let imageSrc = src
            if (!src.startsWith('./')) {
              const imagePath = `${article.id}/${src.replace(/^\.\//, '')}`
              imageSrc = imageUrls.get(imagePath) || src
            }

            return {
              tagName,
              attribs: {
                ...attribs,
                src: buildUrl(imageSrc, site.data.origin).href,
              },
            }
          },
          a: (tagName, attribs) => {
            const { href } = attribs
            return {
              tagName,
              attribs: {
                ...attribs,
                href: buildUrl(href, articleUrl).href,
              },
            }
          },
        },
      }),
    })
  })

  return feed
}

/**
 * Build a map of Image Urls
 *
 * This function will build a map of image urls for all images in the content directory.
 * The keys will be the relative file path to the image starting after the article folder,
 * and the values will be the relative url to the image.
 *
 * @returns a Map of image urls
 */
const buildImageUrls = async (): Promise<Map<string, string>> => {
  const imageGlobs = import.meta.glob<{ default: ImageMetadata }>(
    `/src/content/article/**/*.{jpeg,jpg,png,gif,svg,webp}`
  )

  const images: Map<string, string> = new Map()
  for (const key of Object.keys(imageGlobs)) {
    const src = key
      .split('?')[0]
      .replace(/^\/?src\/content\/article\//, '')
      .replace(/^(\d{4})\/([^/]+)/, (_, year, rest) => {
        return `${year}-${rest}`
      })
    const metadata = await imageGlobs[key]().then((result) => result.default)
    const image = await getImage({ src: metadata })
    console.log('image', image)
    images.set(src, image.src)
  }
  return images
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
