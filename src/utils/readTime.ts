import getReadingTime from "reading-time"
import { toString } from "mdast-util-to-string"

export function remarkReadingTime() {
  return function (tree: unknown, { data }: any) {
    const textOnPage = toString(tree)
    data.astro.frontmatter.readingTime = getReadingTime(textOnPage)
  }
}
