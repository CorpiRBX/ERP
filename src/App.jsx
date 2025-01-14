import React, { useState, useEffect } from 'react';
    import { Routes, Route, useNavigate } from 'react-router-dom';
    import Sidebar from './components/sidebar/Sidebar';
    import MainContent from './components/maincontent/MainContent';
    import Timesheets from './components/timesheets/Timesheets';

    function App() {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
      }, []);

      return (
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onFichajesClick={handleFichajesClick} />
          <Routes>
            <Route path="/" element={<MainContent toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
            <Route path="/timesheets" element={<Timesheets toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
          </Routes>
        </div>
      );
    }

    export default App;
