import React from 'react';
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import ProtectedRoute from '../../components/navigation/ProtectedRoute';
import UserQuizzes from './UserQuizzes';
import CreateQuiz from './CreateQuiz';
import Contacts from './Contacts';
import Groups from './Groups';
import * as authActions from '../../store/actions/authActions';

const drawerWidth = 240;

const useStyles = makeStyles (theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up ('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up ('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing (2),
    [theme.breakpoints.up ('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing (3),
  },
}));

function ResponsiveDrawer(props) {
  const dispatch = useDispatch()
  let {path, url} = useRouteMatch ();
  const {window} = props;
  const classes = useStyles ();
  const theme = useTheme ();
  const [mobileOpen, setMobileOpen] = React.useState (false);

  const handleDrawerToggle = () => {
    setMobileOpen (!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <ul>
        <li>
          <Link to={`${url}/myquizzes`}>My Quizes</Link>
        </li>
        <li>
          <Link to={`${url}/createquiz`}>Create Quiz</Link>
        </li>
        <li>
          <Link to={`${url}/contacts`}>Contacts</Link>
        </li>
        <li>
          <Link to={`${url}/groups`}>Groups</Link>
        </li>
        <li>
          <button
            onClick={() => {
              dispatch (authActions.logout ());
            }}
          >
            Sign Out
          </button>
        </li>

      </ul>

    </div>
  );

  const container = window !== undefined
    ? () => window ().document.body
    : undefined;

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path={path}>
              <h3>Please select a topic.</h3>
            </Route>

            <Route path={`${url}/myquizzes`} component={UserQuizzes} />
            <Route path={`${url}/createquiz`} component={CreateQuiz} />
            <Route path={`${url}/contacts`} component={Contacts} />
            <Route path={`${url}/groups`} compoenent={Groups} />
          </Switch>

        </main>
      </div>
    </Router>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
