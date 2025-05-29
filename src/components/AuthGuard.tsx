
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStudentStore } from '@/stores/useStudentStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useStudentStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

export default AuthGuard;
