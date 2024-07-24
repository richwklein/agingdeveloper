import { getCollection } from 'astro:content'

export const getArticles = async (limit?: number) => {
  return (await getCollection("article"))
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
    .slice(0, limit)
}

export const getCategories = async () => {
  const articles = await getCollection("article")
  const categories = new Set<string>(articles.map((entry) => entry.data.category.toLowerCase()))
  return Array.from(categories)
}

export const getTags = async () => {
  const articles = await getCollection("article")
  const tags = new Set<string>(articles.flatMap((entry) => entry.data.tags.map((tag) => tag.toLowerCase()))
  );

  return Array.from(tags);
}

export const getArticlesByAuthor = async (authorId: string, limit?: number) => {
  const articles = await getArticles(limit)
  return articles.filter((entry) => entry.data.author.id === authorId)
}

export const getArticlesByCategory = async (category: string, limit?: number) => {
  const articles = await getArticles(limit)
  const lowercaseCategory = category.toLowerCase()
  return articles.filter((entry) => entry.data.category.toLowerCase() === lowercaseCategory)
}

export const getArticlesByTag = async (tag: string, limit?: number) => {
  const articles = await getArticles(limit)
  const lowercaseTag = tag.toLowerCase()
  return articles.filter((entry) => {
    return entry.data.tags.some((articleTag) => articleTag.toLowerCase() === lowercaseTag)
  })
}