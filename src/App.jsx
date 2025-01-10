import React, { useState } from 'react';
    import { Routes, Route, useNavigate } from 'react-router-dom';
    import Sidebar from './components/Sidebar';
    import MainContent from './components/MainContent';
    import Fichajes from './components/Fichajes';

    function App() {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const navigate = useNavigate();

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

      const handleFichajesClick = () => {
        navigate('/fichajes');
      };

      return (
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onFichajesClick={handleFichajesClick} />
          <MainContent toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <Routes>
            <Route path="/fichajes" element={<Fichajes />} />
          </Routes>
        </div>
      );
    }

    export default App;
