import * as React from "react";
import PropTypes from "prop-types";
import ExternalLink from "./ExternalLink";
import InternalLink from "./InternalLink";

// Checks against absolute URLs so we can still pass it along to the internal link component
const domainRegex = /http[s]*:\/\/[www.]*agingdeveloper\.(com|net)[/]?/;


const MDXLink = ({href, ...props}) => {
  const sameDomain = domainRegex.test(href);

  if (sameDomain) {
    href = href.replace(domainRegex, "/");
  }

  if (href.startsWith("/")) {
    return <InternalLink to={href} {...props} />;
  }

  // Treat urls that aren't web protocols as "normal" links
  if (!href.startsWith("http")) {
    return <a data-link="same" href={href} {...props} />;
  }

  return <ExternalLink to={href} {...props} />;
};

MDXLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default MDXLink;
