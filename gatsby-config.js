/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const {
  NODE_ENV,
  ANALYTICS_TRACKING_ID,
  ADS_TRACKING_ID,
  URL: NETLIFY_SITE_URL = "https://agingdeveloper.com",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;

const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;
const analyticsTrackingId = ANALYTICS_TRACKING_ID || null;
const adsTrackingId = ADS_TRACKING_ID || null;

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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: analyticsTrackingId
      }
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        googleAdClientId: adsTrackingId
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
