import React from "react";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const ArticleTitleBlock = ({title, description}) => {
  return (
    <Box
      sx={{
        marginTop: 1,
      }}>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="subtitle" component={Box}>
        {description}</Typography>
    </Box>
  );
};
ArticleTitleBlock.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ArticleTitleBlock;
