import { toString } from "mdast-util-to-string";

export function remarkExcerpt() {
  return function (tree: unknown, { data }: any) {
    const textOnPage = toString(tree);
    data.astro.frontmatter.excerpt = textOnPage.slice(0, 280);
  };
}
