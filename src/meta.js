import { graphql, useStaticQuery } from "gatsby";

const Meta = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
          siteTitle
          social {
            facebook
            twitter
            instagram
            linkedin
            github
          }
        }
      }
    }
  `);
  return data.site.siteMetadata;
};

export default Meta;
