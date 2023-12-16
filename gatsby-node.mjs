import {resolve as pathResolve} from "path";
import readingTime from "reading-time";
import slug from "slug";

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


export const createPages = async ({graphql, actions, reporter}) => {
  const {createPage} = actions;
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

  createArticlePages(createPage, result.data.articles.edges);
  createTagPages(createPage, result.data.tags.group);
  createCategoryPages(createPage, result.data.categories.group);
  createAuthorPages(createPage, result.data.authors.edges);
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

  // TODO create paginated article list pages
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
        pathSuffix,
      },
    });
  });
};
