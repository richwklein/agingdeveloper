import React from "react";
import {Link} from "gatsby";
import {Button, Grid} from "@material-ui/core";
import {Folder, LocalOffer} from "@material-ui/icons";
import kebabCase from "lodash/kebabCase";

const TagsBox = ({category, tags}) => {
  return (
    <Grid container spacing={1}>
      <Grid item key={category}>
        <Button
          startIcon={<Folder />}
          variant="text"
          edge="start"
          key={category}
          component={Link}
          to={`/category/${kebabCase(category)}`} >
          {category}
        </Button>
      </Grid>
      {tags.map((tag) => {
        return (
          <Grid item key={tag}>
            <Button
              startIcon={<LocalOffer />}
              variant="text"
              edge="start"
              key={tag}
              component={Link}
              to={`/tag/${kebabCase(tag)}`} >
              {tag}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TagsBox;
