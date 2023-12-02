import React from "react";
import MuiLink from "@mui/material/Link";
import {Link as GatsbyLink} from "gatsby";

const InternalLink = React.forwardRef((props, ref) => (
  <MuiLink data-link="internal" component={GatsbyLink} ref={ref} {...props} />
));

InternalLink.displayName = "InternalLink";

export default InternalLink;
