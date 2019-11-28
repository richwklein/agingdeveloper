/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = "https://agingdeveloper.com",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
  siteMetadata: {
    siteUrl,
    siteTitle: "The Aging Developer",
    social: {
      facebook: "https://www.facebook.com/richwklein",
      twitter: "https://twitter.com/richwklein",
      instagram: "https://www.instagram.com/richwklein/",
      linkedin: "https://www.linkedin.com/in/richwklein/",
      github: "http://github.com/richwklein/"
    }
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            host: siteUrl,
            sitemap: siteUrl + "/sitemap.xml",
            policy: [{ userAgent: "*" }]
          },
          "branch-deploy": {
            host: null,
            sitemap: null,
            policy: [{ userAgent: "*", disallow: ["/"] }]
          },
          "deploy-preview": {
            host: null,
            sitemap: null,
            policy: [{ userAgent: "*", disallow: ["/"] }]
          }
        }
      }
    }
  ]
};
