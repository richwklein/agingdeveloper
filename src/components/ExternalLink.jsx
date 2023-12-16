import React from "react";
import MuiLink from "@mui/material/Link";
import {LinkProps} from "../props";

/**
 * React component used to render a link to an external site.
 *
 * @param {LinkProps} props - The to link and rest.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <ExternalLink to="https://github.com/richwklein">Github</ExternalLink>
 * @todo Remove prop spread
 */
const ExternalLink = ({to, ...rest}) => (
  <MuiLink
    data-link="external"
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    {...rest}/>
);

ExternalLink.propTypes = LinkProps;

export default ExternalLink;
