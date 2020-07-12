import React from "react";
import { Box, Drawer, Divider, IconButton, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      className={classes.drawer}
      anchor="right"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar>
        <Box className={classes.spacer} />
        <IconButton
          color="inherit"
          aria-label="close drawer"
          edge="end"
          onClick={onClose}
          title="Close Menu"
        >
          <Menu />
        </IconButton>
      </Toolbar>
      <Divider />
    </Drawer>
  );
};
