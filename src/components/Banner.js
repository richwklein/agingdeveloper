import React from "react";
import {Avatar, Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Img from "gatsby-image";
import InnerBox from "./InnerBox";

const useStyles = makeStyles((theme) => ({
  banner: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
  },
  bannerTitle: {
    marginBottom: theme.spacing(0.5),
  },
  bannerSubtitle: {
    fontSize: "1rem",
    lineHeight: "1.4",
  },
  avatar: {
    width: 128,
    height: 128,
    marginLeft: theme.spacing(3), // aligns icon with content padding
    marginRight: theme.spacing(2),
    borderWidth: 2,
    borderColor: theme.palette.secondary.light,
    borderStyle: "solid",
  },
}));

const Banner = ({avatar, title, subtitle, children}) => {
  const classes = useStyles();

  return (
    <Box className={classes.banner} component="header">
      <InnerBox display="flex" alignItems="center">
        <Avatar
          component={Img}
          fluid={avatar}
          loading="eager"
          className={classes.avatar}
        />
        <Box width="100%">
          <Typography variant="h4" className={classes.bannerTitle}>
            {title}
          </Typography>
          <Typography variant="h6" className={classes.bannerSubtitle}>
            {subtitle}
          </Typography>
          {children}
        </Box>
      </InnerBox>
    </Box>
  );
};

export default Banner;
