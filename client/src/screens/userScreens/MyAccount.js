import React, { useSelector, useDispatch } from "react";
import * as userActions from "../../store/actions/userActions";
import * as authActions from "../../store/actions/authActions";

const MyAccount = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleDeleteAccount = () => {
    confirm("Are you sure you want to delete your account?");
  };

  return (
    <div className="myAccount__wrapper">
      <h1 className="myAccount__title">MY ACCOUNT</h1>
      <ul className="myAccount__list">
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
      </ul>
      <button
        onClick={dispatchEvent(authActions.logout())}
        className="myAccount__logout"
      >
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
