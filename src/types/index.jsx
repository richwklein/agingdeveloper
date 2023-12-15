import PropTypes from "prop-types";

export const ChildrenType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element,
  PropTypes.arrayOf(PropTypes.element),
]);

/**
 * @typedef ArticleAuthorDigestType - The article author PropTypes.
 * @property {string} name - The name of the author.
 * @property {string} slug - The path suffix to the author page.
 */
export const ArticleAuthorDigestType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
});

export const ArticleDigestType = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
});

/**
 * @typedef ImageAuthorType - The featured image author PropTypes.
 * @property {string} name - The name of the author.
 * @property {string} [url] - The url of the author.
 */
export const ImageAuthorType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
});

/**
 * @typedef ImageSiteType - The featured image site PropTypes.
 * @property {string} name - The name of the site.
 * @property {string} [url] - The url of the site.
 */
export const ImageSiteType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
});

/**
 * @typedef TagWithCountType - The tag name and count PropTypes.
 * @property {string} name - The name of the tag.
 * @property {number} count - The number of occurances for the tag.
 */
export const TagWithCountType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
});
