import React from "react";

const handleStudentLogin = () => {
  //do some stuff and call /studentLogin on server
};

const Home = () => {
  return (
    <div>
      <div>
        <button>Log in</button>
        <button>Register</button>
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
