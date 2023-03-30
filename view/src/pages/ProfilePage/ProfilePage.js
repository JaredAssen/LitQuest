import React from 'react';
import Profile from '../../components/Profile/Profile';
import {Outlet} from 'react-router-dom';

function ProfilePage() {
  return (
    <main>
    <Profile />
    <Outlet />
  </main>
  )
}

export default ProfilePage;
