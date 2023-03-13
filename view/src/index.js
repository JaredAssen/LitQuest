import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails'
import LoginPage from './pages/LoginPage/LoginPage';
import { AppProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<HomePage />}>
          <Route path = "register" element = {<RegisterPage />}/>
          <Route path = "login" element = {<LoginPage />}/>
          <Route path = "book" element = {<BookList/>}/>
          <Route path = "/book/:id" element = {<BookDetails />}/>
      
        </Route>
      </Routes>

    </BrowserRouter>

  </AppProvider>

);

