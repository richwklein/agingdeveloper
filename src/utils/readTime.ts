import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

export function remarkReadingTime() {
  return function (tree: unknown, { data }: any) {
    const textOnPage = toString(tree)
    data.astro.frontmatter.readingTime = getReadingTime(textOnPage)
  }
}
