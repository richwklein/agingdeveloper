import { getArticles } from './article'

/**
 * @type TagsResponse
 * The response from a request for a list of tags / categories.
 */
export type TagsResponse = Promise<string[]>

/**
 * @type TagsWithCountResponse
 * The response from a request for tags with the count of usage.
 */
export type TagsWithCountResponse = Promise<{ tags: Map<string, number>; total: number }>

/**
 * Get a list of categories.
 *
 * @returns The list of categories
 */
export const getCategories = async (): TagsResponse => {
  const articles = await getArticles()
  const categories = new Set<string>(articles.map((article) => article.data.category))
  return Array.from(categories).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
}

/**
 * @name getCategoriesWithCount
 *
 * Get a map of categories with the number of times they have occurred.
 * Includes the total number of categories.
 *
 * @returns The categories and their counts
 */
export const getCategoriesWithCount = async (): TagsWithCountResponse => {
  const articles = await getArticles()
  const categories = new Map()
  articles.forEach((article) => {
    const category = article.data.category
    const value = (categories.get(category) || 0) + 1
    categories.set(category, value)
  })
  return { tags: categories, total: articles.length }
}

/**
 * @name getTags
 *
 * Get a list of tags.
 */
export const getTags = async (): TagsResponse => {
  const articles = await getArticles()
  const tags = new Set<string>(
    articles.flatMap((article) => article.data.tags.map((tag: string) => tag))
  )

  return Array.from(tags).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
}

/**
 * @name getTagsWithCount
 *
 * Get a map of tags with the number of times they have occurred.
 * Includes the total number of tags.
 */
export const getTagsWithCount = async (): TagsWithCountResponse => {
  const articles = await getArticles()
  const tags = new Map()
  articles.forEach((article) => {
    article.data.tags.forEach((tag: string) => {
      const value = (tags.get(tag) || 0) + 1
      tags.set(tag, value)
    })
  })
  return { tags, total: articles.length }
}
