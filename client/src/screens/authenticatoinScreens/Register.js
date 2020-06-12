import React from "react";

const handleRegister = (e) => {
  //do some stuff and call /register on server
};

const Register = () => {
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={(e) => handleRegister(e)}>
        <input required type="text" name="name" />
        <input required type="email" name="email" placeholder="Email" />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          minLength="8"
        />
        <input
          required
          type="password"
          name="password2"
          placeholder="Confirm Password"
        />
        <button type="submit">Register</button>
      </form>
      <div>
        <p>Have an account?</p>
        <button>Log in</button>
      </div>
    </div>
  );
};

export default Register;
