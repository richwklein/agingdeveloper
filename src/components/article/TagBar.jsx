import React from "react";
import {Button, Grid} from "@mui/material";
import InternalLink from "../common/InternalLink";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import PropTypes from "prop-types";
import slug from "slug";

export const Tag = ({name, relativeUrl, isCategory=false}) => {
  const icon = isCategory ? <FolderOutlinedIcon/ > : <TagOutlinedIcon />;
  return (
    <Button
      startIcon={icon}
      edge="start"
      variant="text"
      component={InternalLink}
      to={relativeUrl}
      sx={{
        "& .MuiButton-startIcon": {
          marginRight: .35,
        },
      }}>
      {name}
    </Button>
  );
};

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  relativeUrl: PropTypes.string.isRequired,
  isCategory: PropTypes.bool,
};

const TagBar = ({category, tags}) => {
  return (
    <Grid container spacing={.5}>
      <Grid item key={category}>
        <Tag name={category} relativeUrl={`/category/${slug(category)}`} isCategory={true} />
      </Grid>
      {tags.map((tag) => {
        return (
          <Grid item key={tag}>
            <Tag name={tag} relativeUrl={`/tag/${slug(tag)}`} />
          </Grid>
        );
      })}
    </Grid>
  );
};

TagBar.propTypes = {
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default TagBar;
