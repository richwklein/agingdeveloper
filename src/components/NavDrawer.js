import React from "react";
import { Link } from "gatsby";
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close, Folder, LocalOffer, People, Storage } from "@material-ui/icons";

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  spacer: {
    flexGrow: 1,
  },
}));

const NavList = ({ children }) => {
  return (
    <List component="nav" aria-label="main navigation">
      {children}
    </List>
  );
};

const NavItem = ({ label, to, children }) => {
  return (
    <ListItem button component={Link} to={to}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
};

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
          <Close />
        </IconButton>
      </Toolbar>
      <Divider />
      <NavList>
        <NavItem label="Authors" to="/authors/">
          <People />
        </NavItem>
        <NavItem label="Categories" to="/categories/">
          <Folder />
        </NavItem>
        <NavItem label="Tags" to="/tags/">
          <LocalOffer />
        </NavItem>
        <NavItem label="Archive" to="/archive/">
          <Storage />
        </NavItem>
      </NavList>
    </Drawer>
  );
};
