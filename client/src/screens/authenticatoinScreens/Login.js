import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/authActions';

const Login = () => {
  const [email, setEmail] = useState ('testuser@test.com');
  const [password, setPassword] = useState ('12345678');
  const dispatch = useDispatch();
  
  const loginHandler = () => {
    const loginData = {
      email,
      password
    }
    dispatch(authActions.login(loginData))
  }

  return (
    <div>
      <h2>Log in</h2>
        <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" onClick={loginHandler}>Log in</button>
      <div>
        <p>No account?</p>
        <Link to="/register"><button>Register</button></Link>
      </div>
    </div>
  );
};

export default Login;
