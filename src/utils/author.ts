import { type CollectionEntry, getEntry } from 'astro:content'

export const DEFAULT_AUTHOR_ID = 'richwklein'

/**
 * @name getDefaultAuthor
 *
 * Get the data about the default author.
 *
 * @returns the author metadata
 */
export const getDefaultAuthor = async (): Promise<CollectionEntry<'author'>> => {
  return getAuthor(DEFAULT_AUTHOR_ID)
}

/**
 * @name getAuthor
 *
 * Get the data about a specific author.
 *
 * @returns the author metadata
 */
export const getAuthor = async (id: string): Promise<CollectionEntry<'author'>> => {
  const author = await getEntry('author', id)
  if (!author) {
    throw new Error(`Author ${id} is required`)
  }

  return author
}
