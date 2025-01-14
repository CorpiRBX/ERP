import React, { useState, useEffect } from 'react';
import RBXLogo from '../../assets/logos/RBXWhite.jpg';

const MainContent = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 800);
  };

  useEffect(() => {
    // Escuchar los cambios en el tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        flex: 1,
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh', // Ocupa toda la pantalla
      }}
    >
      <img
        src={RBXLogo}
        alt="RBX White Logo"
        style={{
          maxWidth: isMobile ? '100%' : '60%',
          maxHeight: isMobile ? '100%' : '60%',
          objectFit: 'contain',
          transform: 'translateY(-3rem)', // Desplaza 3rem hacia arriba
        }}
      />
    </div>
  );
};

export default MainContent;
