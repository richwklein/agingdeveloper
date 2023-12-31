import React from "react";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import {Grid} from "@mui/material";
import PropTypes from "prop-types";
import slug from "slug";
import {TagWithCountProps} from "../props";
import InternalLink from "./InternalLink";

/**
 * React component used to render a tag in either the {@link ArticleTagGrid} or
 * {@link TagGrid} component.
 *
 * @param {TagProps} props - The tags and total props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <Tag
 *   name={tag.name}
 *   weight={calculateWeight(tag.count, totalCount)}
 *   isCategory={isCategory} />
 */
export const Tag = ({name, weight=300, isCategory=false}) => {
  const icon = isCategory ? <FolderOutlinedIcon fontSize="inherit" sx={{mr: .3}} /> :
    <TagOutlinedIcon fontSize="inherit" sx={{mr: .3}} />;
  const url = isCategory ? `/category/${slug(name)}` : `/tag/${slug(name)}`;
  return (
    <InternalLink
      underline="hover"
      sx={{
        display: "flex",
        alignItems: "center",
        textTransform: "capitalize",
        fontWeight: weight,
      }}
      color="primary"
      to={url}
    >
      {icon}
      {name}
    </InternalLink>

  );
};

/**
 * @typedef TagProps - The tag props.
 * @property {string} name - The name of the tag.
 * @property {number} [weight=300] - The font weight to render the tag.
 * @property {bool} [isCategory=false] - If the tags represent categories.
 *
 */
Tag.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.number,
  isCategory: PropTypes.bool,
};

/**
 * Calculates a font weight between 300 and 900 for tag display.
 *
 * @param {number} count - The number of times the tag has occurred.
 * @param {number} totalCount - The total number of tags.
 * @return {number} - The font weight.
 */
export const calculateWeight = (count, totalCount) => {
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
export const TagGrid = ({tags, totalCount, isCategory=false}) => {
  return (
    <Grid container spacing={2} sx={{mt: 2}}>
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
