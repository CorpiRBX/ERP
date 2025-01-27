import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Timesheets from './components/timesheets/Timesheets';
import Topbar from './components/topbar/Topbar';
 
const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [roleId, setRoleId] = useState<number>(3);
 
  const navigate = useNavigate();
 
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };
 
  const handleFichajesClick = () => {
    navigate('/home/timesheets'); // Incluye el prefijo
  };
 
  const handleDashboardClick = () => {
    navigate('/home/dashboard'); // Incluye el prefijo
  };
 
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1200);
      setIsMobile(window.innerWidth < 800);
      //convert strings from local storage to number
      const stringRoleId = localStorage.getItem('roleId');
      const id = stringRoleId ? parseInt(stringRoleId, 10) : 3;
      setRoleId(id); 
    };
 
    handleResize();
    window.addEventListener('resize', handleResize);
 
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  const appStyle: React.CSSProperties = {
    display: 'flex',
    height: isMobile ? `calc(100vh - 60px)` : 'calc(100vh - 1rem)',
    flexDirection: isMobile ? 'column' : 'row',
    marginTop: isMobile ? '0' : '2.5rem',
    paddingBottom: isMobile ? '60px' : '0',
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
          userRol={roleId}
          toggleSidebar={toggleSidebar}
          onFichajesClick={handleFichajesClick}
          onDashboardClick={handleDashboardClick}
        />
 
        <div style={contentStyle}>
          <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="timesheets" element={<Timesheets />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
 
export default Home;