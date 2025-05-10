import type { GetImageResult } from 'astro'
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

  // load the images for the feed
  const imageCollection = new FeedImageCollection(site)
  await imageCollection.loadImages()

  const feed: Feed = new Feed({
    title: site.data.title,
    description: site.data.tagline,
    id: buildUrl('', site.data.origin).href,
    link: buildUrl('', site.data.origin).href,
    image: imageCollection.getImageSrc(site.data.avatar.src),
    favicon: imageCollection.getImageSrc(site.data.icon.src),
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

    const articlePath = `/article/${article.id}`
    const articleUrl = buildUrl(articlePath, site.data.origin).href

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
        url: escapeXmlAttr(
          imageCollection.getArticleImageSrc(article.data.featured.image.src, articlePath)
        ),
        type: mime.getType(article.data.featured.image.src.split('?')[0]) || undefined,
      },
      content: sanitizeHtml(parser.render(article.body || ''), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        transformTags: {
          img: (tagName, attribs) => {
            const { src } = attribs
            const result = {
              tagName,
              attribs: {
                ...attribs,
                src: imageCollection.getArticleImageSrc(src, articlePath),
              },
            }
            return result
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
 * Method to escape xml attributes. This is needed for the image enclosure on the feed.
 *
 * @param unsafe - The unsafe string to escape.
 * @returns the escaped string.
 */
const escapeXmlAttr = (unsafe: string): string => {
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

/**
 * Class to access images for the feed.
 *
 * This class will load all images from the content/article directory and the site entry.
 * The images will be stored in a map with a normalized key that can be looked up based
 * on the src supplied.
 */
class FeedImageCollection {
  private images: Map<string, GetImageResult> = new Map()
  private site: CollectionEntry<'site'>
  private cwd: string

  constructor(site: CollectionEntry<'site'>) {
    this.site = site
    this.cwd = process.cwd()
  }

  /**
   * Load the images for later retrieval.
   */
  async loadImages() {
    const imageGlobs = import.meta.glob<{ default: ImageMetadata }>(
      '/src/content/article/**/*.{jpeg,jpg,png,gif,svg,webp}'
    )

    // first load the images from the site entry
    this.images.set(
      this.normalizeKey(this.site.data.avatar.src),
      await getImage({ src: this.site.data.avatar })
    )
    this.images.set(
      this.normalizeKey(this.site.data.icon.src),
      await getImage({ src: this.site.data.icon })
    )

    // load all the images that are in the article directory
    for (const key of Object.keys(imageGlobs)) {
      const metadata = await imageGlobs[key]().then((result) => result.default)
      this.images.set(this.normalizeKey(key), await getImage({ src: metadata }))
    }
  }

  /**
   * Get the absolute image src for an image referenced by an article.
   *
   * This will return the image url for the given src. If the image isn't found the
   * original src is returned.
   *
   * @param src - The src to lookup.
   * @param articlePath - The path to the article
   * @returns The image url or empty if not found.
   */
  getArticleImageSrc(src: string, articlePath: string): string {
    if (src.startsWith('http') || src.startsWith('data')) {
      return src
    }

    let key = this.normalizeKey(src).replace(/^.\//, '')
    key = key.startsWith(articlePath) ? key : `${articlePath}/${key}`
    const image = this.images.get(key)
    if (image) {
      return buildUrl(image.src, this.site.data.origin).href
    } else if (src.startsWith('/_astro/')) {
      return buildUrl(src, this.site.data.origin).href
    }
    return src
  }

  /**
   * Get the absolute image src for the given src.
   *
   * This will return the image url for the given src. If the image is not found, it will
   * return the original src.
   *
   * @param src - The src to lookup.
   * @returns The image url or empty if not found.
   */
  getImageSrc(src: string): string {
    const key = this.normalizeKey(src)
    const image = this.images.get(key)
    if (image) {
      return buildUrl(image.src, this.site.data.origin).href
    }
    return src
  }

  /**
   * Normalize the key to be used in the image map.
   *
   * This will remove the leading `/@fs`, working directory, and /src/content as well as
   *  the trailing ?v=1234.
   *
   * @param key the key to normalize
   * @returns The normalized key
   */
  private normalizeKey(key: string): string {
    return key
      .split('?')[0]
      .replace('/@fs', '')
      .replace(this.cwd, '')
      .replace(/^\/src\/content/, '')
      .replace(/^\/article\/(\d{4})\/([^/]+)/, (_, year, rest) => {
        return `/article/${year}-${rest}`
      })
  }
}
