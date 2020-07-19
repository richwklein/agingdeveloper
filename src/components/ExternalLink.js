import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";

export default ({ to, children }) => {
  return (
    <OutboundLink href={to} target="_blank" rel="noopener noreferrer">
      {children}
    </OutboundLink>
  );
};
