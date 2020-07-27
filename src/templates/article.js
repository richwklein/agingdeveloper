import React, {Fragment} from 'react';
import {graphql, Link} from 'gatsby';
import Img from 'gatsby-image';
import {Box, Button, Chip, Divider, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {ChevronLeft, ChevronRight} from '@material-ui/icons';

import Layout from '../components/Layout';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import {Helmet} from 'react-helmet';

const useStyles = makeStyles(() => ({
  article: {
    'lineHeight': 1.6,
    'fontFamily': 'Merriweather, sans-serif, serif',
    'fontSize': '1.1rem',
    '& blockquote': {
      borderLeft: '3px solid #303032',
      marginLeft: -16,
      paddingLeft: 13,
      fontStyle: 'italic',
    },
  },
  articleImage: {
    width: 1280,
    height: 720,
  },
  title: {
    fontFamily:
      'Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
  },
  chip: {
    marginRight: 4,
  },
}));

const ArticleTitle = ({title}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <Divider />
    </Fragment>
  );
};

const ArticleTags = ({tags}) => {
  const classes = useStyles();

  return (
    <Box marginY={1}>
      {tags.map((tag) => {
        return (
          <Chip
            color="primary"
            variant="outlined"
            className={classes.chip}
            label={tag}
            key={tag}
            component={Link}
            to={`/tag/${tag}`}
          />
        );
      })}
    </Box>
  );
};

const ArticlePage = ({data, pageContext}) => {
  const classes = useStyles();

  const {
    frontmatter: {image, title, tags},
    body,
  } = data.mdx;
  const {previousPath, nextPath} = pageContext;

  return (
    <Layout showLogoImage={true}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box marginBottom={1}>
        <ArticleTitle title={title} />
        <ArticleTags tags={tags} />
      </Box>
      <Img
        fluid={image.childImageSharp.fluid}
        style={{borderRadius: 6}}
        className={classes.articleImage}
      />
      <article className={classes.article}>
        <MDXRenderer>{body}</MDXRenderer>
      </article>
      <Box display="flex">
        <Box flexGrow={1}>
          {previousPath && (
            <Button component={Link} to={previousPath} color="secondary">
              <ChevronLeft size={8} />
              <Box marginLeft={0.5}>Previous</Box>
            </Button>
          )}
        </Box>
        {nextPath && (
          <Button component={Link} to={nextPath} color="secondary">
            <Box marginRight={0.5}>Next</Box>
            <ChevronRight size={8} />
          </Button>
        )}
      </Box>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($permalink: String!) {
    mdx(frontmatter: { url: { eq: $permalink } }) {
      body
      frontmatter {
        url
        title
        date
        tags
        category
        image {
          childImageSharp {
            fluid(maxWidth: 1280, maxHeight: 720, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default ArticlePage;
