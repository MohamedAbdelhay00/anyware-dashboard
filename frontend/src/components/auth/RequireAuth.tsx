import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

export const requireAuth = (Component: React.ComponentType): React.FC => {
  const RequireAuth: React.FC = (props) => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };

  return RequireAuth;
}; 