import { getCollection, type CollectionEntry } from 'astro:content'

let articles: Array<CollectionEntry<'article'>>

/**
 * Get a list of categories.
 */
export const getCategories = async () => {
  const articles = await getArticles()
  const categories = new Set<string>(articles.map((article) => article.data.category))
  return Array.from(categories)
}

/**
 * Get a map of categories with the number of times they have occurred.
 * Includes the total number of categories.
 */
export const getCategoriesWithCount = async () => {
  const articles = await getArticles()
  const categories = new Map()
  let total = 0
  articles.forEach((article) => {
    const category = article.data.category
    const value = (categories.get(category) || 0) + 1
    categories.set(category, value)
    total += value
  })
  return { categories, total }
}

/**
 * Get a list of tags.
 */
export const getTags = async () => {
  const articles = await getArticles()
  const tags = new Set<string>(
    articles.flatMap((article) => article.data.tags.map((tag: string) => tag))
  )

  return Array.from(tags)
}

/**
 * Get a map of tags with the number of times they have occurred.
 * Includes the total number of tags.
 */
export const getTagsWithCount = async () => {
  const articles = await getArticles()
  const tags = new Map()
  let total = 0
  articles.forEach((article) => {
    article.data.tags.forEach((tag: string) => {
      const value = (tags.get(tag) || 0) + 1
      tags.set(tag, value)
      total += value
    })
  })
  return { tags, total }
}

/**
 * Get a list of article collection entries.
 */
export const getArticles = async (limit?: number) => {
  if (articles == null) {
    articles = await getCollection('article')
  }
  return articles
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
    .slice(0, limit)
}

/**
 * Get a list of article collection entries by author id.
 */
export const getArticlesByAuthor = async (authorId: string, limit?: number) => {
  const articles = await getArticles()
  const filtered = articles.filter((article) => article.data.author.id == authorId)
  return {
    entries: filtered.slice(0, limit),
    total: filtered.length,
  }
}

/**
 * Get a list of article collection entries by category.
 */
export const getArticlesByCategory = async (category: string, limit?: number) => {
  const articles = await getArticles()
  const filtered = articles.filter((article) => article.data.category == category)
  return {
    entries: filtered.slice(0, limit),
    total: filtered.length,
  }
}

/**
 * Get a list of article collection entries by tag.
 */
export const getArticlesByTag = async (tag: string, limit?: number) => {
  const articles = await getArticles()
  const filtered = articles.filter((article) => {
    return article.data.tags.some((articleTag: string) => articleTag == tag)
  })
  return {
    entries: filtered.slice(0, limit),
    total: filtered.length,
  }
}
