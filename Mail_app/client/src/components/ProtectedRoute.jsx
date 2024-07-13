import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { checkRole } from '../utils/roles'; 

const ProtectedRoute = ({ roles, children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn && roles.some(role => checkRole(role))) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
