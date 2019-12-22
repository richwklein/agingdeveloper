import React from "react";
import Meta from "../meta";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const SiteLogo = () => {
  const { siteTitle } = Meta();
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "wizard-logo.jpg" }) {
        childImageSharp {
          fixed(width: 400, height: 300, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <a href="/" title={siteTitle} className="site-logo">
      <Img
        fixed={data.file.childImageSharp.fixed}
        title={siteTitle}
        alt={siteTitle}
        loading="eager"
      />
    </a>
  );
};

export default SiteLogo;
