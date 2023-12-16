import PropTypes from "prop-types";

/**
 * @typedef {string|element|element[]} ChildrenProps - Generic react children props.
 */
export const ChildrenProps = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element,
  PropTypes.arrayOf(PropTypes.element),
]);

/**
 * @typedef ArticleAuthorDigestProps - A digest of article author props.
 * @property {string} name - The name of the author.
 * @property {string} slug - The path suffix to the author page.
 */
export const ArticleAuthorDigestProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
});

/**
 * @typedef ArticleDigestProps - A digest of a article props.
 * @property {string} slug - The path suffix to the article page.
 * @property {string} title - The title of the article.
 * @property {string} date - The date the article was published.
 * @property {string} excerpt - An excerpt from the start of the article.
 * @property {GatsbyImageData} image - The GatsbyImageData of the image.
 */
export const ArticleDigestProps = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
});

/**
 * @typedef ImageAuthorProps - Featured image author props.
 * @property {string} name - The name of the author.
 * @property {string} [url] - The url of the author.
 */
export const ImageAuthorProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
});

/**
 * @typedef ImageSiteProps - Featured image site props.
 * @property {string} name - The name of the site.
 * @property {string} [url] - The url of the site.
 */
export const ImageSiteProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
});

/**
 * @typedef TagWithCountProps - Tag with count props.
 * @property {string} name - The name of the tag.
 * @property {number} count - The number of occurrences for the tag.
 */
export const TagWithCountProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
});

/**
 * @typedef LinkProps - Hyperlink props.
 * @property {string} to - The external link.
 * @property {any} rest - The remaining props to spread.
 */
export const LinkProps = {
  to: PropTypes.string.isRequired,
  rest: PropTypes.any,
};

/**
 * @typedef FrontmatterProps - Frontmatter props
 * @property {string} slug - The path suffix of the article.
 * @property {string} title - The title of the article.
 * @property {string} date - The published date of the article.
 * @property {object} featured - The featured image data.
 */
export const FrontmatterProps = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  featured: PropTypes.object.isRequired,
});

/**
 * @typedef MDXNodeProps - MDX Node props
 * @property {FrontmatterProps} frontmatter - The frontmatter of the mdx.
 * @property {string} excerpt - The excerpt from the front of the article.
 */
export const MDXNodeProps = PropTypes.shape({
  frontmatter: FrontmatterProps.isRequired,
  excerpt: PropTypes.string.isRequired,
});

