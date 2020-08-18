import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as errorActions from "../../store/actions/errorActions";
import { BrowserRouter, Switch } from "react-router-dom";
import { ProtectedRoute, PublicRoute, StudentRoute } from "./Routes";
import Dashboard from "../../screens/userScreens/Dashboard";
import Home from "../../screens/authenticationScreens/Home";
import Login from "../../screens/authenticationScreens/Login";
import ForgotPassword from "../../screens/authenticationScreens/ForgotPassword";
import Register from "../../screens/authenticationScreens/Register";
import Quiz from "../../screens/studentScreens/Quiz";
import LoadingOverlay from "react-loading-overlay";
import RingLoader from "react-spinners/RingLoader";
import theme from "../../style/theme";
import CustomSnakbar from "../mui/Snackbar";
import "../../app.css";

const MainNavigation = () => {
  const loading = useSelector((state) => state.error.loading);
  const loadingMsg = useSelector((state) => state.error.loadingMsg);
  const dispatch = useDispatch();
  const hasError = useSelector((state) => state.error.errorId !== null);
  const error = useSelector((state) => state.error.errorMsg);

  function handleClose() {
    dispatch(errorActions.clearErrors());
  }

  const LoadingDisplay = () => (
    <LoadingOverlay
      active={loading}
      spinner={<RingLoader size={80} color={theme.palette.secondary.main} />}
      text={loadingMsg}
      className="full"
    >
      {hasError && (
        <CustomSnakbar
          severity="error"
          message={error}
          handleClose={handleClose}
        />
      )}
      <BrowserRouter>
        <Switch>
          <PublicRoute exact={true} path="/" component={Home} />
          <PublicRoute exact={true} path="/login" component={Login} />
          <PublicRoute exact={true} path="/register" component={Register} />
          <PublicRoute
            exact={true}
            path="/forgotPassword"
            component={ForgotPassword}
          />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <StudentRoute path="/quiz" component={Quiz} />
        </Switch>
      </BrowserRouter>
    </LoadingOverlay>
  );

  return <LoadingDisplay />;
};

export default MainNavigation;