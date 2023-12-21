/* eslint-disable react/prop-types */
import React from "react";
import MuiLink from "@mui/material/Link";

/**
 * React component used to render a link to an external site.
 *
 * @param {LinkProps} props - The to link and rest.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <ExternalLink to="https://github.com/richwklein">Github</ExternalLink>
 * @todo Add forward class when needed
 */
export const ExternalLink = React.forwardRef(({to, ...rest}, ref) => (
  <MuiLink
    data-link="external"
    target="_blank"
    rel="noopener noreferrer"
    ref={ref}
    href={to}
    {...rest}/>
));
ExternalLink.displayName = "ExternalLink";

export default ExternalLink;
