"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _paperbg = _interopRequireDefault(require("../assets/images/paperbg.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var studentScreensStyles = (0, _styles.makeStyles)(function (theme) {
  var _paperBackground;

  return {
    root: _defineProperty({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      height: "100%"
    }, theme.breakpoints.down("sm"), {
      overflowY: "scroll"
    }),
    paperBackground: (_paperBackground = {
      backgroundColor: "#fff",
      //backgroundImage: `url(${paper})`,
      width: "60%",
      height: "95%",
      border: "3px solid ".concat(theme.palette.primary.main)
    }, _defineProperty(_paperBackground, theme.breakpoints.down("md"), {
      width: "90%"
    }), _defineProperty(_paperBackground, theme.breakpoints.down("sm"), {
      overflow: "scroll",
      width: "100%",
      height: "100%",
      border: "0"
    }), _paperBackground),
    content: _defineProperty({
      height: "100%",
      display: "flex",
      justifyContent: "center",
      overflow: "hidden",
      padding: theme.spacing(5)
    }, theme.breakpoints.down("sm"), {
      overflow: "scroll",
      padding: theme.spacing(2)
    }),
    quizStartContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column"
    },
    quizInfo: _defineProperty({
      margin: "0 auto",
      width: "100%",
      textAlign: "center",
      border: "2px solid ".concat(theme.palette.primary.main),
      padding: "10px",
      paddingTop: "24px"
    }, theme.breakpoints.down("sm"), {
      padding: "5px",
      paddingTop: "14px"
    }),
    quizRules: _defineProperty({
      paddingLeft: "5px",
      paddingTop: "20px"
    }, theme.breakpoints.down("sm"), {
      paddingTop: "10px"
    }),
    buttons: _defineProperty({
      textAlign: "right",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end"
    }, theme.breakpoints.down("sm"), {
      paddingTop: "10px",
      marginBottom: "10px"
    }),
    button: _defineProperty({
      width: "200px",
      marginTop: "15px"
    }, theme.breakpoints.down("sm"), {
      width: "100%"
    }),
    quiz__content: {
      width: "100%",
      display: "flex",
      flexDirection: "column"
    },
    quiz__info: _defineProperty({
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      borderBottom: "2px solid ".concat(theme.palette.primary.main)
    }, theme.breakpoints.down("sm"), {
      border: 0
    }),
    quiz__questionContent: _defineProperty({
      overflowY: "scroll",
      overflowX: "hidden",
      maxHeight: "60vh",
      minHeight: "50vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "20px",
      justifyContent: "space-between",
      border: "2px solid ".concat(theme.palette.primary.main)
    }, theme.breakpoints.down("md"), {
      maxHeight: "75vh",
      minHeight: "70vh"
    }),
    quiz__question: _defineProperty({
      width: "100%",
      textAlign: "left",
      padding: "5px 10px",
      display: "flex",
      flexDirection: "column",
      borderBottom: "1px solid ".concat(theme.palette.primary.main)
    }, theme.breakpoints.down("sm"), {
      borderBottom: "0",
      padding: "5px 5px"
    }),
    quiz__medias: _defineProperty({
      display: "flex",
      flexDirection: "column",
      margin: "10px"
    }, theme.breakpoints.down("sm"), {
      maxWidth: "90%",
      alignItems: "center"
    }),
    quiz__media: _defineProperty({
      marginBottom: "5px",
      // border: `1px solid ${theme.palette.primary.main}`,
      width: "350px",
      height: "250px"
    }, theme.breakpoints.down("sm"), {
      maxWidth: "100%",
      alignItems: "center"
    }),
    media__image: {
      width: "100%"
    },
    quiz__options: {
      display: "flex",
      flexDirection: "column",
      width: "100%"
    },
    quiz__option: {
      maxWidth: "100%",
      borderTop: "1px solid black",
      transition: "background - color 200ms linear",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    quiz__optionRadio: {
      borderRight: "1px solid ".concat(theme.palette.primary.main),
      paddingLeft: "10px"
    },
    quiz__progress: _defineProperty({
      marginTop: "30px",
      display: "flex",
      flexDirection: "column",
      border: "2px solid ".concat(theme.palette.primary.main)
    }, theme.breakpoints.down("sm"), {
      marginTop: "10px"
    }),
    progressBar: {
      width: "100%",
      border: "2px solid ".concat(theme.palette.primary.main),
      height: "15px"
    },
    quiz__progressDetails: _defineProperty({
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "5px 10px"
    }, theme.breakpoints.down("sm"), {
      padding: "3px 5px"
    }),
    progressBar__progress: {
      height: "100%",
      backgroundColor: theme.palette.primary.main
    },
    finsihQuizContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "20px"
    }
  };
});
var _default = studentScreensStyles;
exports["default"] = _default;