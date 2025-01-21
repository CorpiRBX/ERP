import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Topbar.css';
import logo from '../../assets/logos/RBXTransparente.png';

const Topbar = () => {
  const location = useLocation();
  let labelText = '';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
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

  if (location.pathname === '/') {
    labelText = 'DASHBOARD';
  } else if (location.pathname === '/timesheets') {
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
      />
      <label className="topbar-label">
        {labelText}
      </label>
    </div>
  );
};

export default Topbar;
