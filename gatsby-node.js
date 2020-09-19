const path = require("path");
const lodash = require("lodash");

// Create pages based on graph data and templates
exports.createPages = async ({actions, graphql, reporter}) => {
  const {createPage} = actions;

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

      authors: allAuthorYaml(sort: { fields: name, order: DESC }) {
        edges {
          node {
            id
          }
        }
      }

      tags: allMdx {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }

      categories: allMdx {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  // Iterate through the article query to create individual pages.
  createArticlePages(createPage, result.data.articles.edges);


  // Iterate tags to create tag pages
  createTagPages(createPage, result.data.tags.group);


  // Iterate categories to create category pages
  createCategoryPages(createPage, result.data.categories.group);

  // Iterate authors to create author pages
  createAuthorPages(createPage, result.data.authors.edges);
};

const createArticlePages = (createPage, articles) => {
  const template = path.resolve("src/templates/article.js");
  const prefix = "/article";

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
      path: `${prefix}/${currentPath}`,
      component: template,
      context: {
        currentPath,
        previousPath,
        nextPath,
      },
    });
  });
};

const createTagPages = (createPage, tags) => {
  const template = path.resolve("src/templates/tag.js");
  const prefix = "/tag";

  tags.map((tag, index) => {
    return createPage({
      path: `${prefix}/${lodash.kebabCase(tag.fieldValue)}`,
      component: template,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

const createCategoryPages = (createPage, categories) => {
  const template = path.resolve("src/templates/category.js");
  const prefix = "/category";

  categories.map((category, index) => {
    return createPage({
      path: `${prefix}/${lodash.kebabCase(category.fieldValue)}`,
      component: template,
      context: {
        category: category.fieldValue,
      },
    });
  });
};

const createAuthorPages = (createPage, authors) => {
  const template = path.resolve("src/templates/author.js");
  const prefix = "/author";

  authors.map(({node}, index) => {
    const currentPath = node.id;

    return createPage({
      path: `${prefix}/${currentPath}`,
      component: template,
      context: {
        currentPath: currentPath,
      },
    });
  });
};
