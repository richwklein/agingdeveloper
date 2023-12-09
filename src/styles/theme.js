import {createTheme} from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      '"Arial"',
      '"sans-serif"',
      '"serif"',
    ].join(","),
  },
  palette: {
    primary: {
      light: "#62727b",
      main: "#37474f",
      dark: "#102027",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#bef67a",
      main: "#8bc34a",
      dark: "#5a9216",
      contrastText: "#000000",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
