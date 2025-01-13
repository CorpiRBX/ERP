import React from 'react';
    import { useNavigate } from 'react-router-dom';

    const Fichajes = () => {
      const navigate = useNavigate();

      const handleGoToScreen2 = () => {
        navigate('/timesheets');
      };

      const handleGoBack = () => {
        navigate('/');
      };

      return (
        <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h1>Fichajes Screen</h1>
            <button onClick={handleGoToScreen2}>Go to Timesheets</button>
            <button onClick={handleGoBack}>Go back to Main Screen</button>
          </div>
        </div>
      );
    };

    export default Fichajes;
