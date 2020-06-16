import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/authActions';

const Register = () => {
  //STATE
  const [name, setName] = useState ('testuser');
  const [email, setEmail] = useState ('testuser@test.com');
  const [password, setPassword] = useState ('12345678');
  const [password2, setPassword2] = useState('12345678'); 
  const dispatch = useDispatch ();

  const classes = useStyles ();


  //HANDLERS
  const handleRegister = () => {
    const registerDetails = {
      name,
      email,
      password,
      password2,
    };
    dispatch(authActions.register(registerDetails));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
                value={name}
                onChange={e => setName (e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail (e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                minLength="8"
                value={password}
                onChange={e => setPassword (e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Retype password"
                type="password"
                id="password2"
                minLength="8"
                value={password2}
                onChange={e => setPassword2 (e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleRegister}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">
                <Typography href="#" variant="body2">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const useStyles = makeStyles (theme => ({
  paper: {
    marginTop: theme.spacing (8),
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


export default Register;
;
