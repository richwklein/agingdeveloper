import React from "react";
import {Container} from "@mui/material";
import PropTypes from "prop-types";
import {ChildrenType} from "../types";

// TODO remove spread
const InnerContainer = ({props, children}) => {
  return (
    <Container maxWidth="lg" {...props}>
      {children}
    </Container>
  );
};

InnerContainer.propTypes = {
  children: ChildrenType,
  props: PropTypes.any,
};

export default InnerContainer;
