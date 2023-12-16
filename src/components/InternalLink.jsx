import React from "react";
import MuiLink from "@mui/material/Link";
import {Link as GatsbyLink} from "gatsby";
import {LinkProps} from "../props";


/**
 * React component used to render a link internal to the site.
 *
 * @param {LinkProps} props - The to link and rest.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <InternalLinkProps to="tags">Tags</InternalLink>
 * @todo Remove prop spread
 */
const InternalLink = ({to, ...rest}) => (
  <MuiLink data-link="internal" component={GatsbyLink} to={to} {...rest} />
);

InternalLink.propTypes = LinkProps;

export default InternalLink;
