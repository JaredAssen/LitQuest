
import './Register.css';
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from "react-router-dom";

const Register = () => {    
  const navigate = useNavigate();
  const validateForm = () => {
    
    const username = document.forms["register"]["username"].value;
    const password = document.forms["register"]["password"].value;
    const confirm_password = document.forms["register"]["confirm_password"].value;
    const email = document.forms["register"]["email"].value;

    if (username === "") {
      alert("Please enter your username.");
      return false;
    }
    if (password === "") {
      alert("Please enter your password.");
      return false;
    }
    if (confirm_password === "") {
      alert("Please confirm your password.");
      return false;
    }
    if (password !== confirm_password) {
      alert("Passwords do not match.");
      return false;
    }
    if (email === "") {
      alert("Please enter your email.");
      return false;
    }
    if(password !== confirm_password){
        alert("Passwords do not match.")
        return false;
    }

    // Passes all input checks so post data to database
    // POST  
    //console.log("before fetch");
    fetch('http://localhost:5034/api/User', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        mode:'cors',
    })
    .then((response) => {
        response.json();
        if(response.status === 409) alert("Username Already Exists");
    })
    .then((data) => {
            //console.log(data);
             //setPosts((posts) => [data, ...posts]);
             //setTitle('');
             //setBody('');
    })
    .catch((err) => {
            console.log(err.message);
    });
    //console.log("after fetch");
    alert("You have been registered. Please login.");
    navigate("/login");
    //return true;
  };

  return (
    <div className = 'login-body'>
      <Navbar />
      <h1 className = 'login-h1'>Register</h1>
        <form className = 'login-form' name="register" onSubmit={validateForm}>
        <label className = 'login-label' htmlFor="username">Username:</label>
        <input className = 'login-input' type="text" id="username" name="username" /><br /><br />
        <label className = 'login-label' htmlFor="password">Password:</label>
        <input className = 'login-input' type="password" id="password" name="password" /><br /><br />
        <label className = 'login-label' htmlFor="confirm_password">Confirm Password:</label>
        <input className = 'login-input' type="password" id="confirm_password" name="confirm_password" /><br /><br />
        <label className = 'login-label' htmlFor="email">Email:</label>
        <input className = 'login-input' type="email" id="email" name="email" /><br /><br />
        <input className = 'login-input' type="button" value="Submit" onClick={validateForm} />
      </form>
    </div>
  );
};

export default Register;
