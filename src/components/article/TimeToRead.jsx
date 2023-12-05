import React from "react";
import {Box, Card, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const TimeToRead = ({minutes, words, lang}) => {
  const wordFormat = new Intl.NumberFormat(lang).format(words);
  const readTemplate = `${Math.ceil(minutes)} min read`;
  const wordsTemplate = `${wordFormat} words`;

  return (
    <Card variant="outlined" sx={{padding: .5}}>
      <Stack direction="row" useFlexGap alignItems="center" spacing={1}>
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

TimeToRead.propTypes = {
  minutes: PropTypes.number,
  words: PropTypes.number,
  lang: PropTypes.string.isRequired,
};

export default TimeToRead;
