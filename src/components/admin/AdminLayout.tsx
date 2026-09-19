import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

interface AdminLayoutProps {
  onBackToSite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToSite }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AdminLogin onBackToSite={onBackToSite} />;
  }

  return <AdminDashboard onBackToSite={onBackToSite} />;
};
