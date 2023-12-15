import React from "react";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const TitleBlock = ({title, subtitle}) => {
  return (
    <Box component="header" sx={{mt: 1}}>
      <Typography variant="h3">{title}</Typography>
      {subtitle &&
        <Typography variant="subtitle" component={Box}>
          {subtitle}
        </Typography>
      }
    </Box>
  );
};
TitleBlock.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default TitleBlock;
