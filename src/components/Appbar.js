import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default ({ elevation = 1, onToggleDrawer }) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" elevation={elevation} className={classes.header}>
      <Toolbar></Toolbar>
    </AppBar>
  );
};
