import React from "react";
import {Grid} from "@mui/material";
import PropTypes from "prop-types";
import Tag from "./Tag";

const calculateWeight = (count, totalCount) => {
  // calculate a weight between 400 and 900 (which is normal to bold font weight)
  const oldRange = totalCount - 1;
  const newValue = (((count - 1) * 600) / oldRange) + 300;
  return Math.round(newValue/100)*100;
};
calculateWeight.propTypes = {
  count: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

const TagGrid = ({tags, totalCount, isCategory=false}) => {
  return (
    <Grid container spacing={2}>
      {tags.map((tag) => {
        return (
          <Grid item md={2} sm={6} xs={12} key={tag.name}>
            <Tag
              name={tag.name}
              weight={calculateWeight(tag.count, totalCount)}
              isCategory={isCategory} />
          </Grid>
        );
      })}
    </Grid>
  );
};

TagGrid.propTypes = {
  tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      }),
  ).isRequired,
  totalCount: PropTypes.number.isRequired,
  isCategory: PropTypes.bool,
};

export default TagGrid;
