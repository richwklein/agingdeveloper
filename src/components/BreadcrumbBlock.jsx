import React from "react";
import {Breadcrumbs, Divider, Typography} from "@mui/material";
import PropTypes from "prop-types";
import InternalLink from "../components/InternalLink";

/**
 * React component for rendering a breadcrumb at the top of the page.
 * If tail is null then just the name of the head page is shown.
 * Otherwise, a link to the head page and the name of the tail are shown.
 *
 * @param {BreadcrumbBlockProps} props - The tag breadcrumb props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <BreadcrumbBlock head={{name: "Archive", path="/article"}} tail="1" />
 */
export const BreadcrumbBlock = ({head, tail=null}) => {
  return (
    <Divider component="header" flexItem
      sx={{
        "textTransform": "capitalize",
        ".MuiBreadcrumbs-ol": {
          flexFlow: "row",
        },
      }}>
      <Breadcrumbs>
        {tail == null ? (
        <Typography color="text.primary">{head.name}</Typography>
      ) : (
          <InternalLink underline="hover" color="inherit" to={head.path}>
            {head.name}
          </InternalLink>
      )}
        {tail != null && <Typography color="text.primary">{tail}</Typography>}
      </Breadcrumbs>
    </Divider>
  );
};

/**
 * @typedef BreadcrumbBlockProps - The breadcrumb block props.
 * @property {Object} head - The head element of the breadcrumb.
 * @property {string} head.name - The name to display for the head.
 * @property {string} head.path - The path to the head page.
 * @property {string} [tail=null] - The tail to display.
 *
 */
BreadcrumbBlock.propTypes = {
  head: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  tail: PropTypes.string,
};

export default BreadcrumbBlock;
