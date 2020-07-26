import React from "react";
import { Link } from "gatsby";
import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import Img from "gatsby-image";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
}));

const TopBar = ({
  title,
  avatar,
  onToggleDrawer,
  hasScroll,
  showAvatar = false,
}) => {
  const classes = useStyles();
  const elevation = Number(hasScroll);

  return (
    <AppBar position="sticky" elevation={elevation} className={classes.header}>
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Typography variant="h6">
            <ButtonBase component={Link} to="/" className={classes.title}>
              {showAvatar && (
                <Avatar
                  component={Img}
                  fluid={avatar}
                  loading="eager"
                  className={classes.avatar}
                />
              )}
              {title}
            </ButtonBase>
          </Typography>
        </Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={onToggleDrawer}
          title="Open Menu"
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
