/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 *
 * @type {import('gatsby').GatsbyConfig}
 */
const {
  URL: SITE_URL = "https://agingdeveloper.com",
  DEPLOY_PRIME_URL: DEPLOY_URL = SITE_URL,
  CONTEXT: DEPLOY_CONTEXT = "deploy-preview",
} = process.env;

const siteUrl = DEPLOY_CONTEXT === "production" ? SITE_URL : DEPLOY_URL;

module.exports = {
  siteMetadata: {
    siteUrl: siteUrl,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "articles",
        path: `${__dirname}/content/article/`,
        fastHash: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/content/data/`,
        fastHash: true,
      },
    },
    {
      resolve: "gatsby-transformer-yaml",
      options: {
        typeName: ({node, object, isArray}) => node.name + "Yaml",
      },
    },
  ],
};
