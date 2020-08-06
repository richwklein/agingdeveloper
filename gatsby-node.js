const path = require("path");
const lodash = require("lodash");

// Create pages based on graph data and templates
exports.createPages = async ({actions, graphql, reporter}) => {
  const {createPage} = actions;
  const articleTemplate = path.resolve("src/templates/article.js");
  const articlePathPrefix = "/article";
  const tagTemplate = path.resolve("src/templates/tag.js");
  const tagPathPrefix = "/tag";

  const result = await graphql(`
    {
      articles: allMdx(
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
      tags: allMdx {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  // Report any errors if they occurred.
  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  // Iterate through the article query to create individual pages.
  const articles = result.data.articles.edges;

  articles.map(({node}, index) => {
    // Use a permalink based on the frontmatter url in each markdown file header.
    const currentPath = node.frontmatter.slug;

    // The path to the previous page.
    const previousPath =
      index === articles.length - 1 ?
        null :
        `${articles[index + 1].node.frontmatter.slug}`;

    // The path to the next page.
    const nextPath =
      index === 0 ?
        null :
        `${articles[index - 1].node.frontmatter.slug}`;


    return createPage({
      path: `${articlePathPrefix}${currentPath}`,
      component: articleTemplate,
      context: {
        currentPath,
        previousPath,
        nextPath,
      },
    });
  });

  const tags = result.data.tags.group;
  tags.map((tag, index) => {
    return createPage({
      path: `${tagPathPrefix}/${lodash.kebabCase(tag.fieldValue)}`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};
