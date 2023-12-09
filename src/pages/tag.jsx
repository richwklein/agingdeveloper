import React from "react";
import {graphql} from "gatsby";
import {Box, Divider} from "@mui/material";
import PropTypes from "prop-types";
import TagGrid from "../components/TagGrid";

// TODO everything
const PageTag = ({data}) => {
  const {group, totalCount} = data.allMdx;

  return (
    <Box>
      <Divider sx={{mb: 4}}>{"Tags"}</Divider>
      <TagGrid tags={group} totalCount={totalCount} />
    </Box>
  );
};

PageTag.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export const Head = () => {
  return <title>Tags</title>;
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


