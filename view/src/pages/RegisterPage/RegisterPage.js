import React from 'react';
import Register from '../../components/Register/Register';
import {Outlet} from 'react-router-dom';

const RegisterPage = () => {
  return(
    <main>
    <Register />
    <Outlet />
  </main>
  )
};

export default RegisterPage;
