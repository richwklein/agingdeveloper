const moment = require("moment");
const path = require("path");
const lodash = require("lodash");
const Feed = require("feed").Feed;
const fs = require("fs");

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
    reporter.error(result.errors);
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  // Iterate through our various graghql queries in parallel creating pages
  return Promise.all([
    createArticlePages(createPage, result.data.articles.edges),
    createTagPages(createPage, result.data.tags.group),
    createCategoryPages(createPage, result.data.categories.group),
    createAuthorPages(createPage, result.data.authors.edges),
  ]);
};

const createArticlePages = async (createPage, articles) => {
  const template = path.resolve("src/templates/article.js");
  const prefix = "/article";

  return Promise.all(articles.map( async ({node}, index) => {
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
  }));
};

const createTagPages = async (createPage, tags) => {
  const template = path.resolve("src/templates/tag.js");
  const prefix = "/tag";

  return Promise.all(tags.map( async (tag, index) => {
    return createPage({
      path: `${prefix}/${lodash.kebabCase(tag.fieldValue)}`,
      component: template,
      context: {
        tag: tag.fieldValue,
      },
    });
  }));
};

const createCategoryPages = async (createPage, categories) => {
  const template = path.resolve("src/templates/category.js");
  const prefix = "/category";

  return Promise.all(categories.map( async (category, index) => {
    return createPage({
      path: `${prefix}/${lodash.kebabCase(category.fieldValue)}`,
      component: template,
      context: {
        category: category.fieldValue,
      },
    });
  }));
};

const createAuthorPages = async (createPage, authors) => {
  const template = path.resolve("src/templates/author.js");
  const prefix = "/author";

  return Promise.all(authors.map( async ({node}, index) => {
    const currentPath = node.id;

    return createPage({
      path: `${prefix}/${currentPath}`,
      component: template,
      context: {
        currentPath: currentPath,
      },
    });
  }));
};

exports.onPostBuild = async ({graphql, reporter}) => {
  const activity = reporter.activityTimer("Building feeds");
  activity.start();

  const publicPath = "./public";
  const feedOptions = {
    "rss": {
      func: "rss2",
      path: "/rss.xml",
    },
    "atom": {
      func: "atom1",
      path: "/atom.xml",
    },
    "json": {
      func: "json1",
      path: "/feed.json",
    },
  };

  const result = await graphql(`
    {
      site {
        siteMetadata {
          siteUrl
          title
          description
          category
        }
      }
      file(relativePath: { eq: "image/avatar/wizard.jpg" }) {
        childImageSharp {
          fixed(width: 1232, height: 693, cropFocus: CENTER, toFormat: PNG) {
            src
          }
        }
      }
      allAuthorYaml(sort: { fields: name, order: DESC }) {
        edges {
          node {
            id
            name
            email
          }
        }
      }
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
              description
              date
              image {
                childImageSharp {
                  fixed(
                    width: 1232, 
                    height: 693, 
                    cropFocus: CENTER, 
                    toFormat: PNG) {
                      src
                  }
                }
              }
              author {
                id
                name
                email
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.error(result.errors);
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  const metadata = result.data.site.siteMetadata;
  const image = result.data.file.childImageSharp.fixed.src;
  const authors = result.data.allAuthorYaml.edges;
  const articles = result.data.allMdx.edges;

  const feedLinks = {};
  for (const [key, option] of Object.entries(feedOptions)) {
    feedLinks[key] = `${metadata.siteUrl}${option.path}`;
  }

  const feed = new Feed({
    title: metadata.title,
    description: metadata.description,
    id: metadata.siteUrl,
    link: metadata.siteUrl,
    language: "en",
    image: `${metadata.siteUrl}${image}`,
    favicon: `${metadata.siteUrl}/favicon.ico`,
    feedLinks: feedLinks,
  });

  feed.addCategory(metadata.category);
  authors.map(({node: {id, name, email}}) => {
    return feed.addContributor({
      name: name,
      email: email,
      link: `${metadata.siteUrl}/author/${id}`,
    });
  });

  articles.map(({node}) => {
    const {title, slug, description, date} = node.frontmatter;
    const author = node.frontmatter.author;
    const image = node.frontmatter.image.childImageSharp.fixed;
    const asDate = moment(date).toDate();

    return feed.addItem({
      title: title,
      id: slug,
      link: `${metadata.siteUrl}/article/${slug}`,
      description: description,
      date: asDate,
      published: asDate,
      author: {
        name: author.name,
        email: author.email,
        link: `${metadata.siteUrl}/author/${author.id}`,
      },
      image: {
        url: `${metadata.siteUrl}${image.src}`,
      },
    });
  });

  activity.end();

  const options = Object.values(feedOptions);
  return Promise.all(
      options.map(async (option) => {
        const outputPath = path.join(publicPath, option.path);
        const activity = reporter.activityTimer(`write out ${option.path}`);
        activity.start();

        return new Promise((resolve, reject) => {
          fs.writeFile(
              outputPath,
              feed[option.func].call(),
              {encoding: "utf8"},
              (err) => {
                if (err) {
                  reject(err);
                }
                activity.end();
                resolve();
              },
          );
        });
      }),
  );
};
