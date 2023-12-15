import React from "react";
import MuiLink from "@mui/material/Link";
import PropTypes from "prop-types";

// TODO remove spread
const ExternalLink = (props) => (
  <MuiLink
    data-link="external"
    href={props.to}
    target="_blank"
    rel="noopener noreferrer"
    {...props}/>
);

ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
};

export default ExternalLink;
