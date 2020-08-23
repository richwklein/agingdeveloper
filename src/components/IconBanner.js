import React from "react";
import {Avatar, Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import InnerBox from "./InnerBox";

const useStyles = makeStyles((theme) => ({
  banner: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
  },
  avatar: {
    width: 34,
    height: 34,
    marginLeft: theme.spacing(3), // aligns icon with content padding
    marginRight: theme.spacing(1),
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.grey[100],
  },
}));

const IconBanner = ({icon, title}) => {
  const classes = useStyles();

  return (
    <Box className={classes.banner}>
      <InnerBox display="flex" alignItems="center">
        <Avatar className={classes.avatar} >
          {icon}
        </Avatar>
        <Box width="100%" component="header">
          <Typography variant="h4" className={classes.bannerText}>
            {title}
          </Typography>
        </Box>
      </InnerBox>
    </Box>
  );
};

export default IconBanner;
