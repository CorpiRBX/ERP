import React, { useState, useEffect } from 'react';
import RBXLogo from '../../assets/logos/RBXWhite.jpg';
import './Dashboard.css'; // Importa el archivo CSS

const Dashboard: React.FC = () => {
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
    <div className="main-content-container">
      <img
        src={RBXLogo}
        alt="RBX White Logo"
        className={`main-content-logo ${isMobile ? 'mobile' : ''}`} // Se agrega la clase 'mobile' cuando es móvil
      />
    </div>
  );
};

export default Dashboard;
