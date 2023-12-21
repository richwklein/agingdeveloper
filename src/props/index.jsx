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
 * @typedef ArticleAuthorDigestProps - Limited set of an article author props.
 * @property {string} name - The name of the author.
 * @property {string} slug - The path suffix to the author page.
 */
export const ArticleAuthorDigestProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
});

/**
 * @typedef ArticleDigestProps - Limited set of an article props.
 * @property {string} slug - The path suffix to the article page.
 * @property {string} title - The title of the article.
 * @property {string} published - The date the article was published.
 * @property {string} excerpt - An excerpt from the start of the article.
 * @property {GatsbyImageData} image - The GatsbyImageData of the image.
 */
export const ArticleDigestProps = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
});

/**
 * @typedef AuthorDigestProps - Limited set of author props.
 * @property {string} name - The name of the author.
 * @property {string} slug - The path suffix to the author page.
 * @property {string} published - The date of the authors first published article.
 * @property {string} tagline - The tagline for the author.
 * @property {Object} image - The avatar image for the author.
 */
export const AuthorDigestProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
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
 * @typedef FrontmatterDigestProps - Limited set of frontmatter props
 * @property {string} slug - The path suffix of the article.
 * @property {string} title - The title of the article.
 * @property {string} published - The published date of the article.
 * @property {object} featured - The featured image data.
 */
export const FrontmatterDigestProps = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  featured: PropTypes.object.isRequired,
});

/**
 * @typedef FrontmatterProps - Frontmatter props
 * @property {string} slug - The path suffix of the article.
 * @property {string} title - The title of the article.
 * @property {string} description - THe description of the article.
 * @property {string} published - The published date of the article.
 * @property {string} category - The category of the article.
 * @property {string[]} tags - The tags of the article.
 * @property {ArticleAuthorDigestProps} author - The author of the article.
 * @property {Object} featured - The featured image meta.
 * @property {ImageAuthorProps} featured.author - The author of the featured image.
 * @property {ImageSiteProps} featured.site - The site of the featured image.
 * @property {GatsbyImageData} featured.image - The featured image data.
 */
export const FrontmatterProps = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  author: ArticleAuthorDigestProps.isRequired,
  featured: PropTypes.shape({
    author: ImageAuthorProps,
    site: ImageSiteProps,
    image: PropTypes.object.isRequired,
  }),
});

/**
 * @typedef TimeToReadDigestProps - A limited set of article's time to read props.
 * @property {number} minutes - The number of minutes it takes to read.
 * @property {number} words - The number of words in the article.
 */
export const TimeToReadDigestProps = PropTypes.shape({
  minutes: PropTypes.number.isRequired,
  words: PropTypes.number.isRequired,
});

/**
 * @typedef MDXNodeProps - MDX Node props
 * @property {FrontmatterDigestProps} frontmatter - The frontmatter of the mdx.
 * @property {string} excerpt - The excerpt from the front of the article.
 */
export const MDXNodeProps = PropTypes.shape({
  frontmatter: FrontmatterDigestProps.isRequired,
  excerpt: PropTypes.string.isRequired,
});

/**
 * @typedef GroupNodeProps - Props for nodes grouped together.
 * @property {string} name - The name of the group.
 * @property {number} count - The count of item in the group.
 */
export const GroupNodeProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
});

/**
 * @typedef GroupsNodeProps - Props for a list of grouped.
 * @property {GroupNodeProps[]} groups - The list of groups.
 * @property {number} totalCount - The total count of items.
 */
export const GroupsNodeProps = PropTypes.shape({
  group: PropTypes.arrayOf(GroupNodeProps).isRequired,
  totalCount: PropTypes.number.isRequired,
});

/**
 * @typedef SocialProps - Props for social media links.
 * @property {string} name - The name of the social media site.
 * @property {string} url - The url to the site.
 */
export const SocialProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});
