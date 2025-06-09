
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';
import Navigation from '@/components/Navigation';

const Admin = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {!isAuthenticated && <Navigation />}
      {isAuthenticated ? <AdminDashboard /> : <AdminLogin />}
    </div>
  );
};

export default Admin;
