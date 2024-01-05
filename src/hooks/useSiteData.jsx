import {graphql, useStaticQuery} from "gatsby";

/**
 * React hook that does a graphql query on the site yaml metadata.
 *
 * @return {Object} - The site metadata nodes.
 */
export const useSiteData = () => {
  const data = useStaticQuery(graphql`
  query SiteQuery {
    siteJson(slug: {eq: "agingdeveloper"}) {
      title
      tagline
      category
      lang
      url
      repository
      twitterUsername
      image {
        publicURL
        childImageSharp {
          gatsbyImageData(
            width: 72
            height: 72
            placeholder: BLURRED
            layout: FIXED
          )
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`);

  const siteJson = data.siteJson;
  siteJson.url = data.site.siteMetadata.siteUrl;

  return siteJson;
};

export default useSiteData;
