import React from "react";
import PropTypes from "prop-types";
import ExternalLink from "./ExternalLink";
import InternalLink from "./InternalLink";

// Checks against absolute URLs so we can still pass it along to the internal link component
const domainRegex = /^http[s]*:\/\/[www.]*agingdeveloper\.(com|net)[/]?/;


/**
 * React component used by the {@link MDXPropvider} to use when rendering an
 * anchor tag in mdx.
 *
 * @param {MDXLinkrProps} props - The anchor tag props.
 * @return {React.ReactElement} - The react component
 */
const MDXLink = ({href, ...rest}) => {
  const sameDomain = domainRegex.test(href);
  let to = href;

  if (sameDomain) {
    to = href.replace(domainRegex, "/");
  }

  if (to.startsWith("/")) {
    return <InternalLink to={to} {...rest} />;
  }

  // Treat urls that aren't web protocols as "normal" links
  if (!href.startsWith("http")) {
    return <a data-link="same" href={to} {...rest} />;
  }

  return <ExternalLink to={to} {...rest} />;
};


/**
 * @typedef MDXLinkrProps - The mdx link props.
 * @property {string} href - The anchor href property.
 * @property {any} rest - The remaining props to spread.
 */
MDXLink.propTypes = {
  href: PropTypes.string.isRequired,
  rest: PropTypes.any,
};

export default MDXLink;
