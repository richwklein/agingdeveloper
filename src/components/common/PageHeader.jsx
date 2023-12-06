import React from "react";
import {GatsbyImage} from "gatsby-plugin-image";
import {AppBar, Avatar, ButtonBase, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import InnerContainer from "./InnerContainer";
import InternalLink from "./InternalLink";

const PageAvatar = ({image}) => {
  return (<Avatar
    variant="rounded"
    sx={{
      backgroundColor: "primary.dark",
      borderWidth: 1,
      borderColor: "secondary.light",
      borderStyle: "solid",
      width: "72px",
      height: "72px",
    }}>
    <GatsbyImage image={image} sx={{backgroundColor: "inherit"}} />
  </Avatar>);
};

PageAvatar.propTypes = {
  image: PropTypes.any,
};

const PageHeader = ({title, tagline, avatar}) => {
  return (
    <AppBar
      position="sticky"
      component="header"
      elevation={0}
      sx={{
        color: "primary.contrastText",
        backgroundColor: "primary.dark",
        padding: 2,
        marginBottom: 4,
      }}
    >
      <InnerContainer>
        <ButtonBase component={InternalLink} to="/" disableRipple={true}>
          <PageAvatar image={avatar} />
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
  avatar: PropTypes.any,
};

export default PageHeader;
