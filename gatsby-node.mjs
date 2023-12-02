import {resolve as pathResolve} from "path";

export const createPages = ({graphql, actions}) => {
  // A Gatsby function which will be used to create the post pages from GraphQL data and a template.
  const {createPage} = actions;

  // This gets ALL markdown posts, sorting by most recent date first.
  // We only need to retrieve the slug so that the post template can use this
  // to lookup all the other content from in a page query (see next section).
  return new Promise((resolve) => {
    graphql(`
      {
        allMdx(sort: {frontmatter: {date: DESC}}) {
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
      }
    `).then((result) => {
      const template = pathResolve("src/templates/article.jsx");
      const prefix = "/article";

      result.data.allMdx.edges.forEach(({node}) => {
        const currentPath = node.frontmatter.slug;

        return createPage({
          path: `${prefix}/${currentPath}`,
          component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
          context: {
            currentPath,
          },
        });
      });
      resolve();
    });
  });
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
    "type Mdx implements Node { frontmatter: Frontmatter }",
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        featured: {
          type: "FeaturedYaml",
          resolve: (source, args, context, info) => {
            return context.nodeModel.findOne({
              type: "FeaturedYaml",
              query: {
                filter: {slug: {eq: source.featured}},
              },
            });
          },
        },
      },
    }),
  ];
  createTypes(typeDefs);
};
