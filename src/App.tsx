import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import LoginForm from './components/login/LoginForm';
import PrivateRoute from './components/privateRoute/PrivateRoute';

const App: React.FC = () => {
  return (
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
  );
};

export default App;
