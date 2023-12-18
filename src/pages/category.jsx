import React from "react";
import {graphql} from "gatsby";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import TagGrid from "../components/TagGrid";
import TagBreadcrumb from "../components/TagBreadCrumb";
import {GroupsNodeProps} from "../props";
import PageSEO from "../components/PageSEO";

/**
 * React component that renders a page with all the article categories.
 *
 * @param {PageCategoryProps} props - The category page props.
 * @return {React.ReactElement} - The react component.
 */
const PageCategory = ({data}) => {
  const {group, totalCount} = data.allMdx;

  return (
    <Box>
      <TagBreadcrumb isCategory={true} />
      <TagGrid tags={group} totalCount={totalCount} isCategory={true} />
    </Box>
  );
};

/**
 * @typedef PageCategoryProps - The props for the category page.
 * @property {Object} data - The page data.
 * @property {GroupsNodeProps} data.allMdx - The grouped nodes in the mdx.
 */
PageCategory.propTypes = {
  data: PropTypes.shape({
    allMdx: GroupsNodeProps.isRequired,
  }).isRequired,
};

export const Head = () => {
  return <PageSEO title="Categories" path="/category" />;
};

export const pageQuery = graphql`
  query {
    allMdx {
      group(field: { frontmatter: { category: SELECT } }) {
        name: fieldValue
        count: totalCount
      }
      totalCount
    }
  }
`;

export default PageCategory;


