import React from "react";
import {AppBar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import InnerContainer from "./InnerContainer";

const PageHeader = ({title, tagline}) => {
  return (
    <AppBar
      position="sticky"
      component="header"
      sx={{
        color: "primary.contrastText",
        backgroundColor: "primary.dark",
        padding: 2,
        marginBottom: 4,
      }}
    >
      <InnerContainer display="flex" alignItems="center">
        <Box width="100%">
          <Typography variant="h4" sx={{marginBottom: 0.5}}>
            {title}
          </Typography>
          <Typography variant="h6" sx={{fontSize: "1rem", lineHeight: 1.4}}>
            {tagline}
          </Typography>
        </Box>
      </InnerContainer>
    </AppBar>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
};

export default PageHeader;
