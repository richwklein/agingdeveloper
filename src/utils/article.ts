import { type CollectionEntry, getCollection, getEntry } from 'astro:content'

import { intersection } from './misc'

/**
 * @type ArticlesResponse
 * The response from a request for a list of articles.
 */
export type ArticlesResponse = Promise<CollectionEntry<'article'>[]>

/**
 * @type ArticlesWithCountResponse
 * The response from a request for a list of articles.
 */
export type ArticlesWithCountResponse = Promise<{
  articles: CollectionEntry<'article'>[]
  total: number
}>

/**
 * @name getArticles
 *
 * Get a list of article collection entries sorted in descending published order.
 *
 * @param limit - Optional limit to the number of articles to return
 * @param exclude - Optional id to exclude from the results
 * @returns The list of articles
 */
export const getArticles = async (limit?: number, exclude?: string): ArticlesResponse => {
  const articles = await getCollection('article')
  return articles
    .filter((article: CollectionEntry<'article'>) => article.id != exclude)
    .sort(
      (a: CollectionEntry<'article'>, b: CollectionEntry<'article'>) =>
        b.data.published.valueOf() - a.data.published.valueOf()
    )
    .slice(0, limit)
}

/**
 * @name getArticleById
 *
 * Get a single article entry based on the id.
 *
 * @param id - The ide of the article to return.
 * @returns The article to return
 */
export const getArticleById = async (
  id: string
): Promise<CollectionEntry<'article'> | undefined> => {
  const entry = await getEntry('article', id)
  if (!entry) {
    throw new Error(`Article ${id} is required`)
  }

  return entry
}

/**
 * @name getArticlesByAuthor
 *
 * Get articles written by a given author
 *
 * @param author - The author to get the articles for
 * @param limit - Optional limit to the number of articles to return
 * @returns The list of articles along with the total number of articles
 */
export const getArticlesByAuthor = async (
  authorId: string,
  limit?: number
): ArticlesWithCountResponse => {
  const articles = await getArticles()
  const filtered = articles.filter((article) => article.data.author.id == authorId)
  return {
    articles: filtered.slice(0, limit),
    total: filtered.length,
  }
}

/**
 * @name getArticlesByCategory
 *
 * Get articles that are in a given category
 *
 * @param category - The category to get the articles for
 * @param limit - Optional limit to the number of articles to return
 * @returns The list of articles along with the total number of articles
 */
export const getArticlesByCategory = async (
  category: string,
  limit?: number
): ArticlesWithCountResponse => {
  const articles = await getArticles()
  const filtered = articles.filter((article) => article.data.category == category)
  return {
    articles: filtered.slice(0, limit),
    total: filtered.length,
  }
}

/**
 * @name getArticlesByTag
 *
 * Get articles that contain the given tag
 *
 * @param tag - The tag to get the articles for
 * @param limit - Optional limit to the number of articles to return
 * @returns The list of articles along with the total number of articles
 */
export const getArticlesByTag = async (tag: string, limit?: number): ArticlesWithCountResponse => {
  const articles = await getArticles()
  const filtered = articles.filter((article) => {
    return article.data.tags.some((articleTag: string) => articleTag == tag)
  })
  return {
    articles: filtered.slice(0, limit),
    total: filtered.length,
  }
}

/**
 * @name getRelatedArticles
 *
 * Get articles that relate to the current article. An article is considered related when
 * it is in the same category and has at least two tags in common.
 *
 * @param current - The current article that we are looking for relationship with
 * @param limit - Optional limit to the number of articles to return
 * @returns The list of articles in closest match order
 */
export const getRelatedArticles = async (
  current: CollectionEntry<'article'>,
  limit?: number
): ArticlesResponse => {
  const articles = await getArticles()
  return articles
    .filter((article) => article.id != current.id) // exclude current
    .filter((article) => article.data.category == current.data.category) // same category
    .map((article) => {
      return {
        article: article,
        match: intersection(article.data.tags, current.data.tags).size, // get a count of tags in common
      }
    })
    .filter((related) => related.match >= 2) // only articles with at least two tags in common
    .sort((a, b) => b.match - a.match) // sort by number of matches
    .map((related) => related.article)
    .slice(0, limit)
}

/**
 * @name getPopularArticles
 *
 * Get articles that are considered to be popular.
 *
 * @param limit - Optional limit to the number of articles to return
 * @returns The list of articles that are marked as popular
 */
export const getPopularArticles = async (limit?: number): ArticlesResponse => {
  const articles = await getArticles()
  return articles.filter((article) => article.data.popular).slice(0, limit)
}
