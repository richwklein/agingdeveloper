import React from "react";
import {Container} from "@mui/material";
import PropTypes from "prop-types";

// TODO remove spread
const InnerContainer = ({props, children}) => {
  return (
    <Container maxWidth="lg" {...props}>
      {children}
    </Container>
  );
};

InnerContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  props: PropTypes.any,
};

export default InnerContainer;
