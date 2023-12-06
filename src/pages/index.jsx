import React from "react";
import {graphql} from "gatsby";
import InternalLink from "../components/common/InternalLink";
import HeroBlock from "../components/index/HeroBlock";

const IndexPage = ({data: {lead, remaining}}) => {
  const {frontmatter: {title, slug, featured}, excerpt} = lead.edges[0].node;
  const featuredImage = featured.image.childImageSharp.gatsbyImageData;

  return (
    <main>
      <h1>Home Page</h1>
      <HeroBlock hero={{title: title, slug: slug, excerpt: excerpt, image: featuredImage}} />
      <InternalLink to="/about/">About</InternalLink>
    </main>
  );
};

export const Head = () => {
  return <title>Home Page</title>;
};


export const pageQuery = graphql`
  query {
    lead: allMdx(
      limit: 1
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featured {
              image {
              childImageSharp {
                gatsbyImageData(
                width: 1150, 
                height: 493,
                placeholder: BLURRED
                layout: CONSTRAINED
              )
                }
              }
            }
          }
        }
      }
    },
    remaining: allMdx(
      limit: 6
      skip: 1
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featured {
              image {
              childImageSharp {
                gatsbyImageData(
                width: 380,
                height: 213, 
                placeholder: BLURRED
                layout: CONSTRAINED
              )
                }
              }
            }
          }
        }
      }
    }
  }
`;


export default IndexPage;
