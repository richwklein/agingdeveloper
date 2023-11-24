import * as React from "react";
import MuiLink from "@mui/material/Link";
import {Link as GatsbyLink} from "gatsby";

const InternalLink = React.forwardRef(function Link(props, ref) {
  return (
    <MuiLink data-link="internal" component={GatsbyLink} ref={ref} {...props} />
  );
});

export default InternalLink;
