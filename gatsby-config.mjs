/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 *
 * @type {import('gatsby').GatsbyConfig}
 */
import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteData = JSON.parse(readFileSync("content/data/site.json"))[0];

const {
  ANALYTICS_TRACKING_ID,
  URL: SITE_URL = siteData.url,
  DEPLOY_PRIME_URL: DEPLOY_URL = SITE_URL,
  CONTEXT: DEPLOY_CONTEXT = "deploy-preview",
} = process.env;

const siteUrl = DEPLOY_CONTEXT === "production" ? SITE_URL : DEPLOY_URL;
const analyticsTrackingId = ANALYTICS_TRACKING_ID || "INVALID";

const config = {
  siteMetadata: {
    siteUrl,
  },
  trailingSlash: "never",
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-remove-fingerprints",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-json",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [analyticsTrackingId],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: siteData.title,
        short_name: siteData.title,
        description: siteData.tagline,
        categories: [siteData.category],
        start_url: "/",
        display: "browser",
        background_color: siteData.background,
        theme_color: siteData.theme,
        lang: siteData.lang,
        icon: join(__dirname, "content", "data", siteData.icon),
        scope: siteUrl,
        cache_busting_mode: "none",
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
              maxWidth: 1200,
              wrapperStyle: "border: 1px solid rgba(0, 0, 0, 0.12)",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => DEPLOY_CONTEXT,
        host: siteUrl,
        sitemap: siteUrl + "/sitemap-index.xml",
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
          "dev": {
            policy: [{userAgent: "*", disallow: ["/"]}],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: [
            "Helvetica Neue",
            "Merriweather",
            "Merriweather Sans",
          ],
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content`,
        fastHash: true,
      },
    },
  ],
};

export default config;
