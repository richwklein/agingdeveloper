import React from "react";
import {graphql} from "gatsby";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import TagGrid from "../components/TagGrid";
import TagBreadcrumb from "../components/TagBreadCrumb";

// TODO everything
const PageCategory = ({data}) => {
  const {group, totalCount} = data.allMdx;

  return (
    <Box>
      <TagBreadcrumb isCategory={true} />
      <TagGrid tags={group} totalCount={totalCount} isCategory={true} />
    </Box>
  );
};

PageCategory.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export const Head = () => {
  return <title>Categories</title>;
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


