import { getCollection } from 'astro:content'
import Fuse from 'fuse.js'

import type { SearchableArticle, SearchIndexPayload } from './searchTypes'
import { searchKeys } from './searchTypes'

export const getSearchableArticles = async (): Promise<SearchableArticle[]> => {
  const articles = await getCollection('article')

  return articles
    .filter((article) => !article.id.startsWith('archive'))
    .map((article) => ({
      frontmatter: {
        title: article.data.title,
        description: article.data.description,
        category: article.data.category,
        tags: article.data.tags,
      },
      pathname: `/article/${article.id}`,
    }))
}

export const getSearchIndexPayload = async (): Promise<SearchIndexPayload> => {
  const list = await getSearchableArticles()
  const index = Fuse.createIndex<SearchableArticle>(searchKeys as unknown as string[], list)

  return {
    index: index.toJSON(),
    list,
  }
}
