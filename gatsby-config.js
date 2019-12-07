/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const netlifySiteUrl = "https://agingdeveloper.com";
const netlifyEnv = process.env.NODE_ENV;

module.exports = {
  siteMetadata: {
    siteUrl: netlifySiteUrl,
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
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => netlifyEnv,
        env: {
          production: {
            host: netlifySiteUrl,
            sitemap: netlifySiteUrl + "/sitemap.xml",
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
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: netlifySiteUrl
      }
    }
  ]
};
