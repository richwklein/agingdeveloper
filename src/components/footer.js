import React from "react";

import { Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box component="footer" classes={{ root: classes.footer }}>
      <Container maxWidth="md">
        <Box padding={4}></Box>
      </Container>
    </Box>
  );
};
