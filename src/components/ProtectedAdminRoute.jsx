// src/components/ProtectedAdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedAdminRoute() {
  // Check if our auth token exists in local storage
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  // If they are not logged in, immediately boot them back to the login screen
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  // If they are logged in, render the child routes (Admin Layout & Dashboard)
  return <Outlet />;
}