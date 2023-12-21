import React from "react";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

/**
 * React component for rendering the title and subtitle of an article.
 *
 * @param {TitleBlockProps} props - The title and subtitle props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <TitleBlock title={title} subtitle={description } />
 */
export const TitleBlock = ({title, subtitle=null}) => {
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

/**
 * @typedef TitleBlockProps - The title block props.
 * @property {string} title - The title of the article.
 * @property {string} [subtitle=null] - The subtitle of the article.
 */
TitleBlock.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default TitleBlock;
