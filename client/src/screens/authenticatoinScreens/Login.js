import React from "react";

const handleLogin = (e) => {
  //do some stuff and call /login on server
};

const Login = () => {
  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={(e) => handleLogin(e)}>
        <input type="email" name="email" placeholder="Your email" />
        <input type="password" name="password" placeholder="Your password" />
        <button type="submit">Log in</button>
      </form>
      <div>
        <p>No account?</p>
        <button>Register</button>
      </div>
    </div>
  );
};

export default Login;
