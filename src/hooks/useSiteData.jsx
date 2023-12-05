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
      image {
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
  }
`);

  return data.siteYaml;
};
