
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useStudentStore } from '@/stores/useStudentStore';
import AppNavbar from '@/components/layout/AppNavbar';
import AppSidebar from '@/components/layout/AppSidebar';

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useStudentStore();

  if (!isAuthenticated) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNavbar />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
