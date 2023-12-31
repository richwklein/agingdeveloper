import React from "react";
import {Container} from "@mui/material";
import PropTypes from "prop-types";
import {ChildrenProps} from "../props";

/**
 * React component that constrains context to a large breakpoint.
 *
 * @param {InnerContainerProps} props - The inner container props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <InnerContainer useMain={true}>
 *   <TagBreadcrumb name={category} isCategory={true} />
 *   <TagGrid tags={group} />
 * </InnerContainer>
 */
export const InnerContainer = ({children, useMain=false}) => {
  const component = useMain ? "main" : "div";

  return (
    <Container maxWidth="lg" component={component}>
      {children}
    </Container>
  );
};

/**
 * @typedef InnerContainerProps - An inner container.
 * @property {ChildrenProps} children - The children of the component.
 * @property {bool} [useMain=false] - If the html tag should be a main tag.
 */
InnerContainer.propTypes = {
  children: ChildrenProps,
  useMain: PropTypes.bool,
};

export default InnerContainer;
