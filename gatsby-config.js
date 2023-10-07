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
const title = "The Aging Developer";
const description = "for growing old in the software development community";
const category = "Technology";
const lang = "en-US";

module.exports = {
    siteMetadata: {
        siteUrl: siteUrl,
        title: title,
        description: description,
        repository: "https://github.com/richwklein/agingdeveloper",
        category: category,
    },
    plugins: []
};