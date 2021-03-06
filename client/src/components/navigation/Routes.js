import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export const StudentRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  const isStudent = localStorage.getItem("role") === "student" ? true : false;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isStudent ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/finishQuiz",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  const isTeacher = localStorage.getItem("role") === "teacher" ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isTeacher ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  const isTeacher = localStorage.getItem("role") === "teacher" ? true : false;
  const isStudent = localStorage.getItem("role") ==="student"? true: false
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          if (isTeacher) {
            return <Redirect to="/dashboard/myquizzes" />;
          } else if (isStudent) {
            return <Redirect to="/quiz" />;
          }
        } else return <Component {...props} />;
      }}
    />
  );
};
