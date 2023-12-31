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
    "type Mdx implements Node { frontmatter: Frontmatter }",
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        author: {
          type: "AuthorYaml",
          resolve: (source, args, context, info) => {
            return context.nodeModel.findOne({
              type: "AuthorYaml",
              query: {
                filter: {slug: {eq: source.author}},
              },
            });
          },
        },
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
    authors: allAuthorYaml(sort: {name: ASC}) {
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
  createRedirect({
    fromPath: "/article/rss-dead-long-live-rss",
    toPath: "/article/2021-05-17-rss-dead-long-live-rss",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/article/2020/08/14/default-http-config",
    toPath: "/article/2020-08-14-default-http-config",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/article/2020/08/08/custom-domain",
    toPath: "/article/2020-08-08-custom-domain",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/article/2020/07/26/false-start",
    toPath: "/article/2020-07-26-false-start",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/article/2020/07/21/intro",
    toPath: "/article/2020-07-21-intro",
    isPermanent: true,
  });
};
