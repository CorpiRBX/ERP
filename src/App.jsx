import React, { useState } from 'react';
    import { Routes, Route, useNavigate } from 'react-router-dom';
    import Sidebar from './components/Sidebar';
    import MainContent from './components/MainContent';
    import Timesheets from './components/Timesheets';

    function App() {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const navigate = useNavigate();

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

      const handleFichajesClick = () => {
        navigate('/timesheets');
      };

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
