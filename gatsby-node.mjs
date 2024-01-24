import {readFileSync} from "fs";
import {resolve as pathResolve} from "path";
import readingTime from "reading-time";
import slug from "slug";

const articlesPerPage = 15;

export const onCreateNode = ({node, actions}) => {
  const {createNodeField} = actions;
  if (node.internal.type === "Mdx") {
    createNodeField({
      node,
      name: "timeToRead",
      value: readingTime(node.body),
    });
  }
};

export const createSchemaCustomization = ({actions, schema}) => {
  const {createTypes} = actions;
  const typeDefs = [
    schema.buildObjectType({
      name: "Socials",
      fields: {
        name: "String!",
        url: "String!",
      },
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: "AuthorJson",
      fields: {
        slug: "String!",
        name: "String!",
        firstName: "String!",
        lastName: "String!",
        image: {
          type: "File!",
          extensions: {
            fileByRelativePath: {},
          },
        },
        tagline: "String!",
        bio: "String!",
        twitterUsername: "String",
        socials: "[Socials!]",
        published: {
          type: "Date!",
          extensions: {
            dateformat: {},
          },
        },
        modified: {
          type: "Date!",
          extensions: {
            dateformat: {},
          },
          resolve: (source, args, context, info) => {
            const {modified} = source;
            if (source.modified == null) {
              return source.published;
            }
            return modified;
          },
        },
      },
      interfaces: ["Node"],
      extensions: {
        infer: true,
      },
    }),
    schema.buildObjectType({
      name: "ImageAuthor",
      fields: {
        name: "String!",
        url: "String!",
      },
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: "ImageSite",
      fields: {
        name: "String!",
        url: "String!",
      },
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: "FeaturedImage",
      fields: {
        author: "ImageAuthor",
        site: "ImageSite",
        image: {
          type: "File!",
          extensions: {
            fileByRelativePath: {},
          },
        },
      },
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        slug: "String!",
        title: "String!",
        description: "String!",
        featured: "FeaturedImage!",
        published: {
          type: "Date!",
          extensions: {
            dateformat: {},
          },
        },
        modified: {
          type: "Date!",
          extensions: {
            dateformat: {},
          },
          resolve: (source, args, context, info) => {
            const {modified} = source;
            if (source.modified == null) {
              return source.published;
            }
            return modified;
          },
        },
        author: {
          type: "AuthorJson!",
          resolve: (source, args, context, info) => {
            return context.nodeModel.findOne({
              type: "AuthorJson",
              query: {
                filter: {slug: {eq: source.author}},
              },
            });
          },
        },
        category: {
          type: "String!",
          resolve(source, args, context, info) {
            const {category} = source;
            if (source.category == null) {
              return "uncategorized";
            }
            return category;
          },
        },
        tags: {
          type: "[String!]",
          resolve(source, args, context, info) {
            const {tags} = source;
            if (source.tags == null || (Array.isArray(tags) && !tags.length)) {
              return [source.category];
            }
            return tags;
          },
        },
      },
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: "Mdx",
      fields: {
        frontmatter: "Frontmatter!",
      },
      interfaces: ["Node"],
      extensions: {
        infer: true,
      },
    }),
  ];
  createTypes(typeDefs);
};

export const createPages = async ({actions, reporter, graphql}) => {
  const {createPage, createRedirect} = actions;
  const result = await graphql(`
  {
    articles: allMdx(
      sort: [{frontmatter: {published: DESC}}, {frontmatter: {title: ASC}}]
      ) {
      edges {
        node {
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
    tags: allMdx {
      group(field: {frontmatter: {tags: SELECT}}) {
        tag: fieldValue
      }
    }
    categories: allMdx {
      group(field: {frontmatter: {category: SELECT}}) {
        category: fieldValue
      }
    }
    authors: allAuthorJson(sort: {name: ASC}) {
      edges {
        node {
          slug
        }
      }
    }
  }`);

  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  // Create various pages from templates
  createArticlePages(createPage, result.data.articles.edges);
  createArchivePages(createPage, result.data.articles.edges);
  createTagPages(createPage, result.data.tags.group);
  createCategoryPages(createPage, result.data.categories.group);
  createAuthorPages(createPage, result.data.authors.edges);

  // create redirects where pages have moved around
  createRedirects(createRedirect);

  /**
   * TODO kick off a job from here to create the rss feeds
   * https://www.gatsbyjs.com/docs/reference/config-files/actions/#createJobV2
   */
};

const createArticlePages = (createPage, articles) => {
  const template = pathResolve("src/templates/article.jsx");
  const pathPrefix = "/article";
  articles.forEach(({node}) => {
    const pathSuffix = node.frontmatter.slug;

    return createPage({
      path: `${pathPrefix}/${pathSuffix}`,
      component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        pathSuffix,
      },
    });
  });
};

const createArchivePages = (createPage, articles) => {
  const template = pathResolve("src/templates/archive.jsx");
  const pathPrefix = "/article";
  const pageCount = Math.ceil(articles.length / articlesPerPage);

  Array.from({length: pageCount}).forEach((_, i) => {
    const pageNumber = i + 1;
    createPage({
      path: i === 0 ? `${pathPrefix}/` : `${pathPrefix}/archive-${pageNumber}`,
      component: template,
      context: {
        limit: articlesPerPage,
        skip: i * articlesPerPage,
        pageCount,
        pageNumber,
      },
    });
  });
};

const createTagPages = (createPage, tags) => {
  const template = pathResolve("src/templates/tag.jsx");
  const pathPrefix = "/tag";

  tags.forEach(({tag}) => {
    const pathSuffix = slug(tag);

    createPage({
      path: `${pathPrefix}/${pathSuffix}`,
      component: template,
      context: {
        limit: articlesPerPage,
        pathSuffix,
        tag,
      },
    });
  });
};

const createCategoryPages = (createPage, categories) => {
  const template = pathResolve("src/templates/category.jsx");
  const pathPrefix = "/category";

  categories.forEach(({category}) => {
    const pathSuffix = slug(category);

    createPage({
      path: `${pathPrefix}/${pathSuffix}`,
      component: template,
      context: {
        limit: articlesPerPage,
        pathSuffix,
        category,
      },
    });
  });
};

const createAuthorPages = (createPage, authors) => {
  const template = pathResolve("src/templates/author.jsx");
  const pathPrefix = "/author";

  authors.forEach(({node}) => {
    const pathSuffix = node.slug;

    return createPage({
      path: `${pathPrefix}/${pathSuffix}`,
      component: template,
      context: {
        limit: articlesPerPage,
        pathSuffix,
      },
    });
  });
};

const createRedirects = (createRedirect) => {
  const redirects = JSON.parse(readFileSync("content/data/redirects.json"));
  redirects.forEach((redirect) =>
    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
      isPermanent: redirect.isPermanent,
    }),
  );
};
