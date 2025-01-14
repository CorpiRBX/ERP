
      import React, { useState, useEffect } from 'react';
      import { Routes, Route, useNavigate } from 'react-router-dom';
      import Sidebar from './components/sidebar/Sidebar';
      import MainContent from './components/maincontent/MainContent';
      import Timesheets from './components/timesheets/Timesheets';

      function App() {
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);
        const [isMobile, setIsMobile] = useState(false);
        const navigate = useNavigate();

        const toggleSidebar = () => {
          setIsSidebarOpen(!isSidebarOpen);
        };

        const handleFichajesClick = () => {
          navigate('/timesheets');
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

        const appStyle = {
          display: 'flex',
          height: '100vh',
          flexDirection: isMobile ? 'column' : 'row',
        };

        const contentStyle = {
          flex: 1,
          overflowY: 'auto',
      
          marginBottom: isMobile ? '60px' : '0',
        };

        return (
          <div style={appStyle}>
            <div style={{position: 'relative'}}>
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onFichajesClick={handleFichajesClick} />
            </div>
            <div style={contentStyle}>
              <Routes>
                <Route path="/" element={<MainContent toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
                <Route path="/timesheets" element={<Timesheets toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
              </Routes>
            </div>
          </div>
        );
      }

      export default App;

