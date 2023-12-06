import React from "react";
import {Button, Grid} from "@mui/material";
import InternalLink from "../common/InternalLink";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import PropTypes from "prop-types";
import slug from "slug";

export const Tag = ({name, isCategory=false}) => {
  const icon = isCategory ? <FolderOutlinedIcon/ > : <TagOutlinedIcon />;
  const url = isCategory ? `/category/${slug(name)}` : `/tag/${slug(name)}`;
  return (
    <Button
      startIcon={icon}
      edge="start"
      size="small"
      variant="text"
      component={InternalLink}
      to={url}
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
  isCategory: PropTypes.bool,
};

const TagBlock = ({category, tags}) => {
  return (
    <Grid container spacing={.5}>
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

TagBlock.propTypes = {
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagBlock;
