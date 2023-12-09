import React from "react";
import {GatsbyImage} from "gatsby-plugin-image";
import {AppBar, Avatar, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import InnerContainer from "./InnerContainer";
import InternalLink from "./InternalLink";

// TODO proptypes for image
const PageAvatar = ({image}) => {
  return (<Avatar
    variant="rounded"
    sx={{
      bgcolor: "primary.dark",
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
        bgcolor: "primary.dark",
        p: 2,
        mb: 4,
      }}
    >
      <InnerContainer>
        <InternalLink to={"/"} sx={{color: "primary.contrastText", textDecoration: "none"}}>
          <Stack direction="row" alignItems="center">
            <PageAvatar image={avatar} />
            <Stack direction="column"
              useFlexGap
              alignItems="flex-start"
              sx={{ml: 3}}>
              <Typography variant="h4" sx={{mb: 0.5}}>
                {title}
              </Typography>
              <Typography variant="h6" sx={{fontSize: "1rem", lineHeight: 1.4}}>
                {tagline}
              </Typography>
            </Stack>
          </Stack>
        </InternalLink>
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
