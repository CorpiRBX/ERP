import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Dashboard from './components/dashboard/Dashboard';
import Timesheets from './components/timesheets/Timesheets';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home/*" element={<Home />} />
    </Routes>

  );
};

export default App;
