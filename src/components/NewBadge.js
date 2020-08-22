import React from "react";
import {
  Badge,

} from "@material-ui/core";
import moment from "moment";

const daysOld = (fromDate) => {
  return moment().diff(fromDate, "days");
};

const NewBadge = ({fromDate, children, youngerThan=10}) => {
  const hideBadge = daysOld(fromDate) > youngerThan;

  return (
    <Badge anchorOrigin={{vertical: "top", horizontal: "left"}}
      overlap="rectangle" badgeContent="NEW" color="error"
      invisible={hideBadge}>{children}</Badge>
  );
};

export default NewBadge;

