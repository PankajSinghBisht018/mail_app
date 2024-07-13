import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { checkRole } from '../utils/roles'; 

const Developer = () => {
  const { isLoaded, isSignedIn} = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn || !checkRole('developer')) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>This is the developer dashboard</h1>
      <p>This page is restricted to users with the 'developer' role.</p>
    </>
  );
};

export default Developer;
