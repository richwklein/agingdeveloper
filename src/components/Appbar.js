import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

export default ({ elevation = 1, onToggleDrawer }) => {
  return (
    <AppBar position="sticky" elevation={elevation}>
      <Toolbar></Toolbar>
    </AppBar>
  );
};
