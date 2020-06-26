import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authActions";

const MyAccount = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleDeleteAccount = () => {
    alert("Are you sure you want to delete your account?");
  };

  const logoutHandler = async () => {
    await dispatch(authActions.logout());
    props.history.push("/");
  };

  return (
    <div className="myAccount__wrapper">
      <h1 className="myAccount__title">MY ACCOUNT</h1>
      <ul className="myAccount__list">
        <li>Name: {user && user.name}</li>
        <li>Email: {user && user.email}</li>
      </ul>
      <button onClick={logoutHandler} className="myAccount__logout">
        Log out
      </button>
      <button
        onClick={handleDeleteAccount}
        className="myAccount__delete-account"
      >
        Delete account
      </button>
    </div>
  );
};

export default MyAccount;
