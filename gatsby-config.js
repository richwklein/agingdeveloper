/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const {
  ANALYTICS_TRACKING_ID,
  URL: SITE_URL = "https://agingdeveloper.com",
  DEPLOY_PRIME_URL: DEPLOY_URL = SITE_URL,
  CONTEXT: DEPLOY_CONTEXT = "deploy-preview",
} = process.env;

const siteUrl = DEPLOY_CONTEXT === "production" ? SITE_URL : DEPLOY_URL;
const analyticsTrackingId = ANALYTICS_TRACKING_ID || "";

module.exports = {
  siteMetadata: {
    siteUrl: siteUrl,
    title: "The Aging Developer",
    description: "A site for growing old in the software development community",
    repository: "https://github.com/richwklein/agingdeveloper",
  },
  plugins: [
    "gatsby-plugin-material-ui",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-remark-images",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-disqus",
      options: {
        shortname: "agingdeveloper",
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: analyticsTrackingId,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1280,
              maxHeight: 720,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-prefetch-google-fonts",
      options: {
        fonts: [
          {family: "Roboto"},
          {family: "Merriweather"},
          {family: "Work Sans"},
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-helmet-canonical-urls",
      options: {
        siteUrl: siteUrl,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => DEPLOY_CONTEXT,
        host: siteUrl,
        sitemap: siteUrl + "/sitemap.xml",
        env: {
          "production": {
            policy: [{userAgent: "*", allow: ["/"]}],
          },
          "branch-deploy": {
            policy: [{userAgent: "*", disallow: ["/"]}],
            sitemap: null,
            host: null,
          },
          "deploy-preview": {
            policy: [{userAgent: "*", disallow: ["/"]}],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content`,
      },
    },
  ],
};
