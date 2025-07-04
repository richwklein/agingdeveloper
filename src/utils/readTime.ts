import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

export function remarkReadTime() {
  return function (tree: unknown, { data }: any) {
    const textOnPage = toString(tree)
    data.astro.frontmatter.readTime = getReadingTime(textOnPage)
  }
}
