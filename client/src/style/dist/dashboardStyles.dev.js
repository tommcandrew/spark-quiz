"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/core/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var drawerWidth = 240;
var useStyles = (0, _styles.makeStyles)(function (theme) {
  var _content;

  return {
    active: {
      backgroundColor: theme.palette.secondary.light
    },
    item: {},
    root: {
      display: "flex",
      height: "100vh",
      width: "100vw"
    },
    drawer: _defineProperty({}, theme.breakpoints.up("md"), {
      width: drawerWidth,
      flexShrink: 0
    }),
    appBar: _defineProperty({}, theme.breakpoints.up("md"), {
      width: "calc(100% - ".concat(drawerWidth, "px)"),
      marginLeft: drawerWidth
    }),
    menuButton: _defineProperty({
      marginRight: theme.spacing(2)
    }, theme.breakpoints.up("md"), {
      display: "none"
    }),
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    toolbarItems: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    navItemsLeft: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    content: (_content = {
      flexGrow: 1,
      display: "flex",
      margin: theme.spacing(5),
      marginTop: "100px",
      background: "#fff",
      padding: "20px"
    }, _defineProperty(_content, "display", "flex"), _defineProperty(_content, "alignItems", "flex-start"), _defineProperty(_content, "justifyContent", "center"), _defineProperty(_content, "boxShadow", "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16),  0 8px 8px rgba(0,0,0,0.20)"), _defineProperty(_content, "borderRadius", "5px"), _defineProperty(_content, theme.breakpoints.down("sm"), {
      padding: theme.spacing(0),
      margin: "0",
      marginTop: "56px"
    }), _content),
    list: {
      width: "100%",
      maxWidth: 360
    },
    logo: {
      textAlign: "center",
      padding: "10px",
      maxHeight: "64px",
      width: "150px"
    }
  };
});
exports.useStyles = useStyles;