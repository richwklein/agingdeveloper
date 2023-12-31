import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {Box, Card, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";

/**
 * React component for showing the word count and time to read for an article.
 *
 * @param {ArticleTimeToReadProps} props - The article time to read props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <ArticleTimeToRead
 *   minutes={timeToRead.minutes}
 *   words={timeToRead.words}
 *   lang={lang} />
 */
export const ArticleTimeToRead = ({minutes, words, lang}) => {
  const wordFormat = new Intl.NumberFormat(lang).format(words);
  const readTemplate = `${Math.ceil(minutes)} min read`;
  const wordsTemplate = `${wordFormat} words`;

  return (
    <Card variant="outlined" sx={{p: .75}}>
      <Stack direction="row" useFlexGap alignItems="center" spacing={1.5}>
        <AccessTimeOutlinedIcon />
        <Box flex={1}>
          <Typography component={Box} variant="body2">
            {readTemplate}
          </Typography>
          <Typography component={Box} variant="body2">
            {wordsTemplate}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

/**
 * @typedef ArticleTimeToReadProps - An article's time to read props.
 * @property {number} minutes - The number of minutes it takes to read.
 * @property {number} words - The number of words in the article.
 * @property {string} lang - The language the article is in.
 */
ArticleTimeToRead.propTypes = {
  minutes: PropTypes.number.isRequired,
  words: PropTypes.number.isRequired,
  lang: PropTypes.string.isRequired,
};

export default ArticleTimeToRead;
