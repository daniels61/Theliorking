import React, { useState } from 'react';
import '../style.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    const url = "http://localhost:5000/register";
    const data = {
      user: username,
      pass: password,
      email: email
    };

    axios.post(url, data)
      .then((res) => {
        window.location.replace("/login");
      })
      .catch((err) => {
        console.log("Try Again.")
      });
  };

  return (
    <div className="login-container">
      <h2>Signup Page</h2>
      <div>
        <TextField
          variant="outlined"
          label="User name"
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
      <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="email"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Button variant="contained" size="small" onClick={handleSignUp}>
          SignUp
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
