import React from "react";
import {OutboundLink} from "gatsby-plugin-google-analytics";

const ExternalLink = ({to, children}) => {
  return (
    <OutboundLink
      href={to}
      target="_blank"
      rel="noopener noreferrer nofollow">
      {children}
    </OutboundLink>
  );
};

export default ExternalLink;
