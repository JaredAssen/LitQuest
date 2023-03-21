
import './login.css';
import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const login = () => {
    if (username === 'admin' && password === '123') {
      alert('Login successful!');
    } else {
      alert('Incorrect username or password.');
    }
  };
  
  return (
    <div className = 'login-body'>
      <h1 className = 'h1'>Login Page</h1>
      <form className = 'login-form'>
        <label className = 'login-label' htmlFor="username">Username:</label>
        <input className = 'login-input' type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        
        <label className = 'login-label' htmlFor="password">Password:</label>
        <input className = 'login-input' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        
        <input className = 'login-input' type="button" value="Login" onClick={login} />
      </form>
    </div>
  );
};

export default LoginPage;

