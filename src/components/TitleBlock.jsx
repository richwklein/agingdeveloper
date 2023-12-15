import React from "react";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

/**
 * React component for showing the title and subtitle of an article.
 *
 * @param {TitleBlockType} props - The title and subtitle props.
 * @return {React.ReactElement}
 *
 * @example
 * <TitleBlock title={title} subtitle={description } />
 */
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

/**
 * @typedef TitleBlockType - The title block PropTypes.
 * @property {string} title - The title of the article.
 * @property {string} [subtitle] - The subtitle of the article.
 */
TitleBlock.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default TitleBlock;
