import React from "react";
import {Breadcrumbs, Divider, Typography} from "@mui/material";
import InternalLink from "../components/InternalLink";
import PropTypes from "prop-types";

/**
 * React component for showing a breadcrumb for tag pages.
 * If name is null then just the name of the index page is shown.
 * Otherwise, a link to the index page and the name of the tag are shown.
 *
 * @param {TagBreadcrumbType} props - The tag name and if it is a category.
 * @return {React.ReactElement}
 *
 * @example
 * <TagBreadcrumb name={category} isCategory={true} />
 */
const TagBreadcrumb = ({name=null, isCategory=false}) => {
  const headName = isCategory ? "categories" : "tags";
  const headPath = isCategory ? "/category/" : "/tag/";

  return (
    <Divider sx={{
      "mb": 4,
      ".MuiBreadcrumbs-ol": {
        flexFlow: "row",
      },
    }}>
      {name == null ? (
        <Typography color="text.primary">{headName}</Typography>
      ) : (
        <Breadcrumbs>
          <InternalLink
            underline="hover"
            color="inherit"
            to={headPath}>
            {headName}
          </InternalLink>
          <Typography color="text.primary">{name.toLowerCase()}</Typography>
        </Breadcrumbs>
      )}
    </Divider>
  );
};

/**
 * @typedef TagBreadcrumbType - The tag breadcrumb PropTypes.
 * @property {string} [name=null] - The name of the tag.
 * @property {bool} [isCategory=false] - If the tags represent categories.
 *
 */
TagBreadcrumb.propTypes = {
  name: PropTypes.string,
  isCategory: PropTypes.bool,
};

export default TagBreadcrumb;
