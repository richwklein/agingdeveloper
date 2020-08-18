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
  bannerText: {
    marginLeft: theme.spacing(3), // aligns with content padding
  },
}));

const TitleBanner = ({icon, title}) => {
  const classes = useStyles();

  return (
    <Box className={classes.banner}>
      <InnerBox display="flex" alignItems="center" component="header">
        <Typography variant="h4" className={classes.bannerText}>
          {title}
        </Typography>
      </InnerBox>
    </Box>
  );
};

export default TitleBanner;
