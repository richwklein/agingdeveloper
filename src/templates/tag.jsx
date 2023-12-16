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
const TagTemplate = ({data, pageContext}) => {
  const {tag} = pageContext;
  const {edges, totalCount} = data.allMdx;
  const articles = edges.map((edge) => {
    return mdxNodeToArticleDigest(edge.node);
  });
  return (
    <Box>
      <TagBreadcrumb name={tag} />
      <SecondaryArticleGrid articles={articles} />
      <DisplayLimit limit={maxDisplay} total={totalCount} />
    </Box>
  );
};

export const Head = () => {
  return <title>Tag Template</title>;
};

// TODO map the edges into article digest types
export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 30
      filter: {frontmatter: {tags: {eq: $tag}}}
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

export default TagTemplate;


