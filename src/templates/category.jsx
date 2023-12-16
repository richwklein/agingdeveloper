import React from "react";
import {graphql} from "gatsby";
import {Box} from "@mui/material";
import DisplayLimit from "../components/DisplayLimit";
import SecondaryArticleGrid from "../components/SecondaryArticleGrid";
import TagBreadcrumb from "../components/TagBreadCrumb";
import {mdxNodeToArticleDigest} from "../props/converters.mjs";

// Maximum number of articles to display on the page
const maxDisplay = 30;

// TODO proptypes and seo
const CategoryTemplate = ({data, pageContext}) => {
  const {category} = pageContext;
  const {edges, totalCount} = data.allMdx;
  const articles = edges.map((edge) => {
    return mdxNodeToArticleDigest(edge.node);
  });

  return (
    <Box>
      <TagBreadcrumb name={category} isCategory={true} />
      <SecondaryArticleGrid articles={articles} />
      <DisplayLimit limit={maxDisplay} total={totalCount} />
    </Box>
  );
};

export const Head = () => {
  return <title>Category Template</title>;
};

// TODO map the edges into article digest types
export const pageQuery = graphql`
  query($category: String) {
    allMdx(
      limit: 30
      filter: {frontmatter: {category: {eq: $category}}}
      sort: [{frontmatter: {date: DESC}}, {frontmatter: {title: ASC}}]
    ) {
      edges {
        node {
          excerpt(pruneLength: 160)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featured {
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 524
                    placeholder: BLURRED
                    layout: CONSTRAINED
                    aspectRatio: 1.78
                  )
                }
              }
            }
          }
        }
      }
      totalCount
    }
  }
`;

export default CategoryTemplate;


