import React from 'react';
    import { useNavigate } from 'react-router-dom';

    const Timesheets = ({ toggleSidebar, isSidebarOpen }) => {
      const navigate = useNavigate();
      const buttonLeftPosition = '5px';

      const handleGoBack = () => {
        navigate('/');
      };

      return (
        <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <button
            onClick={toggleSidebar}
            style={{
              position: 'absolute',
              left: buttonLeftPosition,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              backgroundColor: '#252323',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'left 0.3s ease-in-out',
              zIndex: 1000,
            }}
          />
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: 'calc(100% - 100px)',
            maxWidth: '450px',
            height: 'calc(100% - 40px)',
            backgroundColor: '#f0f0f0',
            border: '2px solid black',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px'
          }}>
            <div style={{
              padding: '10px',
              borderBottom: '2px solid black',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              minHeight: '50px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                position: 'relative'
              }}>
                <h2 style={{ margin: 0, fontFamily: 'DM Sans', fontSize: '20px' }}>HISTORIAL DE FICHAJES</h2>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', top: '10px' }}>
                  <span style={{ marginRight: '5px', fontFamily: 'DM Sans', fontSize: '13px' }}>FILTROS</span>
                  <input type="checkbox" style={{ marginRight: '5px' }} />
                  <input type="checkbox" />
                </div>
              </div>
              <div style={{
                display: 'flex',
                position: 'absolute',
                bottom: '-8px',
                width: 'calc(100% - 40px)',
                height: '40px',
                alignItems: 'center',
                justifyContent: 'space-between',
                left: '20px'
              }}>
                <span style={{ textAlign: 'center', fontSize: '12px', fontFamily: 'DM Sans', color: '#9F9292', marginRight: '1px' }}>Nombre</span>
                <span style={{ textAlign: 'center', fontSize: '12px', fontFamily: 'DM Sans', color: '#9F9292', marginRight: '1px' }}>Entrada</span>
                <span style={{ textAlign: 'center', fontSize: '12px', fontFamily: 'DM Sans', color: '#9F9292', marginRight: '1px' }}>Salida</span>
                <span style={{ textAlign: 'center', fontSize: '12px', fontFamily: 'DM Sans', color: '#9F9292', marginRight: '1px' }}>Break</span>
                <span style={{ textAlign: 'center', fontSize: '12px', fontFamily: 'DM Sans', color: '#9F9292', marginRight: '1px' }}>Proyecto</span>
                <span style={{ textAlign: 'center', fontSize: '12px', fontFamily: 'DM Sans', color: '#9F9292' }}>Departamento</span>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
              {/* Content will go here */}
            </div>
          </div>
        </div>
      );
    };

    export default Timesheets;
