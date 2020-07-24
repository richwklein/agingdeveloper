import React from "react";
import { graphql } from "gatsby";
import {
  Avatar,
  Box,
  ButtonGroup,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Twitter,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
} from "@material-ui/icons";
import Layout from "../components/Layout";
import ExternalLink from "../components/ExternalLink";
import Img from "gatsby-image";

const useStyles = makeStyles((theme) => ({
  banner: {
    color: theme.palette.grey.A400,
    backgroundColor: theme.palette.grey[300],
    padding: theme.spacing(3),
  },
  bannerTitle: {
    marginBottom: theme.spacing(1),
  },
  bannerSubTitle: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: 156,
    height: 156,
  },
}));

const SocialButton = ({ title, to, children }) => {
  const classes = useStyles();

  return (
    <Tooltip title={title}>
      <IconButton
        component={ExternalLink}
        to={to}
        className={classes.socialButton}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default ({ data, pageContext }) => {
  const classes = useStyles();

  const { bio, name, image } = data.authorYaml;
  const {
    twitter,
    facebook,
    github,
    linkedIn,
    instagram,
  } = data.authorYaml.social;

  return (
    <Layout showLogoImage={true}>
      <Box className={classes.banner}>
        <Box marginX="auto" width="100%" maxWidth={1280}>
          <Grid container spacing={1}>
            <Grid item sm={12} md={2}>
              <Avatar
                component={Img}
                fluid={image.childImageSharp.fluid}
                loading="eager"
                className={classes.avatar}
              />
            </Grid>
            <Grid item sm={12} md={10}>
              <Typography variant="h3" className={classes.bannerTitle}>
                {name}
              </Typography>
              <Typography variant="h6" className={classes.bannerSubTitle}>
                {bio}
              </Typography>
              <ButtonGroup orientation="horizontal">
                <SocialButton title="Github" to={github}>
                  <GitHub />
                </SocialButton>
                <SocialButton title="Twitter" to={twitter}>
                  <Twitter />
                </SocialButton>
                <SocialButton title="Facebook" to={facebook}>
                  <Facebook />
                </SocialButton>
                <SocialButton title="LinkedIn" to={linkedIn}>
                  <LinkedIn />
                </SocialButton>
                <SocialButton title="Instagram" to={instagram}>
                  <Instagram />
                </SocialButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        padding={2}
        flexGrow={1}
        marginX="auto"
        width="100%"
        maxWidth={1280}
      ></Box>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($permalink: String!) {
    authorYaml(id: { eq: $permalink }) {
      bio
      name
      social {
        facebook
        github
        linkedIn
        instagram
        twitter
      }
      image {
        childImageSharp {
          fluid(maxHeight: 156, maxWidth: 156, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
