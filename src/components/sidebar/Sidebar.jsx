import React from 'react';

    const Sidebar = ({ isOpen, toggleSidebar, onFichajesClick }) => {
      return (
        <div
          style={{
            width: isOpen ? '250px' : '0',
            backgroundColor: '#222',
            color: 'white',
            transition: 'width 0.3s ease-in-out',
            overflowX: 'hidden',
            paddingTop: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isOpen && (
            <>
              <button
                style={{
                  marginBottom: '5px',
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  border: '1.5px solid white',
                  borderRadius: '15px',
                  padding: '10px',
                  width: 'calc(100% - 20px)',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  height: '90px'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  marginRight: '10px'
                }}></div>
                <p style={{ color: 'white', fontWeight: 'bold', position: 'relative', top: '-15px' }}>Nombre de usuario</p>
              </button>
              <button
                style={{
                  backgroundColor: '#252323',
                  color: 'white',
                  padding: '10px 10px',
                  border: '1.5px solid white',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  width: 'calc(100% - 20px)',
                  margin: '5px',
                  textAlign: 'center',
                  height: '50px'
                }}
                onClick={onFichajesClick}
              >
                <strong style={{ fontWeight: 'bold' }}>Fichajes</strong>
              </button>
            </>
          )}
        </div>
      );
    };

    export default Sidebar;
