import React from "react";
import {Button, Grid} from "@mui/material";
import InternalLink from "../common/InternalLink";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import PropTypes from "prop-types";
import slug from "slug";

export const Tag = ({name}) => {
  return (
    <Button
      startIcon={ <TagOutlinedIcon />}
      variant="text"
      component={InternalLink}
      to={`/tag/${slug(name)}`}
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
};

const TagBar = ({tags}) => {
  return (
    <Grid container spacing={.5}>
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

TagBar.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default TagBar;
