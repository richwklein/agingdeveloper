import React from "react";
import {Container} from "@mui/material";
import PropTypes from "prop-types";
import {ChildrenType} from "../types";

// TODO remove spread
const InnerContainer = ({children, isMain=false}) => {
  const component = isMain ? "main" : "div";

  return (
    <Container maxWidth="lg" component={component}>
      {children}
    </Container>
  );
};

InnerContainer.propTypes = {
  children: ChildrenType,
  isMain: PropTypes.bool,
};

export default InnerContainer;
