"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styles = require("@material-ui/core/styles");

var theme = (0, _styles.createMuiTheme)({
  typography: {
    button: {
      textTransform: "none"
    }
  },
  palette: {
    primary: {
      light: "#a8c8f0",
      main: "#103056",
      dark: "#091c34",
      contrastText: "#fff"
    },
    secondary: {
      light: "#fac7ce",
      main: "#ee425a",
      dark: "#710A18",
      contrastText: "#fff"
    },
    background: {
      "default": "#e0e0e0"
    }
  }
});
var responsiveTheme = (0, _styles.responsiveFontSizes)(theme);
var _default = responsiveTheme;
exports["default"] = _default;