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
const analyticsTrackingId = ANALYTICS_TRACKING_ID || "INVALID";

module.exports = {
  siteMetadata: {
    siteUrl: siteUrl,
    title: "The Aging Developer",
    description: "for growing old in the software development community",
    repository: "https://github.com/richwklein/agingdeveloper",
    category: "Technology",
  },
  mapping: {
    "Mdx.frontmatter.author": "AuthorYaml",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-remove-fingerprints",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-remark-images",
    "gatsby-transformer-sharp",
    "gatsby-transformer-yaml",
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
      resolve: "gatsby-plugin-material-ui",
      options: {
        stylesProvider: {
          injectFirst: true,
        },
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
              maxWidth: 1198,
              withWebp: true,
              wrapperStyle: "border: 1px solid rgba(0, 0, 0, 0.12)",
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Roboto", "Merriweather", "Work Sans"],
        },
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
