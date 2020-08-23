import React from "react";
import {Badge} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  badge: {
    display: "flex",
    position: "relative",
    flexShrink: 0,
    verticalAlign: "middle",
  },
}));

const daysOld = (fromDate) => {
  return moment().diff(fromDate, "days");
};

const NewBadge = ({fromDate, children, youngerThan=10}) => {
  const hideBadge = daysOld(fromDate) > youngerThan;
  const classes = useStyles();

  return (
    <Badge anchorOrigin={{vertical: "top", horizontal: "left"}}
      classes={{root: classes.badge}}
      overlap="rectangle" badgeContent="NEW" color="error"
      invisible={hideBadge}>{children}</Badge>
  );
};

export default NewBadge;

