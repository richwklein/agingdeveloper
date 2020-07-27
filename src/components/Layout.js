import React, {Fragment, useState} from 'react';
import {graphql, useStaticQuery, Link} from 'gatsby';
import {CssBaseline, Fab, Zoom} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {KeyboardArrowUp} from '@material-ui/icons';
import {useHasScroll} from 'has-scroll-hook';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import InnerBox from './InnerBox';
import NavDrawer from './NavDrawer';
import '../styles/layout.css';

const useStyles = makeStyles((theme) => ({
  topButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const ScrollTop = ({hasScroll}) => {
  const classes = useStyles();

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
        '#scroll-top',
    );

    if (anchor) {
      anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  };

  return (
    <Zoom in={hasScroll}>
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.topButton}
      >
        <Fab size="small" color="secondary" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </div>
    </Zoom>
  );
};

const Layout = ({showLogoImage = true, banner, children}) => {
  const hasScroll = useHasScroll();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          repository
        }
      }
      file(relativePath: { eq: "image/avatar/wizard.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 128, maxHeight: 128, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  const {title, repository} = data.site.siteMetadata;

  return (
    <Fragment>
      <CssBaseline />
      <Link id="scroll-top" to="/" />
      <TopBar
        title={title}
        avatar={data.file.childImageSharp.fluid}
        onToggleDrawer={handleToggleDrawer}
        hasScroll={hasScroll}
        showAvatar={showLogoImage}
      />
      {banner}
      <InnerBox flexGrow={1} paddingTop={2} paddingBottom={2}>
        {children}
      </InnerBox>
      <BottomBar copyright={title} repository={repository} />
      <ScrollTop hasScroll={hasScroll} />
      <NavDrawer open={isDrawerOpen} onClose={handleToggleDrawer} />
    </Fragment>
  );
};

export default Layout;
