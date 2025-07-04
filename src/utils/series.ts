import { getArticlesBySeries } from '@utils/article'
import { type CollectionEntry, getEntry } from 'astro:content'

/**
 * @name getSeries
 *
 * Get the data about a specific series.
 *
 * @param {number} id - The id of the series
 * @returns the series metadata
 */
export const getSeries = async (id: string): Promise<CollectionEntry<'series'>> => {
  const series = await getEntry('series', id)
  if (!series) {
    throw new Error(`Series ${id} is required`)
  }

  return series
}

/**
 * @type SeriesPage
 *
 * Represents the series paging information for an article.
 *
 * @property {CollectionEntry<'series'>} series - The series metadata
 * @property {number} current - The current article number in the series
 * @property {number} total - The total number of articles in the series
 * @property {string} [previous] - The id of the previous article in the series, if any
 * @property {string} [next] - The id of the next article in the series, if any
 */
export type SeriesPage = {
  series: CollectionEntry<'series'>
  current: number
  total: number
  previous?: string
  next?: string
}

/**
 * @name getSeriesPage
 *
 * Get the series information and pagination for a specific article.
 * This includes the series current article number, total number of articles,
 * and the ids of the previous and next articles.
 *
 * @param {string} seriesId - The id of the series
 * @param {string} articleId - The id of the article
 * @returns {Promise<ArticleSeries>} The series information for the article
 *
 * @throws {Error} If the series is not found
 */
export const getSeriesPage = async (seriesId: string, articleId: string): Promise<SeriesPage> => {
  const series = await getSeries(seriesId)
  const { articles, total } = await getArticlesBySeries(seriesId)
  const current = articles.findIndex((article) => articleId === article.id)

  return {
    series,
    current: current + 1, // +1 to make it 1-indexed
    total,
    previous: current > 0 ? articles[current - 1].id : undefined,
    next: current < total - 1 ? articles[current + 1].id : undefined,
  }
}
