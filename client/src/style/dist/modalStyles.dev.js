"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addContactModalStyles = exports.shareModalStyles = exports.addQuestionModalStyles = exports.quizOptionsModalStyles = exports.modalRootStyles = void 0;

var _styles = require("@material-ui/core/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var modalRootStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flex: 1,
      padding: "10px",
      overflowX: "hidden",
      overflowY: "hidden"
    }
  };
});
exports.modalRootStyles = modalRootStyles;
var quizOptionsModalStyles = (0, _styles.makeStyles)(function (theme) {
  return {};
});
exports.quizOptionsModalStyles = quizOptionsModalStyles;
var addQuestionModalStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      maxHeight: "75%",
      overflowY: "hidden",
      overflowX: "hidden"
    },
    scrollContainer: _defineProperty({
      height: "500px",
      overflowX: "hidden",
      overflowY: "scroll !important",
      margin: "0",
      width: "100%"
    }, theme.breakpoints.down("sm"), {
      height: "350px"
    }),
    label: _defineProperty({
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    }, theme.breakpoints.down("xs"), {
      alignItems: "flex-end",
      justifyContent: "center",
      padding: "8px"
    }),
    input: _defineProperty({
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center"
    }, theme.breakpoints.down("xs"), {
      justifyContent: "center"
    }),
    card: {
      height: "280px",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    addedMediaContainer: {
      width: "75%",
      height: "75%"
    },
    addedMedia: {
      width: "100%"
    },
    cardActions: {
      width: "100%"
    },
    textArea: _defineProperty({
      borderBottom: "1px solid black",
      pading: "5px",
      maxlength: "100",
      width: "100%"
    }, "width", "100%"),
    button: {
      marginBottom: "5px"
    }
  };
});
exports.addQuestionModalStyles = addQuestionModalStyles;
var shareModalStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    container: {
      width: "100%",
      border: "1px solid ".concat(theme.palette.primary.main),
      borderTop: 0,
      height: "200px",
      overflowY: "scroll",
      boxShadow: "0 3px 3px rgba(0,0,0,0.2)"
    }
  };
});
exports.shareModalStyles = shareModalStyles;
var addContactModalStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    label: _defineProperty({
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    }, theme.breakpoints.down("xs"), {
      alignItems: "flex-end",
      justifyContent: "center",
      padding: "8px"
    }),
    input: _defineProperty({
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center"
    }, theme.breakpoints.down("xs"), {
      justifyContent: "center"
    }),
    button: _defineProperty({}, theme.breakpoints.down("xs"), {
      width: "100%"
    }),
    nonGroupMembersContainer: {
      border: "1px solid ".concat(theme.palette.primary.main),
      borderRadius: "3px",
      height: "180px",
      maxHeight: "30%",
      overflowY: "scroll",
      marginTop: "2px"
    }
  };
});
exports.addContactModalStyles = addContactModalStyles;