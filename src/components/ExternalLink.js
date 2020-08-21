import React from "react";
import {Link} from "@material-ui/core";
import {OutboundLink} from "gatsby-plugin-google-analytics";

const ForwardOutboundLink = React.forwardRef((props, ref) => (
  <OutboundLink {...props} />
));

const ExternalLink = ({to, children, title=null}) => {
  return (
    <Link
      component={ForwardOutboundLink}
      href={to}
      target="_blank"
      rel="noopener noreferrer nofollow"
      title={title}
    >
      {children}
    </Link>
  );
};

export default ExternalLink;
