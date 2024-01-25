import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {Button} from "@mui/material";
import PropTypes from "prop-types";
import InternalLink from "./InternalLink";

/**
 * Renders a contained button as an anchor with the "View all {name}" template.
 *
 * @param {InternalBackButtonProps} props
 * @return {React.ReactElement} - The react component
 */
export const InternalBackButton = ({name, path, useViewText=true}) => {
  const text = (useViewText == true ) ? `view all ${name}` : name;

  return (
    <Button
      startIcon={<ChevronLeftIcon />}
      variant="contained"
      color="secondary"
      disableElevation
      component={InternalLink}
      to={path}
      sx={{
        mx: 0,
        my: 0,
        textTransform: "capitalize",
      }}
    >
      {text}
    </Button>
  );
};

/**
 * @typedef InternalBackButtonProps - The internal back button props
 * @property {string} name - The name of the view to put in the text.
 * @property {string} path - The path to the view.
 * @property {boolean} [useViewText=true] - If the text should include "view all".
 */
InternalBackButton.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  useViewText: PropTypes.bool,
};

export default InternalBackButton;
