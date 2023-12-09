import React from "react";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const TitleBlock = ({title, description}) => {
  return (
    <Box component="header" sx={{mt: 1}}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="subtitle" component={Box}>
        {description}</Typography>
    </Box>
  );
};
TitleBlock.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TitleBlock;
