import React from "react";
import {Grid} from "@mui/material";
import PropTypes from "prop-types";
import Tag from "./Tag";
import {TagWithCountProps} from "../props";

/**
 * Calculates a font weight between 300 and 900 for tag display.
 *
 * @param {number} count - The number of times the tag has occurred.
 * @param {number} totalCount - The total number of tags.
 * @return {number} - The font weight.
 * @ignore
 */
const calculateWeight = (count, totalCount) => {
  const oldRange = totalCount - 1;
  const newValue = (((count - 1) * 600) / oldRange) + 300;
  return Math.round(newValue/100)*100;
};

/**
 * React component for rendering a grid of tags or categories.
 *
 * @param {TagGridProps} props - The tag grid props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <TagGrid tags={group} totalCount={totalCount} isCategory={true} />
 */
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

/**
 * @typedef TagGridProps - The tag grid props.
 * @property {TagWithCountProps[]} tags - The list of tags.
 * @property {number} totalCount - The total number of tags.
 * @property {bool} [isCategory=false] - If the tags represent categories.
 */
TagGrid.propTypes = {
  tags: PropTypes.arrayOf(TagWithCountProps),
  totalCount: PropTypes.number.isRequired,
  isCategory: PropTypes.bool,
};

export default TagGrid;
