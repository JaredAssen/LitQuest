import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Results from './components/Results/Results';
import BookDetails from './components/BookDetails/BookDetails'
import LoginPage from './pages/LoginPage/LoginPage';
import { AppProvider } from './context';
import { RecommendProvider } from './recommendationContext';
import Recommendations from './components/Recommendations/Recommendations';
//window.loggedin = false;
//window.loggedUserId = '0'; // Use 0 for guest user

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <RecommendProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<HomePage />}>
          <Route path = "book" element = {<Results/>}/>
          <Route path = "book/:id" element = {<BookDetails />}/>
        </Route>
        
        <Route path = "profile" element = {<ProfilePage />}/>
        <Route path = "login" element = {<LoginPage />}/>
        <Route path = "register" element = {<RegisterPage />}/>
      </Routes>

    </BrowserRouter>
    </RecommendProvider>
  </AppProvider>

  

);

