import React from 'react';
    import { useNavigate } from 'react-router-dom';

    const Timesheets = ({ toggleSidebar, isSidebarOpen }) => {
      const navigate = useNavigate();
      const buttonLeftPosition = '0.3125rem';

      const handleGoBack = () => {
        navigate('/');
      };

      return (
        <div style={{ flex: 1, padding: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', position: 'relative', backgroundColor: '#F2F2F2' }}>
          <button
            onClick={toggleSidebar}
            style={{
              position: 'absolute',
              left: buttonLeftPosition,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '1.25rem',
              height: '1.25rem',
              backgroundColor: '#252323',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'left 0.3s ease-in-out',
              zIndex: 1000,
            }}
          />
           <div style={{
            
            height: 'calc(100% - 2.5rem)',
            backgroundColor: 'white',
            border: '0.125rem solid black',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '0.3125rem',
             padding: '0.625rem',
          }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.625rem',
                position: 'relative'
              }}>
                <h2 style={{ margin: 0, fontFamily: 'DM Sans', fontSize: '1.25rem' }}>TAREAS</h2>
              </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0.625rem' }}>
              {/* Content will go here */}
            </div>
          </div>
          <div style={{
            
            minWidth: '26.3125rem',
            height: 'calc(100% - 2.5rem)',
            backgroundColor: 'white',
            border: '0.125rem solid black',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '0.3125rem'
          }}>
            <div style={{
              padding: '0.625rem',
              borderBottom: '0.125rem solid black',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              minHeight: '3.125rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.625rem',
                position: 'relative'
              }}>
                <h2 style={{ margin: 0, fontFamily: 'DM Sans', fontSize: '1.25rem' }}>HISTORIAL DE FICHAJES</h2>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', top: '0.625rem' }}>
                  <span style={{ marginRight: '0.3125rem', fontFamily: 'DM Sans', fontSize: '0.8125rem' }}>FILTROS</span>
                  <input type="checkbox" style={{ marginRight: '0.3125rem' }} />
                  <input type="checkbox" />
                </div>
              </div>
              <div style={{
                display: 'flex',
                position: 'absolute',
                bottom: '-0.5rem',
                width: 'calc(100% - 2.5rem)',
                height: '2.5rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                left: '1.25rem'
              }}>
                <span style={{ textAlign: 'center', fontSize: '0.75rem', fontFamily: 'DM Sans', color: '#9F9292', marginRight: '0.0625rem' }}>Nombre</span>
                <span style={{ textAlign: 'center', fontSize: '0.75rem', fontFamily: 'DM Sans', color: '#9F9292', marginRight: '0.0625rem' }}>Entrada</span>
                <span style={{ textAlign: 'center', fontSize: '0.75rem', fontFamily: 'DM Sans', color: '#9F9292', marginRight: '0.0625rem' }}>Salida</span>
                <span style={{ textAlign: 'center', fontSize: '0.75rem', fontFamily: 'DM Sans', color: '#9F9292', marginRight: '0.0625rem' }}>Break</span>
                <span style={{ textAlign: 'center', fontSize: '0.75rem', fontFamily: 'DM Sans', color: '#9F9292', marginRight: '0.0625rem' }}>Proyecto</span>
                <span style={{ textAlign: 'center', fontSize: '0.75rem', fontFamily: 'DM Sans', color: '#9F9292' }}>Departamento</span>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0.625rem' }}>
              {/* Content will go here */}
            </div>
          </div>
        </div>
      );
    };

    export default Timesheets;
