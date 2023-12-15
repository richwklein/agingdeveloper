
import React from "react";
import InternalLink from "./InternalLink";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import PropTypes from "prop-types";
import slug from "slug";

/**
 * React component used to render a tag in either the {@link ArticleTagGrid} or
 * {@link TagGrid}.
 *
 * @param {TagType} props - The tags and total.
 * @return {React.ReactElement}
 *
 * @example
 * <Tag
 *   name={tag.name}
 *   weight={calculateWeight(tag.count, totalCount)}
 *   isCategory={isCategory} />
 */
const Tag = ({name, weight=300, isCategory=false}) => {
  const icon = isCategory ? <FolderOutlinedIcon fontSize="inherit" sx={{mr: .3}} /> :
    <TagOutlinedIcon fontSize="inherit" sx={{mr: .3}} />;
  const url = isCategory ? `/category/${slug(name)}` : `/tag/${slug(name)}`;
  return (
    <InternalLink
      underline="hover"
      sx={{
        display: "flex",
        alignItems: "center",
        textTransform: "lowercase",
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
 * @typedef TagType - The tag PropTypes.
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

export default Tag;
