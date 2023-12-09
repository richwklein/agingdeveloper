
import React from "react";
import slug from "slug";
import {Badge, Button, Grid} from "@mui/material";
import PropTypes from "prop-types";
import InternalLink from "./InternalLink";

const ButtonGrid = ({group, pathPrefix}) => {
  return (
    <Grid container spacing={3}>
      {group.map((item) => {
        return (
          <Grid item lg={2} md={3} sm={6} xs={12} key={item.name}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              component={InternalLink}
              to={`${pathPrefix}/${slug(item.name)}`}
              endIcon={<Badge
                badgeContent={item.count}
                color="secondary"
                max={999}
                overlap="rectangle" />}>
              {item.name}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

ButtonGrid.propTypes = {
  group: PropTypes.arrayOf(
      PropTypes.shape({
        item: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      }).isRequired,
  ).isRequired,
  pathPrefix: PropTypes.string.isRequired,
};

export default ButtonGrid;
