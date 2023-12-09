import React from "react";
import {Grid} from "@mui/material";
import PropTypes from "prop-types";
import Tag from "./Tag";

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
