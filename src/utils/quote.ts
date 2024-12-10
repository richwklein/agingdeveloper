import { type CollectionEntry, getCollection } from 'astro:content'

/**
 * @type QuoteResponse
 * The response from a request for a list of quotes.
 */
export type QuotesResponse = Promise<Array<CollectionEntry<'quote'>>>

/**
 * @name getQuotes
 *
 * Get a list of quote collection entries sorted in descending published order.
 *
 * @param limit - Optional limit to the number of quotes to return
 * @returns The list of quotes
 */
export const getQuotes = async (limit?: number, exclude?: string): QuotesResponse => {
  const quotes = await getCollection('quote')
  return quotes
    .filter((quote: CollectionEntry<'quote'>) => quote.id != exclude)
    .sort(
      (a: CollectionEntry<'quote'>, b: CollectionEntry<'quote'>) =>
        b.data.chalked.valueOf() - a.data.chalked.valueOf()
    )
    .slice(0, limit)
}

/**
 * @name getLatestQuote
 *
 * Get the most recent quote by descending published order.
 *
 * @returns a single quote entry
 */
export const getLatestQuote = async (): Promise<CollectionEntry<'quote'>> => {
  const [latest] = await getQuotes(1)
  return latest
}
