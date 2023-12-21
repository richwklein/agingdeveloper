import React from "react";
import PropTypes from "prop-types";
import BreadcrumbBlock from "./BreadcrumbBlock";

/**
 * React component for rendering a breadcrumb for tag pages.
 * If name is null then just the name of the index page is shown.
 * Otherwise, a link to the index page and the name of the tag are shown.
 *
 * @param {TagBreadcrumbProps} props - The tag breadcrumb props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <TagBreadcrumb name={category} isCategory={true} />
 */
export const TagBreadcrumb = ({name=null, isCategory=false}) => {
  const headName = isCategory ? "Categories" : "Tags";
  const headPath = isCategory ? "/category/" : "/tag/";

  return (
    <BreadcrumbBlock
      head={{name: headName, path: headPath}}
      tail={name} />
  );
};

/**
 * @typedef TagBreadcrumbProps - The tag breadcrumb props.
 * @property {string} [name=null] - The name of the tag.
 * @property {bool} [isCategory=false] - If the tags represent categories.
 *
 */
TagBreadcrumb.propTypes = {
  name: PropTypes.string,
  isCategory: PropTypes.bool,
};

export default TagBreadcrumb;
