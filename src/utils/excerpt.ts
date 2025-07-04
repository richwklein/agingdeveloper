import { toString } from 'mdast-util-to-string'

/**
 * @name remarkExcerpt
 *
 * Remark plugin to generate an excerpt from the markdown content.
 *
 * This will take the first 280 characters of the content and set it as the excerpt in the frontmatter.
 *
 * @param tree - The markdown AST tree.
 * @param data - The data object containing the frontmatter.
 *
 * @returns void
 */
export function remarkExcerpt() {
  return function (tree: unknown, { data }: any) {
    const textOnPage = toString(tree)
    data.astro.frontmatter.excerpt = textOnPage.slice(0, 280)
  }
}
