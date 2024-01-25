import React from "react";
import PropTypes from "prop-types";
import useSiteData from "../hooks/useSiteData";

/**
 * A react component for rendering the breadcrumb ld+json seo.
 *
 * @param {BreadcrumbSEOProps} props - The author page seo props.
 * @return {React.ReactElement} - The react component.
 */
export const BreadcrumbSEO = ({crumbs}) => {
  const {title: siteTitle, url: siteUrl} = useSiteData();
  const head = [{name: siteTitle, path: "/"}];
  const full = (crumbs != null) ? head.concat(crumbs) : head;

  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": full.map((crumb, index) => {
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${siteUrl}${crumb.path}`,
      };
    }),
  };

  const json =JSON.stringify(ld);

  return (
    <>
      <script id="ld-crumb" type="application/ld+json">
        {json}
      </script>
    </>
  );
};

/**
 * @typedef BreadcrumbSEOProps - The SEO Head for breadcrumb ld+json.
 * @property {Object} [crumbs] - The crumbs to the page.
 */
BreadcrumbSEO.propTypes = {
  crumbs: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      }),
  ),
};

export default BreadcrumbSEO;
