import React from "react";
import { Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box component="footer" className={classes.footer}>
      <Container maxWidth="md">
        <Box padding={4}></Box>
      </Container>
    </Box>
  );
};
