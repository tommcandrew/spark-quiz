import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Avatar, Typography } from "@material-ui/core/";
import { useStyles } from "../../style/authScreensStyles";
import logo from "../../assets/images/logo.png";
import * as authActions from "../../store/actions/authActions";
import { useDispatch } from "react-redux";
import CustomSnackbar from "../../components/mui/Snackbar";
import V from "max-validator";
import { studentLoginValidation } from "../../utils/validation";

const Home = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState("");
   const { from } = props.location.state || {
    from: { pathname: "/dashboard/myquizzes" },
  };

  //HANDLERS
  const studentLoginHandler = async (e) => {
    e.preventDefault();
    setValidationError("");
    const studentCode = e.target.code.value;
    const result = V.validate({ code: studentCode }, studentLoginValidation);
    if (result.hasError) {
      setValidationError(result.getError("code"));
      return;
    } else {
      await dispatch(authActions.studentLogin(studentCode));
      props.history.push("/quiz");
    }
  };

  const demoLogin = async () => {
    console.log("DEMO LOGIN");
    const loginData = { email: "johndoe@spark-quiz.com", password: "john123doe" };
    await dispatch(authActions.login(loginData));
    props.history.push(from);
  };

  //MAIN
  return (
    <div className={classes.homeBg}>
      <div className={classes.hero}></div>

      <div className={classes.paper}>
        {validationError !== "" && (
          <CustomSnackbar
            severity="error"
            message={validationError}
            handleClose={() => setValidationError("")}
          />
        )}
        <Avatar
          alt="logo"
          src={logo}
          className={classes.large}
          variant="square"
        />
        <form
          className={classes.form}
          noValidate
          onSubmit={studentLoginHandler}
        >
          
          <Link to="/login">
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.actionButton}
            >
              Log in
            </Button>
          </Link>
            
          <Link to="/register">
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.actionButton}
            >
              Register
            </Button>
          </Link>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="secondary"
            className={classes.actionButton}
            onClick={demoLogin}
          >
            Demo login
          </Button>
          <TextField
            color="primary"
            variant="outlined"
            margin="normal"
            fullWidth
            id="code"
            label="Have a code?"
            name="code"
            autoFocus
          />
          <Typography variant="subtitle" component="p" align="center">
            (use code "SPARK" for sample quiz)
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Go
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
