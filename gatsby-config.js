/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const siteUrl = "https://agingdeveloper.com";

module.exports = {
  siteMetadata: {
    siteUrl: siteUrl,
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
        host: siteUrl,
        sitemap: siteUrl + "/sitemap.xml",
        resolveEnv: () => process.env.NODE_ENV,
        env: {
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }]
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }]
          },
          production: {
            policy: [{ userAgent: "*", allow: "/" }]
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: siteUrl
      }
    }
  ]
};
