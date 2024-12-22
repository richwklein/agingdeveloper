import {
  getArticleById,
  getArticles,
  getArticlesByAuthor,
  getArticlesByCategory,
  getArticlesByTag,
  getPopularArticles,
  getRelatedArticles,
} from '@utils/article'
import { describe, expect, test } from 'vitest'

describe('getArticles', () => {
  test('that it returns an array of articles', async () => {
    const articles = await getArticles()
    expect(articles).toHaveLength(5)
  })
  test('that the articles are sorted by published date', async () => {
    const articles = await getArticles()
    expect(articles).toHaveLength(5)
    expect(articles[0].id).toBe('mock-article-3')
    expect(articles[1].id).toBe('mock-article-1')
    expect(articles[2].id).toBe('mock-article-2')
    expect(articles[3].id).toBe('mock-article-4')
    expect(articles[4].id).toBe('mock-article-with-modified')
  })

  test('that an article can be excluded', async () => {
    const articles = await getArticles(undefined, 'mock-article-1')
    expect(articles).toHaveLength(4)
    expect(articles[0].id).toBe('mock-article-3')
    expect(articles[1].id).toBe('mock-article-2')
  })

  test('that the articles are limited to the limit provided', async () => {
    const articles = await getArticles(2)
    expect(articles).toHaveLength(2)
  })
})

describe('getArticleById', () => {
  test('that it returns an article by id', async () => {
    const article = await getArticleById('mock-article-1')
    expect(article).toBeDefined()
    expect(article?.id).toBe('mock-article-1')
  })

  test('that it returns undefined for an article that does not exist', async () => {
    const article = await getArticleById('does-not-exist')
    expect(article).toBeUndefined()
  })
})

describe('getArticlesByAuthor', () => {
  test('that it returns articles by author', async () => {
    const articles = await getArticlesByAuthor('mock-author-1')
    expect(articles.articles).toHaveLength(4)
  })

  test('that it returns articles by author with a limit', async () => {
    const articles = await getArticlesByAuthor('mock-author-1', 2)
    expect(articles.articles).toHaveLength(2)
  })

  test('that it returns an empty array for an author with no articles', async () => {
    const articles = await getArticlesByAuthor('does-not-exist')
    expect(articles.articles).toHaveLength(0)
  })
})

describe('getArticlesByCategory', () => {
  test('that it returns articles by category', async () => {
    const articles = await getArticlesByCategory('mock-category-1')
    expect(articles.articles).toHaveLength(3)
    expect(articles.total).toBe(3)
  })

  test('that it returns articles by category with a limit', async () => {
    const articles = await getArticlesByCategory('mock-category-1', 1)
    expect(articles.articles).toHaveLength(1)
    expect(articles.total).toBe(3)
  })

  test('that it returns an empty array for a category with no articles', async () => {
    const articles = await getArticlesByCategory('does-not-exist')
    expect(articles.articles).toHaveLength(0)
    expect(articles.total).toBe(0)
  })
})

describe('getArticlesByTag', () => {
  test('that it returns articles by tag', async () => {
    const articles = await getArticlesByTag('mock-tag-1')
    expect(articles.articles).toHaveLength(4)
    expect(articles.total).toBe(4)
  })

  test('that it returns articles by tag with a limit', async () => {
    const articles = await getArticlesByTag('mock-tag-1', 1)
    expect(articles.articles).toHaveLength(1)
    expect(articles.total).toBe(4)
  })

  test('that it returns an empty array for a tag with no articles', async () => {
    const articles = await getArticlesByTag('does-not-exist')
    expect(articles.articles).toHaveLength(0)
    expect(articles.total).toBe(0)
  })
})

describe('getRelatedArticles', () => {
  test('that it returns related articles', async () => {
    const current = await getArticleById('mock-article-1')
    if (!current) {
      throw new Error('Article not found')
    }

    const articles = await getRelatedArticles(current)
    expect(articles).toHaveLength(2)
  })

  test('that it returns related articles with a limit', async () => {
    const current = await getArticleById('mock-article-1')
    if (!current) {
      throw new Error('Article not found')
    }

    const articles = await getRelatedArticles(current, 1)
    expect(articles).toHaveLength(1)
  })

  test('that it returns an empty array for an article with no related articles', async () => {
    const current = await getArticleById('mock-article-with-modified')
    if (!current) {
      throw new Error('Article not found')
    }

    const articles = await getRelatedArticles(current, 1)
    expect(articles).toHaveLength(0)
  })

  test('that it excludes articles from a different category', async () => {
    const current = await getArticleById('mock-article-1')
    if (!current) {
      throw new Error('Article not found')
    }

    const articles = await getRelatedArticles(current)
    const ids = articles.map((article) => article.id)
    expect(ids).not.contain('mock-article-4')
  })
})

describe('getPopularArticles', () => {
  test('that it returns popular articles', async () => {
    const articles = await getPopularArticles()
    expect(articles).toHaveLength(2)
  })

  test('that it returns popular articles with a limit', async () => {
    const articles = await getPopularArticles(1)
    expect(articles).toHaveLength(1)
  })
})
