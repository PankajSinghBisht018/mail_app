import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { checkRole } from '../utils/roles';
import { useAuth } from '@clerk/clerk-react';

const Admin = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn || !checkRole('admin')) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>This is the admin dashboard</h1>
      <p>This page is restricted to users with the 'admin' role.</p>
    </>
  );
};

export default Admin;
