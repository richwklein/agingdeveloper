import React from "react";
import {Link} from "@material-ui/core";
import {OutboundLink} from "gatsby-plugin-google-analytics";

const ForwardOutboundLink = React.forwardRef((props, ref) => (
  <OutboundLink {...props} />
));

const ExternalLink = React.forwardRef((props, ref) => (
  <Link
    component={ForwardOutboundLink}
    href={props.to}
    target="_blank"
    rel="noopener noreferrer nofollow"
    ref={ref}
    {...props} />
));

export default ExternalLink;
