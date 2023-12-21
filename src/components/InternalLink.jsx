/* eslint-disable react/prop-types */
import React from "react";
import MuiLink from "@mui/material/Link";
import {Link as GatsbyLink} from "gatsby";

const ForwardInternalLink = React.forwardRef((props, ref) => (
  <GatsbyLink {...props} />
));
ForwardInternalLink.displayName = "ForwardInternalLink";

/**
 * React component used to render a link internal to the site.
 *
 * @param {LinkProps} props - The to link and rest.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <InternalLinkProps to="tags">Tags</InternalLink>
 */
export const InternalLink = React.forwardRef(({to, ...rest}, ref) => (
  <MuiLink
    component={ForwardInternalLink}
    data-link="internal"
    ref={ref}
    to={to}
    {...rest} />
));
InternalLink.displayName = "InternalLink";

export default InternalLink;
