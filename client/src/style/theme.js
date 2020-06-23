import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
// import { deepPurple, amber } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#506063",
      main: "#25393c",
      dark: "##19272a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#9e6d55",
      main: "#86492b",
      dark: "#5d331e",
      contrastText: "#fff",
    },
    transition: {
      light: "#9e6d55",
      main: "#e5c8ba",
      dark: "#ead3c7",
      contrastText: "#000",
    },
  },
});

let responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;

// color good: 161748;
