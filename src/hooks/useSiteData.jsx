import {graphql, useStaticQuery} from "gatsby";

export const useSiteData = () => {
  const data = useStaticQuery(graphql`
  query SiteQuery {
    siteYaml(slug: {eq: "agingdeveloper"}) {
      title
      tagline
      category
      lang
      url
      repository
      published
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

  const siteYaml = data.siteYaml;
  siteYaml.url = data.site.siteMetadata.siteUrl;

  return siteYaml;
};
