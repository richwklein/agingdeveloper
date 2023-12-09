import PropTypes from "prop-types";

export const ChildrenType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element,
  PropTypes.arrayOf(PropTypes.element),
]);
