import React from "react";
import {AppBar, ButtonBase, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import InnerContainer from "./InnerContainer";
import PageAvatar from "./PageAvatar";
import InternalLink from "./InternalLink";

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
      <InnerContainer>
        <ButtonBase component={InternalLink} to="/">
          <PageAvatar/>
          <Stack direction="column"
            useFlexGap
            alignItems="flex-start"
            sx={{marginLeft: 3}}>
            <Typography variant="h4" sx={{marginBottom: 0.5}}>
              {title}
            </Typography>
            <Typography variant="h6" sx={{fontSize: "1rem", lineHeight: 1.4}}>
              {tagline}
            </Typography>
          </Stack>
        </ButtonBase>
      </InnerContainer>
    </AppBar>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
};

export default PageHeader;
