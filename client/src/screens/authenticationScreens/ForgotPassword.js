import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authActions";

const ForgotPassword = () => {
  const [passwordSent, setPasswordSent] = useState(false);

  const dispatch = useDispatch();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    await dispatch(authActions.resetPassword(email));
    setPasswordSent(true);
  };
  return (
    <div>
      {!passwordSent && (
        <>
          <p>Enter your email address and we'll send you a new password.</p>
          <form onSubmit={handleResetPassword}>
            <input type="email" name="email" />
            <button>Send</button>
          </form>
        </>
      )}
      {passwordSent && (
        <>
          <p>Please check your email inbox for your new password.</p>
          <a href="/login">Log in</a>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
