import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authActions";

const MyAccount = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await dispatch(authActions.deleteAccount());
      props.history.push("/");
    } else {
      return;
    }
  };

  const logoutHandler = async () => {
    await dispatch(authActions.logout());
    props.history.push("/");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    await dispatch(authActions.changePassword(currentPassword, newPassword));
  };

  return (
    <div className="myAccount__wrapper">
      <h1 className="myAccount__title">MY ACCOUNT</h1>
      <ul className="myAccount__list">
        <li>Name: {user && user.name}</li>
        <li>Email: {user && user.email}</li>
      </ul>
      <form onSubmit={handleChangePassword}>
        <label htmlFor="currentPassword">Current password:</label>
        <input type="password" id="currentPassword" name="currentPassword" />
        <label htmlFor="currentPassword">New password:</label>
        <input type="password" id="newPassword" name="newPassword" />
        <button type="submit">Confirm</button>
      </form>
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
