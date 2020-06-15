import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authActions";

const Register = () => {
  //STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();

  //HANDLERS
  const handleRegister = () => {
    const registerDetails = {
      name,
      email,
      password,
      password2,
    };
    dispatch(authActions.register(registerDetails));
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        required
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required
        type="password"
        placeholder="Password"
        minLength="8"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        required
        type="password"
        placeholder="Confirm password"
        minLength="8"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      ;<button onClick={handleRegister}>Register</button>
      <div>
        <p>Have an account?</p>
        <Link to="/login">
          <button>Log in</button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
