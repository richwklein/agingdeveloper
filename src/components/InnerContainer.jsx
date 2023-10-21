import React from "react";
import {Container} from "@mui/material";
import PropTypes from "prop-types";

const InnerContainer = ({children, props}) => {
  return (
    <Container maxWidth="lg" {...props}>
      {children}
    </Container>
  );
};

InnerContainer.propTypes = {
  children: PropTypes.element.isRequired,
  props: PropTypes.any,
};

export default InnerContainer;
