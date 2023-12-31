import React from "react";
import {graphql} from "gatsby";
import PropTypes from "prop-types";
import AuthorGrid from "../components/AuthorGrid";
import BreadcrumbBlock from "../components/BreadcrumbBlock";
import PageSEO from "../components/PageSEO";
import {AuthorDigestProps} from "../props";

const PageAuthor = ({data}) => {
  const authors = data.allAuthorYaml.edges.map((edge) => {
    return {
      name: edge.node.name,
      slug: edge.node.slug,
      email: edge.node.email,
      tagline: edge.node.tagline,
      image: edge.node.image.childImageSharp.gatsbyImageData,
    };
  });

  return (
    <>
      <BreadcrumbBlock head={{name: "Authors", path: "/author"}} />
      <AuthorGrid authors={authors} />
    </>
  );
};

/**
 * @typedef PageIndexProps - The props for the index page.
 * @property {Object} data - The page data.
 * @property {Object} data.allAuthorYaml - A graphql query for all authors.
 * @property {Object[]} data.allAuthorYaml.edges - All the nodes in the lead graphql.
* @property {AuthorDigestProps} data.allMdx.edges.node - The author nodes.
 */
PageAuthor.propTypes = {
  data: PropTypes.shape({
    allAuthorYaml: PropTypes.shape({
      edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: AuthorDigestProps.isRequired,
          }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default PageAuthor;

export const Head = () => {
  return (<PageSEO title={"Authors"} path="/author" />);
};

export const pageQuery = graphql`
  query {
    allAuthorYaml(sort: {name: ASC}) {
      edges {
        node {
          name
          slug
          tagline
          image {
            childImageSharp {
                  gatsbyImageData(
                    width: 72,
                    height: 72,
                    placeholder: BLURRED
                    layout: CONSTRAINED
                  )
          }
        }
      }
    }
  }
  }
`;
