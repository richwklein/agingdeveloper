import React from "react";
import Meta from "../meta";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";

const SidebarLogo = () => {
  const { siteTitle } = Meta();
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "wizard-logo.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 230, maxHeight: 230, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div id="sidebar-logo">
      <Link to="/">
        <Img
          fluid={data.file.childImageSharp.fluid}
          title={siteTitle}
          alt={siteTitle}
          loading="eager"
          className="sidebar-logo-image"
        />
      </Link>
    </div>
  );
};

export default SidebarLogo;
