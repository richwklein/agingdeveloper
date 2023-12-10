
import React from "react";
import InternalLink from "./InternalLink";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import PropTypes from "prop-types";
import slug from "slug";

const Tag = ({name, weight=400, isCategory=false}) => {
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

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.number,
  isCategory: PropTypes.bool,
};

export default Tag;
