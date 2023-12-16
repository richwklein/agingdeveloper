import React from "react";
import {graphql} from "gatsby";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import TagGrid from "../components/TagGrid";
import TagBreadcrumb from "../components/TagBreadCrumb";
import {GroupsNodeProps} from "../props";
import PageSEO from "../components/PageSEO";

/**
 * React component that renders a page with all the article tags.
 *
 * @param {PageTagProps} props - The tag page props.
 * @return {React.ReactElement} - The react component.
 */
const PageTag = ({data}) => {
  const {group, totalCount} = data.allMdx;

  return (
    <Box>
      <TagBreadcrumb />
      <TagGrid tags={group} totalCount={totalCount} />
    </Box>
  );
};

/**
 * @typedef PageTagProps - The props for the category page.
 * @property {Object} data - The page data.
 * @property {GroupsNodeProps} data.allMdx - The grouped nodes in the mdx.
 */
PageTag.propTypes = {
  data: PropTypes.shape({
    allMdx: GroupsNodeProps.isRequired,
  }).isRequired,
};

export const Head = () => {
  return <PageSEO title="Tags" />;
};

export const pageQuery = graphql`
  query {
    allMdx {
      group(field: { frontmatter: { tags: SELECT } }) {
        name: fieldValue
        count: totalCount
      }
      totalCount
    }
  }
`;


export default PageTag;


