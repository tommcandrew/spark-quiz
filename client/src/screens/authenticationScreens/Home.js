import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Avatar } from "@material-ui/core/";
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
              SignIn?
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
              Register!
            </Button>
          </Link>
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
