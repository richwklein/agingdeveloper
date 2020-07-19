import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
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
  toolbox: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
  },
  title: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
}));

export default ({
  onToggleDrawer,
  isDrawerOpen,
  hasScroll = false,
  showLogoImage = true,
}) => {
  const classes = useStyles();
  const elevation = Number(hasScroll);

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
        }
      }
      file(relativePath: { eq: "images/avatars/wizard.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 128, maxHeight: 128, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <AppBar position="sticky" elevation={elevation}>
      <Toolbar className={classes.toolbar} id="top-bar">
        <Box display="flex" flexGrow={1}>
          <Typography variant="h6">
            <ButtonBase component={Link} to="/" className={classes.title}>
              {showLogoImage && (
                <Avatar
                  component={Img}
                  fluid={data.file.childImageSharp.fluid}
                  loading="eager"
                  className={classes.avatar}
                />
              )}
              {data.site.siteMetadata.siteTitle}
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
