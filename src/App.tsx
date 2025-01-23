import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import MainContent from './components/maincontent/MainContent';
import Timesheets from './components/timesheets/Timesheets';
import Topbar from './components/topbar/Topbar';

// Tipos para las propiedades del componente Sidebar
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onFichajesClick: () => void;
  onDashboardClick: () => void;
}

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleFichajesClick = () => {
    navigate('/timesheets');
  };

  const handleDashboardClick = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1200);
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const appStyle: React.CSSProperties = {
    display: 'flex',
    height: isMobile ? `calc(100vh - 60px)` : 'calc(100vh - 1rem)', // Ajustar altura para sidebar móvil
    flexDirection: isMobile ? 'column' : 'row',
    marginTop: isMobile ? '0' : '2.5rem',
    paddingBottom: isMobile ? '60px' : '0', // Reservar espacio para el sidebar móvil
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    paddingBottom: isMobile ? '3.75rem' : '0rem',
    paddingTop: isMobile ? '2.5rem' : '0rem',
  };

  return (
    <div>
      <Topbar />
      <div style={appStyle}>
        <Sidebar
          isOpen={isSidebarOpen}
          userRol={3}
          toggleSidebar={toggleSidebar}
          onFichajesClick={handleFichajesClick}
          onDashboardClick={handleDashboardClick}
        />

        <div style={contentStyle}>
          <Routes>
            <Route
              path="/"
              element={
                <MainContent toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
              }
            />
            <Route
              path="/timesheets"
              element={
                <Timesheets toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
