import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Button,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Paper,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import WelcomScreen from "./WelcomeScreen";
import UserQuizzes from "./UserQuizzes";
import CreateQuiz from "./CreateQuiz";
import Contacts from "./Contacts";
import Groups from "./Groups";
import MyAccount from "./MyAccount";
import * as quizActions from "../../store/actions/quizActions";
import Logo from "../../assets/logo1.png";
import * as authActions from "../../store/actions/authActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbarItems: {
    justifyContent: "flex-end",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    display: "flex",
    marginTop: "64px",
    padding: "40px",
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  logo: {
    maxHeight: "64px",
  },
  mainContent: {
    flexGrow: 1,
  },
}));

function Dashboard(props) {
  const dispatch = useDispatch();
  let { path, url } = useRouteMatch();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const getUser = () => {
    dispatch(authActions.loadUser());
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutHandler = async () => {
    await dispatch(authActions.logout());
    props.history.push("/");
  };

  const clearQuizState = async () => {
    await dispatch(quizActions.clearCurrentQuiz());
  };

  const drawer = (
    <div>
      <div
        className={classes.toolbar}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={Logo} className={classes.logo} alt="" />
      </div>
      <Divider />
      <div className={classes.list}>
        <List component="nav" aria-label="side drawer">
          <Link to={`${url}`}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Random" />
            </ListItem>
          </Link>

          <Link to={`${url}/myquizzes`}>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="My Quizes" />
            </ListItem>
          </Link>

          <Link to={`${url}/createQuiz`} onClick={clearQuizState}>
            <ListItem button>
              <ListItemIcon>
                <LibraryAddIcon />
              </ListItemIcon>
              <ListItemText primary="Create new quiz" />
            </ListItem>
          </Link>

          <Link to={`${url}/contacts`}>
            <ListItem button>
              <ListItemIcon>
                <EmojiPeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItem>
          </Link>

          <Link to={`${url}/groups`}>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItem>
          </Link>

          <Link to={`${url}/myAccount`}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItem>
          </Link>
        </List>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // function ListItemLink(props) {
  // 	return <ListItem button component="a" {...props} />;
  // }

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
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
              {drawer}
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
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <Paper className={classes.mainContent} elevation={0}>
            <Switch>
              <Route exact path={path} component={WelcomScreen} />
              <Route path={`${url}/myquizzes`} component={UserQuizzes} />
              <Route path={`${url}/createquiz`} component={CreateQuiz} />
              <Route path={`${url}/contacts`} component={Contacts} />
              <Route path={`${url}/groups`} component={Groups} />
              <Route
                path={`${url}/myAccount`}
                render={() => <MyAccount history={props.history} />}
              />
            </Switch>
          </Paper>
        </main>
      </div>
    </Router>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won"t need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
