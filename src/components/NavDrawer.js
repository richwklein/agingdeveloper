import React from "react";
import {Link} from "gatsby";
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
import {makeStyles} from "@material-ui/core/styles";
import {
  Close,
  Folder,
  List as ListIcon,
  LocalOffer,
  Person,
} from "@material-ui/icons";

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  navDrawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  navDrawerPaper: {
    width: drawerWidth,
  },
  spacer: {
    flexGrow: 1,
  },
}));

const NavList = ({children}) => {
  return (
    <List component="nav" aria-label="main navigation">
      {children}
    </List>
  );
};

const NavItem = ({label, to, icon}) => {
  return (
    <ListItem button component={Link} to={to}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
};

const NavDrawer = ({open, onClose}) => {
  const classes = useStyles();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      className={classes.navDrawer}
      anchor="right"
      classes={{
        paper: classes.navDrawerPaper,
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
        <NavItem label="Articles" to="/article" icon={<ListIcon />} />
        <NavItem label="Tags" to="/tag" icon={<LocalOffer />} />
        <NavItem label="Categories" to="/category" icon={ <Folder /> } />
        <NavItem label="Authors" to="/author" icon={<Person />} />
      </NavList>
    </Drawer>
  );
};

export default NavDrawer;
