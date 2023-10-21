import * as React from "react";
import MuiLink from "@mui/material/Link";
import PropTypes from "prop-types";

const ExternalLink = React.forwardRef(function Link(props, ref) {
  return <MuiLink
    href={props.to}
    target="_blank"
    rel="noopener noreferrer"
    ref={ref}
    {...props} />;
});
ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
};

export default ExternalLink;
