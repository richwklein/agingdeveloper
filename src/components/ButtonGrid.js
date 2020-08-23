
import React from "react";
import {Link} from "gatsby";
import kebabCase from "lodash/kebabCase";
import {Badge, Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  badge: {
    position: "relative",
    right: -4,
    transform: "none",
  },
}));

const ButtonGrid = ({group, pathPrefix}) => {
  const classes=useStyles();

  return (
    <Grid container spacing={3}>
      {group.map((item) => {
        return (
          <Grid item lg={2} md={3} sm={6} xs={12} key={item.fieldValue}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              component={Link}
              to={`${pathPrefix}/${kebabCase(item.fieldValue)}`}
              endIcon={<Badge
                badgeContent={item.totalCount}
                color="secondary"
                max={999}
                overlap="rectangle"
                classes={{anchorOriginTopRightRectangle: classes.badge}} />}>
              {item.fieldValue}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ButtonGrid;
