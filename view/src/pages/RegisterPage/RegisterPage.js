
import './register.css';
import React from 'react';

const RegisterPage = () => {
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
    return true;
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form name="register" onSubmit={validateForm}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" /><br /><br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" /><br /><br />
        <label htmlFor="confirm_password">Confirm Password:</label>
        <input type="password" id="confirm_password" name="confirm_password" /><br /><br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" /><br /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default RegisterPage;
