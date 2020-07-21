import React from "react";
import { Link } from "@material-ui/core";
import { OutboundLink } from "gatsby-plugin-google-analytics";

export default ({ to, children }) => {
  return (
    <Link
      component={OutboundLink}
      href={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
};
