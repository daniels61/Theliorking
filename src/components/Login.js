import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import '../style.css';

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [resp, setResp] = useState('');

  const handleLogin = () => {
    const url = "http://localhost:5000/login";
    const data = {
      user: user,
      pass: pass
    };

    axios.post(url, data, {withCredentials: true})
      .then((res) => {
        setResp("Welcome!");
        window.location.replace("/");
      })
      .catch((err) => {
        setResp("Error!");
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <TextField
          variant="outlined"
          label="User name"
          size="small"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div>
      <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div>
        <Button variant="contained" size="small" onClick={handleLogin}>
          Login
        </Button>
      </div>
      <div>
        <Link to="/register">Sign up</Link> 
      </div>
      <div>
        <a href="#">Forgot Username / Password</a>
      </div>
      <div>{resp}</div>
    </div>
  );
};

export default Login;
