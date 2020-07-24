const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      articles: allMdx(
        sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      ) {
        edges {
          node {
            frontmatter {
              url
            }
          }
        }
      }
      authors: allAuthorYaml(sort: { fields: name, order: DESC }) {
        edges {
          node {
            id
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  createArticlePages(createPage, result.data.articles.edges);
  createAuthorPages(createPage, result.data.authors.edges);
};

const createArticlePages = (createPage, articles) => {
  const template = path.resolve(`src/templates/article.js`);
  const pathPrefix = "/archive";

  articles.map(({ node }, index) => {
    // Use a permalink based on the frontmatter url in each markdown file header.
    const permalink = node.frontmatter.url;

    // The path to the previous page.
    const previousPath =
      index === articles.length - 1
        ? null
        : `${pathPrefix}/${articles[index + 1].node.frontmatter.slug}`;

    // The path to the next page.
    const nextPath =
      index === 0
        ? null
        : `${pathPrefix}/${articles[index - 1].node.frontmatter.id}`;

    return createPage({
      path: `${pathPrefix}/${permalink}`,
      component: template,
      context: {
        permalink,
        previousPath,
        nextPath,
      },
    });
  });
};

const createAuthorPages = (createPage, authors) => {
  const template = path.resolve(`src/templates/author.js`);
  const pathPrefix = "/author";

  authors.map(({ node }, index) => {
    const permalink = node.id;

    return createPage({
      path: `${pathPrefix}/${permalink}`,
      component: template,
      context: {
        permalink,
      },
    });
  });
};
