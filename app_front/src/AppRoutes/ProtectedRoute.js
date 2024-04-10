import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If the token doesn't exist, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the token exists, render the requested component
  return children ? children : <Outlet />;
};

export default ProtectedRoute;