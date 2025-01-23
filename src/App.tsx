import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Dashboard from './components/dashboard/Dashboard';
import Timesheets from './components/timesheets/Timesheets';
import Topbar from './components/topbar/Topbar';
import LoginForm from './components/login/LoginForm';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Redirige / a /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Ruta para el formulario de inicio de sesión */}
        <Route path="/login" element={<LoginForm />} />

        {/* Rutas privadas (requieren autenticación) */}
        <Route
          path="/home/*"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
