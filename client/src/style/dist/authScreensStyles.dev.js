"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/core/styles");

var _hero2 = _interopRequireDefault(require("../assets/images/hero2.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  var _paper, _large, _paperLogin, _avatar;

  return {
    homeBg: _defineProperty({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      overflow: "hdden"
    }, theme.breakpoints.down("md"), {
      flexDirection: "column",
      display: "relative",
      height: "100vh"
    }),
    paper: (_paper = {
      width: "600px",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(8),
      marginRight: "50px",
      boxShadow: "0 1px 1px rgba(0,0,0,0.25), 0 2px 2px rgba(0,0,0,0.20), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.10), 0 16px 16px rgba(0,0,0,0.05)",
      borderRadius: "25px"
    }, _defineProperty(_paper, theme.breakpoints.down("md"), {
      justifyContent: "flex-start",
      width: "100%",
      height: "100vh",
      marginRight: "0",
      boxShadow: "0",
      borderRadius: "0"
    }), _defineProperty(_paper, theme.breakpoints.down("sm"), {
      padding: theme.spacing(2)
    }), _paper),
    hero: _defineProperty({
      width: "60%",
      height: "100%",
      backgroundImage: "url(".concat(_hero2["default"], ")"),
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      position: "relative"
    }, theme.breakpoints.down("md"), {
      opacity: "0",
      width: "100%",
      position: "absolute"
    }),
    large: (_large = {
      height: "120px",
      width: "250px"
    }, _defineProperty(_large, theme.breakpoints.down("md"), {
      margin: "20px"
    }), _defineProperty(_large, theme.breakpoints.down("sm"), {
      margin: "3px",
      marginTop: theme.spacing(3),
      height: "100px",
      width: "200px"
    }), _large),
    paperLogin: (_paperLogin = {
      width: "600px",
      background: "#fff",
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start"
    }, _defineProperty(_paperLogin, "padding", theme.spacing(3)), _defineProperty(_paperLogin, "paddingTop", theme.spacing(6)), _defineProperty(_paperLogin, "marginTop", theme.spacing(8)), _defineProperty(_paperLogin, "boxShadow", "0 1px 1px rgba(0,0,0,0.25), 0 2px 2px rgba(0,0,0,0.20), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.10), 0 16px 16px rgba(0,0,0,0.05)"), _defineProperty(_paperLogin, "borderRadius", "25px"), _defineProperty(_paperLogin, theme.breakpoints.down("md"), {
      width: "100%",
      height: "100vh",
      boxShadow: "none",
      borderRadius: "0"
    }), _defineProperty(_paperLogin, theme.breakpoints.down("sm"), {
      marginTop: theme.spacing(0),
      width: "100%",
      height: "100%"
    }), _paperLogin),
    form: _defineProperty({
      width: "100%",
      // Fix IE 11 issue.
      marginTop: theme.spacing(2)
    }, theme.breakpoints.down("sm"), {
      marginTop: theme.spacing(1)
    }),
    submit: {
      margin: theme.spacing(3, 0, 4)
    },
    actionButton: {
      margin: theme.spacing(2, 0, 1)
    },
    avatar: (_avatar = {
      backgroundColor: theme.palette.primary.main
    }, _defineProperty(_avatar, theme.breakpoints.down("md"), {
      margin: "20px"
    }), _defineProperty(_avatar, theme.breakpoints.down("sm"), {
      margin: "3px",
      marginTop: theme.spacing(3)
    }), _avatar),
    loginBg: _defineProperty({
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      overflow: "hdden"
    }, theme.breakpoints.down("sm"), {
      backgroundColor: "#fff"
    })
  };
});
exports.useStyles = useStyles;