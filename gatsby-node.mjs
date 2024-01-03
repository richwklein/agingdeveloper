import {Feed} from "feed";
import {writeFileSync} from "fs";
import {join as pathJoin, resolve as pathResolve} from "path";
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

export const onPostBuild = async ({graphql, reporter}) => {
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
      siteYaml(slug: {eq: "agingdeveloper"}) {
        title
        tagline
        category
        lang
        image {
          childImageSharp {
            gatsbyImageData(width: 1152, formats: PNG, layout: FIXED, height: 494)
          }
        }
        icon {
          childImageSharp {
            gatsbyImageData(width: 32, height:32, layout:FIXED, formats:PNG)
          }
        }
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
      allAuthorYaml(sort: {name: ASC}) {
        edges {
          node {
            slug
            name
            email
          }
        }
      }
      allMdx(
        sort: [{frontmatter: {published: DESC}}, {frontmatter: {title: ASC}}]
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
              description
              published
              featured {
                image {
                  childImageSharp {
                    gatsbyImageData(width: 1152, formats: PNG, layout: FIXED, height: 494)
                  }
                }
              author {
                slug
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

  const siteData = result.data.siteYaml;
  siteData.url = result.data.site.siteMetadata.siteUrl;
  const siteImage = siteData.image.childImageSharp.gatsbyImageData.images.fallback.src;
  const siteIcon = siteData.image.childImageSharp.gatsbyImageData.images.fallback.src;
  const authors = result.data.allAuthorYaml.edges;
  const articles = result.data.allMdx.edges;

  const feedLinks = {};
  for (const [key, option] of Object.entries(feedOptions)) {
    feedLinks[key] = `${siteData.url}${option.path}`;
  }

  const feed = new Feed({
    title: siteData.title,
    description: siteData.tagline,
    id: siteData.url,
    link: siteData.url,
    language: "en",
    image: `${siteData.url}${siteImage}`,
    favicon: `${siteData.url}${siteIcon}`,
    feedLinks: feedLinks,
  });

  feed.addCategory(siteData.category);
  authors.map(({node: {slug, name, email}}) => {
    return feed.addContributor({
      name: name,
      email: email,
      link: `${siteData.url}/author/${slug}`,
    });
  });

  articles.map(({node}) => {
    const {title, slug, description, published} = node.frontmatter;
    const author = node.frontmatter.author;
    const featured = node.frontmatter.featured;
    const image = featured.image.childImageSharp.gatsbyImageData.images.fallback.src;

    return feed.addItem({
      title: title,
      id: slug,
      link: `${siteData.url}/article/${slug}`,
      description: description,
      date: published,
      published: published,
      content: node.html,
      author: {
        name: author.name,
        email: author.email,
        link: `${siteData.url}/author/${author.slug}`,
      },
      image: {
        url: `${siteData.url}${image.publicURL}`,
      },
    });
  });

  const options = Object.values(feedOptions);
  options.map((option) => {
    const outputPath = pathJoin(publicPath, option.path);

    writeFileSync(
        outputPath,
        feed[option.func].call(),
        {encoding: "utf8"},
    );
  });

  activity.end();
};
