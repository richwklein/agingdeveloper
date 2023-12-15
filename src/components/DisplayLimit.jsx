import React from "react";
import PropTypes from "prop-types";
import {Alert} from "@mui/material";

const message = "Maximum number of articles displayed.";

/**
 * React component for showing an alert when the number of articles exceeds the limit of the page.
 *
 * @param {DisplayLimitType} props - The limit and total props.
 * @return {React.ReactElement}
 *
 * @example
 * <DisplayLimit limit={maxDisplay} total={totalCount} />
 *
 * @todo Add search to message once implemented.
 */
const DisplayLimit = ({limit, total}) => {
  return total <= limit ? null : <Alert severity="info">{message}</Alert>;
};

/**
 * @typedef DisplayLimitType - The display limit PropTypes.
 * @property {number} limit - The number of articles allowed on the page.
 * @property {number} total - The total number of articles.
 */
DisplayLimit.propTypes = {
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default DisplayLimit;
