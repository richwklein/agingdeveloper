/* eslint-disable react/prop-types */
import React from "react";
import ExternalLink from "./ExternalLink";
import InternalLink from "./InternalLink";

// Checks against absolute URLs so we can still pass it along to the internal link component
const domainRegex = /^http[s]*:\/\/[www.]*agingdeveloper\.(com|net)[/]?/;


/**
 * React component used by the {@link MDXProvider} when rendering an anchor tag in mdx.
 *
 * @param {MDXLinkProps} props - The anchor tag props.
 * @return {React.ReactElement} - The react component
 */
export const MDXLink = ({href, ...rest}) => {
  const sameDomain = domainRegex.test(href);
  let to = href;

  if (sameDomain) {
    to = href.replace(domainRegex, "/");
  }

  if (to.startsWith("/") || to.startsWith("#") || to.startsWith("?")) {
    return <InternalLink to={to} {...rest} />;
  }

  // Treat urls that aren't web protocols as "normal" links
  if (!href.startsWith("http")) {
    return <a data-link="unknown" href={to} {...rest} />;
  }

  return <ExternalLink to={to} {...rest} />;
};

export default MDXLink;
