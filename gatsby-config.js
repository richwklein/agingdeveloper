/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const {
  NODE_ENV,
  ANALYTICS_TRACKING_ID,
  URL: NETLIFY_SITE_URL = "https://agingdeveloper.com",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;

const siteUrl =
  NETLIFY_ENV === "production" ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;
const analyticsTrackingId = ANALYTICS_TRACKING_ID || null;

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
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => NETLIFY_ENV,
        host: siteUrl,
        sitemap: siteUrl + "/sitemap.xml",
        env: {
          production: {
            policy: [{ userAgent: "*" }]
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null
          }
        }
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: analyticsTrackingId,
        respectDNT: true
      }
    },
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: siteUrl
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/content/images`
      }
    }
  ]
};
