import React from 'react';
import {Link} from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  ButtonGroup,
  Grid,
  Typography,
} from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';
import bg from '../../assets/background1.jpg';

const handleStudentLogin = () => {
  //do some stuff and call /studentLogin on server
};

const Home = () => {
  const classes = useStyles ();

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.imageContainer}>
          <img src={bg} className={classes.image} />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Hello There!{' '}
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                  <Link to="/register">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Register
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Link to="/login">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Login
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Have a code?"
                    autoFocus
                  />
                </Grid>

              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles (theme => ({
  root: {
    height: '100vh',
  },
  imageContainer: {
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light'
      ? theme.palette.grey[50]
      : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: '0.8',
  },
  paper: {
    margin: theme.spacing (8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing (1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing (1),
  },
  submit: {
    margin: theme.spacing (3, 0, 2),
  },
}));

export default Home;
