import React from "react";
import { Link } from "react-router-dom";

const handleStudentLogin = () => {
  //do some stuff and call /studentLogin on server
};

const Home = () => {
  return (
    <div>
      <div>
        <Link to="/login">
          <button>Log in</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
      <div>
        <form onSubmit={handleStudentLogin}>
          <p>Have a code?</p>
          <input type="text" name="code" />
        </form>
      </div>
    </div>
  );
};

export default Home;
