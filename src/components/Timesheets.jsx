import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';

    const Timesheets = () => {
      const navigate = useNavigate();
      const [isMobile, setIsMobile] = useState(false);

      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 750);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
      }, []);

      const handleGoBack = () => {
        navigate('/');
      };

      return (
        <div style={{ flex: 1, padding: '1.25rem', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem', position: 'relative', backgroundColor: '#F2F2F2' }}>
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
                <h2 style={{ margin: 0, fontFamily: 'DM Sans', fontSize: '1.25rem' }}>FICHAJE</h2>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.625rem' }}>
                <button style={{
                  height: '3rem',
                  border: '2px solid black',
                  borderRadius: '0.3125rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: 'DM Sans',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: 'black'
                  }}>Oficina</span>
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'relative', top: '-0.4375rem' }}>
                <span style={{
                  fontFamily: 'DM Sans',
                  fontSize: '0.8125rem',
                  fontWeight: 'bold',
                  color: 'black'
                }}>OFICINAS</span>
                 <button style={{
                  height: '3rem',
                  border: '2px solid black',
                  borderRadius: '0.3125rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '0.3125rem',
                  position: 'relative',
                  top: '0.375rem'
                }}>
                  <span style={{
                    fontFamily: 'DM Sans',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: 'black'
                  }}>OnSite</span>
                </button>
                <span style={{
                  fontFamily: 'DM Sans',
                  fontSize: '0.8125rem',
                  fontWeight: 'bold',
                  color: 'black',
                  marginTop: '0.5rem',
                  position: 'relative',
                  top: '0.125rem'
                }}>ONSITE</span>
                 <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <button style={{
                      height: '3rem',
                      border: '2px solid black',
                      borderRadius: '0.3125rem',
                      width: '49%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '1rem',
                      position: 'relative',
                      top: '-0.125rem',
                      alignSelf: 'flex-start'
                    }}>
                      <span style={{
                        fontFamily: 'DM Sans',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: 'black'
                      }}>Vacaciones</span>
                    </button>
                    <button style={{
                      height: '3rem',
                      border: '2px solid black',
                      borderRadius: '0.3125rem',
                      width: '49%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '1rem',
                      position: 'relative',
                      top: '-0.125rem',
                      alignSelf: 'flex-end'
                    }}>
                      <span style={{
                        fontFamily: 'DM Sans',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: 'black'
                      }}>Baja</span>
                    </button>
                 </div>
                 <span style={{
                  fontFamily: 'DM Sans',
                  fontSize: '0.8125rem',
                  fontWeight: 'bold',
                  color: 'black',
                  marginTop: '0rem',
                  position: 'relative',
                  top: '0.125rem',
                  marginRight: '51%'
                }}>VACACIONES</span>
                 <span style={{
                  fontFamily: 'DM Sans',
                  fontSize: '0.8125rem',
                  fontWeight: 'bold',
                  color: 'black',
                  marginTop: '-0.8rem',
                  position: 'relative',
                  top: '0.125rem',
                  marginLeft: 'auto'
                }}>BAJA</span>
                
              </div>
						 <div style={{
                  marginTop: '1.75rem',
                  border: '2px solid black',
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  bottom: 0,
                  left: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  borderRadius: '0.3125rem'
                }}>
                  <label style={{
                    fontFamily: 'DM Sans',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: 'black',
                    position: 'absolute',
                    top: '0.625rem',
                    left: '0.625rem'
                  }}>ULTIMO FICHAJE</label>
                  <label style={{
                    fontFamily: 'DM Sans',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: '#9e0000',
                    position: 'absolute',
                    bottom: '0.625rem',
                    right: '0.625rem'
                  }}>OFICINAS</label>
                  <div style={{
                    display: 'flex',
                    position: 'absolute',
                    top: '3rem',
                    left: '1rem',
                    width: 'calc(100% - 4rem)',
                    justifyContent: 'space-between',
										padding:'0 1rem'
                  }}>
                    <label style={{
                      fontFamily: 'DM Sans',
                      fontSize: '0.65rem',
                      color: '#9F9292',
                      textShadow: '0.12rem 0.12rem 0.1rem rgba(0, 0, 0, 0.2)'
                    }}>ENTRADA</label>
                    <label style={{
                      fontFamily: 'DM Sans',
                      fontSize: '0.65rem',
                      color: '#9F9292',
                      textShadow: '0.12rem 0.12rem 0.1rem rgba(0, 0, 0, 0.2)'
                    }}>SALIDA</label>
                    <label style={{
                      fontFamily: 'DM Sans',
                      fontSize: '0.65rem',
                      color: '#9F9292',
                      textShadow: '0.12rem 0.12rem 0.1rem rgba(0, 0, 0, 0.2)'
                    }}>PROYECTO</label>
                    <label style={{
                      fontFamily: 'DM Sans',
                      fontSize: '0.65rem',
                      color: '#9F9292',
                      textShadow: '0.12rem 0.12rem 0.1rem rgba(0, 0, 0, 0.2)'
                    }}>DEPARTAMENTO</label>
                  </div>
							 		<div>
                  <div style={{
                    border: '0.125rem solid black',
                    borderRadius: '0.3125rem',
                    backgroundColor: 'white',
                    width: 'calc(100% - 1.25rem)',
                    height: '2.5rem',
                    position: 'absolute',
                    top: '4.2rem',
                    left: '0.625rem'
                  }}></div>
									<button style={{
										height: '2rem',
										width: '50%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										border: '0.125rem solid black',
										borderRadius: '0.3125rem',
										backgroundColor: '#333131',
										position: 'absolute',
										top: '7.5rem',
										left: '50%',
										transform: 'translateX(-50%)'
									}}>
										<span style={{
											fontFamily: 'DM Sans',
											color: 'white'
										}}>REPETIR FICHAJE</span>
									</button>
										</div>
                </div>
          </div>
          <div style={{
            
            height: 'calc(100% - 1.3rem)',
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
                <span style={{ textAlign: 'center', fontSize: '0.75rem', fontFamily: 'DM Sans', color: '#9F9292', textShadow: '0.12rem 0.12rem 0.1rem rgba(0, 0, 0, 0.2)', marginRight: '0.0625rem' }}>Nombre</span>
                <span style={{ textAlign: 'center', fontSize: '0.75rem', fontFamily: 'DM Sans', color: '#9F9292', textShadow: '0.12rem 0.12rem 0.1rem rgba(0, 0, 0, 0.2)', marginRight: '0.0625rem' }}>Entrada</span>
                <span style={{ textAlign: 'center', fontSize: '0.75rem', fontFamily: 'DM Sans', color: '#9F9292', textShadow: '0.12rem 0.12rem 0.1rem rgba(0, 0, 0, 0.2)', marginRight: '0.0625rem' }}>Salida</span>
                <span style={{ textAlign: 'center', fontSize: '0.75rem', fontFamily: 'DM Sans', color: '#9F9292', textShadow: '0.12rem 0.12rem 0.1rem rgba(0, 0, 0, 0.2)', marginRight: '0.0625rem' }}>Break</span>
                <span style={{ textAlign: 'center', fontSize: '0.75rem', fontFamily: 'DM Sans', color: '#9F9292', textShadow: '0.12rem 0.12rem 0.1rem rgba(0, 0, 0, 0.2)', marginRight: '0.0625rem' }}>Proyecto</span>
                <span style={{ textAlign: 'center', fontSize: '0.75rem', fontFamily: 'DM Sans', color: '#9F9292', textShadow: '0.12rem 0.12rem 0.1rem rgba(0, 0, 0, 0.2)' }}>Departamento</span>
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
