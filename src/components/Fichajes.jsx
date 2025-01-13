import React from 'react';
    import { useNavigate } from 'react-router-dom';

    const Fichajes = ({ toggleSidebar, isSidebarOpen }) => {
      const navigate = useNavigate();
      const buttonLeftPosition = isSidebarOpen ? 250 + 5 : 5;

      const handleGoToScreen2 = () => {
        navigate('/timesheets');
      };

      const handleGoBack = () => {
        navigate('/');
      };

      return (
        <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button
            onClick={toggleSidebar}
            style={{
              position: 'absolute',
              left: `${buttonLeftPosition}px`,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              backgroundColor: '#252323',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'left 0.3s ease-in-out',
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <h1>Fichajes Screen</h1>
            <button onClick={handleGoToScreen2}>Go to Timesheets</button>
            <button onClick={handleGoBack}>Go back to Main Screen</button>
          </div>
        </div>
      );
    };

    export default Fichajes;
