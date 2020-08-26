"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactsScreenStyles = exports.createQuizScreenStyles = exports.userQuizzesScreenStyle = exports.screenLayoutStyles = void 0;

var _styles = require("@material-ui/core/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var screenLayoutStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: _defineProperty({
      flexGrow: 1,
      padding: "20px",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }, theme.breakpoints.down("sm"), {
      padding: "0px"
    })
  };
});
exports.screenLayoutStyles = screenLayoutStyles;
var userQuizzesScreenStyle = (0, _styles.makeStyles)(function (theme) {
  return {
    titleContainer: _defineProperty({
      marginBottom: "10px !important"
    }, theme.breakpoints.down("md"), {
      marginTop: "20px !important"
    }),
    card: {
      width: "300px",
      height: "200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      backgroundColor: theme.palette.background["default"],
      borderRadius: "10px",
      padding: "10px 3px"
    },
    cardGridItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    list: _defineProperty({
      margin: "auto",
      overflowX: "hidden",
      width: "100%",
      padding: "20px",
      maxHeight: "80%",
      marginTop: "5px !important"
    }, theme.breakpoints.down("md"), {
      marginTop: "0",
      paddingTop: "15px",
      maxHeight: "90%"
    }),
    quizName: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end" //color: "#fff"

    },
    cardActions: {
      width: "100%",
      display: "flex",
      justifyContent: "space-evenly"
    }
  };
});
exports.userQuizzesScreenStyle = userQuizzesScreenStyle;
var createQuizScreenStyles = (0, _styles.makeStyles)(function (theme) {
  var _buttonContainer, _titleContainer2, _button;

  return {
    noQuizContainer: _defineProperty({}, theme.breakpoints.down("md"), {
      marginTop: "20px !important"
    }),
    textField: _defineProperty({}, theme.breakpoints.down("sm"), {
      width: "90%"
    }),
    quizSubjectText: _defineProperty({}, theme.breakpoints.down("sm"), {
      marginTop: "15px"
    }),
    quizNameContainer: {
      display: "flex",
      justifyContent: "center"
    },
    makeNewQuizContainer: _defineProperty({
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "space-between"
    }, theme.breakpoints.down("sm"), {
      paddingTop: "10px"
    }),
    paper: _defineProperty({
      padding: theme.spacing(2),
      textAlign: "center"
    }, theme.breakpoints.down("sm"), {
      padding: theme.spacing(0)
    }),
    buttonContainer: (_buttonContainer = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: "10px",
      paddingBottom: "10px",
      backgroundColor: theme.palette.background["default"]
    }, _defineProperty(_buttonContainer, theme.breakpoints.down("md"), {
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "10px",
      flex: 0
    }), _defineProperty(_buttonContainer, theme.breakpoints.down("sm"), {
      padding: "4px",
      paddingBottom: "0px"
    }), _buttonContainer),
    titleContainer: (_titleContainer2 = {
      marginTop: "10px",
      marginRight: "3px",
      marginLeft: "3px",
      width: "90%"
    }, _defineProperty(_titleContainer2, theme.breakpoints.down("md"), {
      marginTop: "0"
    }), _defineProperty(_titleContainer2, theme.breakpoints.down("sm"), {
      flexDirection: "column",
      width: "100%",
      alignItems: "flex-start",
      marginBottom: "0px"
    }), _titleContainer2),
    titleNameContainer: _defineProperty({
      display: "flex",
      alignItems: "flex-end"
    }, theme.breakpoints.down("md"), {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: "5px",
      textAlign: "center"
    }),
    buttons: _defineProperty({
      display: "flex",
      justifyContent: "flex-end",
      width: "90%"
    }, theme.breakpoints.down("md"), {
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      marginTop: "10px"
    }),
    button: (_button = {
      marginRight: "10px"
    }, _defineProperty(_button, theme.breakpoints.down("md"), {
      margin: "10px",
      width: "100%"
    }), _defineProperty(_button, theme.breakpoints.down("sm"), {
      fontSize: "0.75em",
      margin: "0px",
      borderRadius: "0"
    }), _button),
    gridItem: {
      padding: "10px"
    },
    previewQuestionsContainer: {
      flex: 1,
      marginTop: "10px"
    }
  };
});
exports.createQuizScreenStyles = createQuizScreenStyles;
var contactsScreenStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    contactsMainContainer: {
      height: "100%",
      padding: "20px"
    },
    contactsContainer: _defineProperty({
      height: "80%",
      overflowY: "scroll",
      width: "100%",
      border: "1px solid ".concat(theme.palette.primary.main),
      padding: "20px"
    }, theme.breakpoints.down("xs"), {
      border: "none"
    }),
    gridItem: {
      height: "200px",
      marginBottom: "10px"
    },
    paper: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      height: "100%",
      backgroundColor: theme.palette.background["default"]
    }
  };
});
exports.contactsScreenStyles = contactsScreenStyles;