"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactsScreenStyles = exports.createQuizScreenStyles = exports.userQuizzesScreenStyle = exports.screenLayoutStyles = void 0;

var _styles = require("@material-ui/core/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var screenLayoutStyles = (0, _styles.makeStyles)({
  root: {
    flexGrow: 1,
    padding: "20px",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});
exports.screenLayoutStyles = screenLayoutStyles;
var userQuizzesScreenStyle = (0, _styles.makeStyles)(function (theme) {
  return {
    titleContainer: _defineProperty({
      marginBottom: "8px"
    }, theme.breakpoints.down("md"), {
      marginBottom: "8px",
      marginTop: "20px"
    }),
    card: {
      width: "300px",
      height: "200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
      // background: "rgb(131,168,250)",
      // background: "linear-gradient(104deg, rgba(131, 168, 250, 1) 6%, rgba(112, 148, 246, 1) 67%)",
      backgroundColor: theme.palette.background["default"],
      //padding: theme.spacing(1),
      borderRadius: "10px"
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
      maxHeight: "80%"
    }, theme.breakpoints.down("md"), {
      paddingTop: "15px",
      maxHeight: "90%"
    }),
    quizName: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end" //color: "#fff"

    }
  };
});
exports.userQuizzesScreenStyle = userQuizzesScreenStyle;
var createQuizScreenStyles = (0, _styles.makeStyles)(function (theme) {
  return {
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
    }, theme.breakpoints.down("sm"), {}),
    paper: _defineProperty({
      padding: theme.spacing(2),
      textAlign: "center"
    }, theme.breakpoints.down("sm"), {
      padding: theme.spacing(0)
    }),
    buttonContainer: _defineProperty({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: "10px",
      paddingBottom: "10px",
      backgroundColor: theme.palette.background["default"]
    }, theme.breakpoints.down("sm"), {
      flex: 0,
      padding: "8px 8px",
      width: "100%"
    }),
    titleContainer: _defineProperty({
      marginTop: "10px",
      marginRight: "3px",
      marginLeft: "3px",
      width: "90%"
    }, theme.breakpoints.down("sm"), {
      flexDirection: "column",
      width: "100%",
      alignItems: "flex-start",
      margin: "0px",
      marginBottom: "5px"
    }),
    titleNameContainer: _defineProperty({
      display: "flex",
      alignItems: "flex-end"
    }, theme.breakpoints.down("sm"), {
      flexDirection: "row",
      justifyContent: "flex-start"
    }),
    buttons: _defineProperty({
      width: "90%",
      display: "flex",
      justifyContent: "flex-end"
    }, theme.breakpoints.down("sm"), {
      flexDirection: "row",
      justifyContent: "center",
      width: "100%"
    }),
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