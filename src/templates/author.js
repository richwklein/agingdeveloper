import React from "react";
import {graphql} from "gatsby";
import {
  ButtonGroup,
  IconButton,
} from "@material-ui/core";
import {
  Twitter,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";

import Banner from "../components/Banner";
import Layout from "../components/Layout";
import ExternalLink from "../components/ExternalLink";
import ArticleGrid from "../components/ArticleGrid";

const useStyles = makeStyles((theme) => ({
  socialBar: {
    "display": "flex",
    "marginTop": theme.spacing(0.5),
    "& a": {
      "color": theme.palette.primary.contrastText,
      "padding": 4,
    },
  },
}));

const SocialButton = ({title, to, children}) => {
  return (
    <IconButton
      component={ExternalLink}
      to={to}
      title={title}
    >
      {children}
    </IconButton>
  );
};

const SocialBar = ({author}) => {
  const classes = useStyles();
  const {
    twitter,
    facebook,
    github,
    linkedIn,
    instagram,
  } = author.social;

  return (
    <ButtonGroup className={classes.socialBar}>
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
    </ButtonGroup>);
};

const AuthorBanner = ({author}) => {
  const {bio, name, image} = author;


  return (
    <Banner title={name} subtitle={bio} avatar={image.childImageSharp.fluid}>
      <SocialBar author={author} />
    </Banner>);
};

export default ({data, pageContext}) => {
  const banner = <AuthorBanner author={data.authorYaml} />;
  return (
    <Layout showLogoImage={true} banner={banner}>
      <ArticleGrid articles={data.allMdx.edges} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query($currentPath: String) {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    authorYaml(id: {eq: $currentPath}) {
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
          fluid(maxHeight: 128, maxWidth: 128, cropFocus: NORTH) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      filter: {frontmatter: {author: {id: {eq: $currentPath}}}}
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            slug
            title
            date
            tags
            category
            image {
              childImageSharp {
                fluid(maxWidth: 1232, maxHeight: 693, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
