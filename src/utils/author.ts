import { type CollectionEntry, getEntry } from 'astro:content'

export const DEFAULT_AUTHOR_ID = 'richwklein'

/**
 * Get the data about the default author.
 *
 * @returns the author metadata
 */
export const getDefaultAuthor = async (): Promise<CollectionEntry<'author'>> => {
  return getAuthorById(DEFAULT_AUTHOR_ID)
}

/**
 * Get the data about a specific author.
 *
 * @returns the author metadata
 */
export const getAuthorById = async (id: string): Promise<CollectionEntry<'author'>> => {
  const author = await getEntry('author', id)
  if (!author) {
    throw new Error(`Author ${id} is required`)
  }

  return author
}
