import React, { useState, useEffect } from 'react';
import RBXLogo from '../../assets/logos/RBXWhite.jpg';
import './MainContent.css'; // Importa el archivo CSS

// Define la interfaz para las propiedades del componente
interface MainContentProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ toggleSidebar, isSidebarOpen }) => {
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

export default MainContent;
