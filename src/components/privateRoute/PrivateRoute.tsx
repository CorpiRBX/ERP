// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token,isLoading, } = useAuth();
  // console.log(token);
  if(isLoading)
    {
    return <div>Cargando...</div>; 
  }
  return token ? <> {children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
