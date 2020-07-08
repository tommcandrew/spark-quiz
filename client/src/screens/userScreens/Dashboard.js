import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "../../style/dashboardStyles";
import { useTheme } from "@material-ui/core/styles";

import CustomDrawer from "../../components/mui/CustomDrawer";
import WelcomeScreen from "./WelcomeScreen";
import UserQuizzesScreen from "./UserQuizzesScreen";
import CreateQuizScreen from "./CreateQuizScreen";
import ContactsScreen from "./ContactsScreen";
import GroupsScreen from "./GroupsScreen";
import MyAccountScreen from "./MyAccountScreen";

import * as quizActions from "../../store/actions/quizActions";
import * as authActions from "../../store/actions/authActions";
import * as userActions from "../../store/actions/userActions";

const Dashboard = ({ window, history }, props) => {
  console.log("i am being called again")
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  let { path, url } = useRouteMatch();
  const user = useSelector((state) => state.auth.user); //verfies user on each page reload

  const [mobileOpen, setMobileOpen] = useState(false);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  //USER VERIFICATION ON RELOADS
  const getUser = () => {
    dispatch(authActions.loadUser());
    dispatch(userActions.fetchQuizzes())
  };
  useEffect(() => {
    if (!user) getUser();
  }, []);

  //HANDLERS
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push("/");
  };

  const handleClearQuizState = () => {
    dispatch(quizActions.clearCurrentQuiz());
  };

  //MAIN
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbarItems}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="h5">Hello, &nbsp; </Typography>
              <Typography variant="h3" color="secondary">
                {" "}
                {user ? user.name : ""}
              </Typography>
            </div>
            <Button
              color="inherit"
              className={classes.logoutButton}
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <CustomDrawer url={url} clearQuizState={handleClearQuizState} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <CustomDrawer url={url} clearQuizState={handleClearQuizState} />
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <Paper className={classes.mainContent} elevation={0}>
            <Switch>
              <Route exact path={path} component={WelcomeScreen} />
              <Route path={`${url}/myquizzes`} component={UserQuizzesScreen} />
              <Route path={`${url}/updatequiz`} component={CreateQuizScreen} />
              <Route path={`${url}/createquiz`} component={CreateQuizScreen} />
              <Route path={`${url}/contacts`} component={ContactsScreen} />
              <Route path={`${url}/groups`} component={GroupsScreen} />
              <Route path={`${url}/myAccount`} component={MyAccountScreen} />
            </Switch>
          </Paper>
        </main>
      </div>
    </Router>
  );
};

export default Dashboard;
