import React from "react";
import MuiLink from "@mui/material/Link";
import {Link as GatsbyLink} from "gatsby";

// TODO remove spread, fix forwardRef error
const InternalLink = (props) => (
  <MuiLink data-link="internal" component={GatsbyLink} {...props} />
);

export default InternalLink;
