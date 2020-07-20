const path = require(`path`);

// Create pages based on graph data and templates
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const articleTemplate = path.resolve(`src/templates/article.js`);
  const articlePathPrefix = "/articles";

  const result = await graphql(`
    {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  // Report any errors if they occurred.
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Iterate through the query results to create individual pages.
  const pages = result.data.allMdx.edges;

  return pages.map(({ node }, index) => {
    // Use a permalink based on the frontmatter slug in each markdown file header.
    const permalink = node.frontmatter.slug;

    // The path to the previous page.
    const previousPath =
      index === pages.length - 1
        ? null
        : `${articlePathPrefix}/${pages[index + 1].node.frontmatter.slug}`;

    // The path to the next page.
    const nextPath =
      index === 0
        ? null
        : `${articlePathPrefix}/${pages[index - 1].node.frontmatter.id}`;

    return createPage({
      path: `${articlePathPrefix}/${permalink}`,
      component: articleTemplate,
      context: {
        permalink,
        previousPath,
        nextPath,
      },
    });
  });
};
