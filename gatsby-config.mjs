/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 *
 * @type {import('gatsby').GatsbyConfig}
 */
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const {
  URL: SITE_URL = "https://agingdeveloper.com",
  DEPLOY_PRIME_URL: DEPLOY_URL = SITE_URL,
  CONTEXT: DEPLOY_CONTEXT = "deploy-preview",
} = process.env;

const siteUrl = DEPLOY_CONTEXT === "production" ? SITE_URL : DEPLOY_URL;

const config = {
  siteMetadata: {
    siteUrl,
  },
  trailingSlash: "never",
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-remove-fingerprints",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-yaml",
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
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content`,
        fastHash: true,
      },
    },
  ],
};

export default config;
