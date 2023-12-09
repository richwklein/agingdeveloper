import React from "react";
import {Grid} from "@mui/material";
import InternalLink from "./InternalLink";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import PropTypes from "prop-types";
import slug from "slug";

export const Tag = ({name, isCategory=false}) => {
  const icon = isCategory ? <FolderOutlinedIcon fontSize="inherit" sx={{mr: .3}} /> :
    <TagOutlinedIcon fontSize="inherit" sx={{mr: .3}} />;
  const url = isCategory ? `/category/${slug(name)}` : `/tag/${slug(name)}`;
  return (
    <InternalLink
      underline="hover"
      sx={{display: "flex", alignItems: "center"}}
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
  isCategory: PropTypes.bool,
};

const ArticleTagGrid = ({category, tags}) => {
  return (
    <Grid container spacing={1.5}>
      <Grid item key={category}>
        <Tag name={category} isCategory={true} />
      </Grid>
      {tags.map((tag) => {
        return (
          <Grid item key={tag}>
            <Tag name={tag} />
          </Grid>
        );
      })}
    </Grid>
  );
};

ArticleTagGrid.propTypes = {
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ArticleTagGrid;
