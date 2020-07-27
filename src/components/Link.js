import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { Link as MuiLink } from "@material-ui/core";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const isExternalUrl = (to) => to.indexOf("//") > -1;

const ForwardOutboundLink = React.forwardRef((props, ref) => (
  <OutboundLink {...props} />
));

const Link = ({ to, children }) => {
  return isExternalUrl(to) ? (
    <MuiLink
      component={ForwardOutboundLink}
      href={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </MuiLink>
  ) : (
    <GatsbyLink to={to}>{children}</GatsbyLink>
  );
};

export default Link;
