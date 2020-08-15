import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authActions";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Avatar,
} from "@material-ui/core";
import { useStyles } from "../../style/authScreensStyles";
import CustomSnackbar from "../../components/mui/Snackbar";
import V from "max-validator";
import { loginValidation } from "../../utils/validation";

const Login = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [validationError, setValidationError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { from } = props.location.state || {
    from: { pathname: "/dashboard/myquizzes" },
  };

  //HANDLERS
  const loginHandler = async () => {
    const loginData = { email, password };
    setValidationError("");
    const result = V.validate(loginData, loginValidation);
    if (result.hasError) {
      if (result.getError("email"))
        setValidationError(result.getError("email"));
      else if (result.getError("password") !== "")
        setValidationError(result.getError("password"));
      return;
    } else {
      await dispatch(authActions.login(loginData));
      props.history.push(from);
    }
  };

  //MAIN
  return (
    <Container component="main" maxWidth="sm">
      {validationError !== "" && (
        <CustomSnackbar
          severity="error"
          message={validationError}
          handleClose={() => setValidationError("")}
        />
      )}

      <div className={classes.paperLogin}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                color="primary"
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="primary"
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginHandler}
            data-testid="login-button"
          >
            Log In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/register">
                <Typography href="#" variant="body2">
                  Don"t have an account? Sign up
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/forgotPassword">
                <Typography href="#" variant="body2">
                  I forgot my password
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
