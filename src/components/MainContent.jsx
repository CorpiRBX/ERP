import React from 'react';

    const MainContent = ({ toggleSidebar, isSidebarOpen }) => {
      const buttonLeftPosition = isSidebarOpen ? 250 + 5 : 5;

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
            
          </div>
        </div>
      );
    };

    export default MainContent;
