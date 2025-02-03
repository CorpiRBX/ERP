import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Topbar.css';
import logo from '../../assets/logos/RBXTransparente.png';

// Definir el tipo para el componente
const Topbar: React.FC = () => {
  const location = useLocation();
  
  // Definir el estado de la visibilidad y el tamaño de la pantalla
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 800);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(window.pageYOffset);
  const [visible, setVisible] = useState<boolean>(true);
  const navigate = useNavigate();

  let labelText = '';

  useEffect(() => {
    // Manejo del cambio de tamaño de la ventana
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Manejo del scroll
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Si estamos desplazándonos hacia arriba o la página está cerca de la parte superior
      if (prevScrollPos > currentScrollPos || currentScrollPos < 70) {
        setVisible(true); // Mostrar la topbar
      } else if (prevScrollPos < currentScrollPos && currentScrollPos > 70) {
        setVisible(false); // Ocultar la topbar cuando nos desplazamos hacia abajo
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isMobile]);

  const handleHomeClick = () => {
    navigate('/home');
  };

  // Establecer el texto de la etiqueta según la ruta
  if (location.pathname === '/home/dashboard') {
    labelText = 'DASHBOARD';
  } else if (location.pathname === '/home/timesheets') {
    labelText = 'FICHAJES';
  }

  return (
    <div
      className="topbar"
      style={{
        top: visible ? '0' : '-2.5rem',
        transition: 'top 0.3s ease-in-out',
      }}
    >
      <img
        src={logo}
        alt="Logo"
        className="topbar-logo"
        onClick={handleHomeClick}
      />
      <label className="topbar-label">
        {labelText}
      </label>
    </div>
  );
};

export default Topbar;
