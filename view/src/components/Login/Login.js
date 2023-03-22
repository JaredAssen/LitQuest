
import './Login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import User from '../../models/User';
import { async } from 'q';

const Login = () => {
  
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  //const [loggedin, setLogged] = useState(false);
  
    async function login(){
      await fetch(`http://localhost:5034/api/User/${username}/${password}`, {mode:'cors'})
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          if (Object.keys(data).length > 0) {
            alert("Success");
            //setLogged(true);
            //console.log(loggedin);
            window.loggedin = true;
            console.log(window.loggedin);
            // Save user information to user model
            // Change login to logout
            // Route home
            navigate("/");
          } else {
            alert('Incorrect username or password.');
          }
       })
       .catch((err) => {
          console.log(err.message);
       });
    }
  
  return (
    <div className = 'login-body'>
      <Navbar />
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

export default Login;

