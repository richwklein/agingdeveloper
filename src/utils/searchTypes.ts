import Fuse from 'fuse.js'

export const searchKeys = [
  'frontmatter.title',
  'frontmatter.description',
  'frontmatter.category',
  'frontmatter.tags',
] as const

export interface SearchableFrontmatter {
  title: string
  description: string
  category: string
  tags: string[]
}

export interface SearchableArticle {
  frontmatter: SearchableFrontmatter
  pathname: string
}

export interface SearchIndexPayload {
  index: ReturnType<ReturnType<typeof Fuse.createIndex<SearchableArticle>>['toJSON']>
  list: SearchableArticle[]
}
