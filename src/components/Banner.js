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
  bannerText: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: 128,
    height: 128,
    marginLeft: theme.spacing(3), // aligns icon with content padding
    marginRight: theme.spacing(1),
    borderWidth: 2,
    borderColor: theme.palette.secondary.light,
    borderStyle: "solid",
  },
}));

const Banner = ({avatar, title, subtitle}) => {
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
          <Typography variant="h4" className={classes.bannerText}>
            {title}
          </Typography>
          <Typography variant="h6" className={classes.bannerText}>
            {subtitle}
          </Typography>
        </Box>
      </InnerBox>
    </Box>
  );
};

export default Banner;
