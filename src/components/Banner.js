import React from "react";
import clsx from "clsx";
import {Avatar, Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Img from "gatsby-image";
import InnerBox from "./InnerBox";

const useStyles = makeStyles((theme) => ({
  banner: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  bannerText: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: 128,
    height: 128,
    marginRight: theme.spacing(2),
  },
  avatarLarger: {
    width: 256,
    height: 256,
  },
}));

const Banner = ({avatar, title, subtitle, children, largeAvatar = false}) => {
  const classes = useStyles();

  return (
    <Box className={classes.banner}>
      <InnerBox display="flex" alignItems="center">
        <Avatar
          component={Img}
          fluid={avatar}
          loading="eager"
          className={clsx(classes.avatar, {
            [classes.avatarLarger]: largeAvatar,
          })}
        />
        <Box width="100%">
          <Typography variant="h4" className={classes.bannerText}>
            {title}
          </Typography>
          <Typography variant="h6" className={classes.bannerText}>
            {subtitle}
          </Typography>
          {children}
        </Box>
      </InnerBox>
    </Box>
  );
};

export default Banner;
