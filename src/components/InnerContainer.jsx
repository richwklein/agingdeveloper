import React from "react";
import {Container} from "@mui/material";
import PropTypes from "prop-types";
import {ChildrenType} from "../types";

// TODO remove spread
const InnerContainer = ({children, useMain=false}) => {
  const component = useMain ? "main" : "div";

  return (
    <Container maxWidth="lg" component={component}>
      {children}
    </Container>
  );
};

InnerContainer.propTypes = {
  children: ChildrenType,
  useMain: PropTypes.bool,
};

export default InnerContainer;
