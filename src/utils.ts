import { getCollection } from 'astro:content'

/**
 * Get a list of categories.
 */
export const getCategories = async () => {
  const articles = await getArticles()
  const categories = new Set<string>(articles.map((entry) => entry.data.category.toLowerCase()))
  return Array.from(categories)
}

/**
 * Get a map of categories with the number of times they have occurred. 
 * Includes the total number of categories.
 */
export const getCategoriesWithCount = async () => {
  const articles = await getArticles()
  const categories = new Map();
  let total = 0;
  articles.forEach((entry) => {
    const category = entry.data.category.toLowerCase()
    const value = (categories.get(category) || 0) + 1
    categories.set(category, value)
    total += value

  });
  return { categories, total };
}

/**
 * Get a list of tags.
 */
export const getTags = async () => {
  const articles = await getArticles()
  const tags = new Set<string>(articles.flatMap((entry) => entry.data.tags.map((tag) => tag.toLowerCase()))
  );

  return Array.from(tags);
}

/**
 * Get a map of tags with the number of times they have occurred. 
 * Includes the total number of tags.
 */
export const getTagsWithCount = async () => {
  const articles = await getArticles()
  const tags = new Map();
  let total = 0;
  articles.forEach((entry) => {
    entry.data.tags.forEach((tag) => {
      const lowercaseTag = tag.toLowerCase()
      const value = (tags.get(lowercaseTag) || 0) + 1
      tags.set(lowercaseTag, value)
      total += value
    });
  });
  return { tags, total };
};

/**
 * Get a list of article collection entries.
 */
export const getArticles = async (limit?: number) => {
  return (await getCollection("article"))
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
    .slice(0, limit)
}

/**
 * Get a list of article collection entries by author id.
 */
export const getArticlesByAuthor = async (authorId: string, limit?: number) => {
  const articles = await getArticles()
  return articles
    .filter((entry) => entry.data.author.id === authorId).slice(0, limit)
}

/**
 * Get a list of article collection entries by category.
 */
export const getArticlesByCategory = async (category: string, limit?: number) => {
  const articles = await getArticles()
  const lowercaseCategory = category.toLowerCase()
  return articles
    .filter((entry) => entry.data.category.toLowerCase() === lowercaseCategory)
    .slice(0, limit)
}

/**
 * Get a list of article collection entries by tag.
 */
export const getArticlesByTag = async (tag: string, limit?: number) => {
  const articles = await getArticles()
  const lowercaseTag = tag.toLowerCase()
  return articles
    .filter((entry) => {
      return entry.data.tags.some((articleTag) => articleTag.toLowerCase() === lowercaseTag)
    })
    .slice(0, limit)
}

/**
 * Calculates a font weight between 300 and 900 rounding up to the nearest 100.
 */
export const calculateWeight = (value: number, total: number): number => {
  const zeroBased = value - 1;
  const normalized = zeroBased / (total - 1);
  const shifted = normalized * (900 - 300) + 300;
  return Math.ceil(shifted / 100) * 100;
}