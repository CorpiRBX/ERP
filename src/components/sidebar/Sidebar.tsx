import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void; // Esto estaba faltando en la declaración
  onFichajesClick: () => void;
  onDashboardClick: () => void;
}


const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onFichajesClick, onDashboardClick }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [transition, setTransition] = useState<string>("width 0.3s ease-in-out");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLUListElement | null>(null);

  const togglePopup = (event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que el clic se propague y dispare el cierre
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verifica si el clic fue fuera del popup y cierra el popup
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsPopupOpen(false); // Cierra el popup
      }
    };

    // Añadir evento para escuchar clics
    document.addEventListener("click", handleClickOutside);

    // Limpiar el evento al desmontar el componente
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Llamada inicial
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 800;
  const isTablet = windowWidth < 1200;

  const sidebarWidth = isTablet
    ? isMobile
      ? "100%"
      : "6rem"
    : isOpen
    ? "250px"
    : "0";
  const sidebarHeight = isMobile ? "60px" : "54.8rem";
  const sidebarPosition = isMobile ? "fixed" : "static";
  const flexDirection = isMobile ? "row" : "column";
  const justifyContent = isMobile ? "space-around" : "flex-start";
  const alignItems = isMobile ? "center" : "center";
  const zIndex = isMobile ? 1000 : "auto";
  const bottom = isMobile ? 0 : "auto";

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="sidebar"
      style={{
        width: sidebarWidth,
        height: sidebarHeight,
        flexDirection: flexDirection,
        alignItems: alignItems,
        position: sidebarPosition,
        bottom: bottom,
        zIndex: zIndex, // Asegurar que no cubra contenido
      }}
    >
      {isOpen && !isMobile && (
        <>
          <div
            className={`sidebar-button ${isExpanded ? "expanded" : ""}`}
            onClick={handleExpandClick}
          >
            <div className="sidebar-button-content">
              <img
                src="../../../src/assets/images/User.jpg"
                className="sidebar-fichajes-user-image"
                alt="Image"
              />
              <p className="sidebar-button-text">Nombre de usuario</p>
            </div>
            <div
              className={`sidebar-button-expanded-content ${isExpanded ? "show" : ""}`}
            >
              <button className="dashboard-button" onClick={onDashboardClick}>
                <img
                  src="../../../src/assets/icons/IconDashboard.png"
                  className="sidebar-fichajes-icon-dashboard"
                  alt="Image"
                />
                <span className="dashboard-text">DASHBOARD</span>
              </button>

              <button className="dashboard-button" onClick={onDashboardClick}>
                <img
                  src="../../../src/assets/icons/IconMAterial.png"
                  className="sidebar-fichajes-icon-dashboard"
                  alt="Image"
                />
                <span className="dashboard-text">MATERIAL DE OFICINA</span>
              </button>

              <button className="dashboard-button" onClick={onDashboardClick}>
                <img
                  src="../../../src/assets/icons/IconRopa.png"
                  className="sidebar-fichajes-icon-dashboard"
                  alt="Image"
                />
                <span className="dashboard-text">ROPA RBX</span>
              </button>
            </div>
          </div>

          <button className="sidebar-fichajes-button" onClick={onFichajesClick}>
            <div>
              <img
                src="../../../src/assets/icons/IconFichar.png"
                className="sidebar-fichajes-icon"
                alt="Image"
              />
            </div>
            <strong className="sidebar-fichajes-button-text">FICHAJES</strong>
          </button>
        </>
      )}

      {!isOpen && !isMobile && (
        <>
          <div
            className={`sidebar-button-compress ${isExpanded ? "expanded" : ""}`}
            onClick={handleExpandClick}
          >
            <div>
              <img
                src="../../../src/assets/images/User.jpg"
                className="sidebar-fichajes-user-image-compress"
                alt="Image"
              />
            </div>
            <div
              className={`sidebar-button-expanded-content ${isExpanded ? "show" : ""}`}
            >
              <button className="dashboard-button-tablet" onClick={onDashboardClick}>
                <img
                  src="../../../src/assets/icons/IconDashboard.png"
                  className="sidebar-fichajes-icon-dashboard-tablet"
                  alt="Image"
                />
              </button>

              <button className="dashboard-button-tablet" onClick={onDashboardClick}>
                <img
                  src="../../../src/assets/icons/IconMAterial.png"
                  className="sidebar-fichajes-icon-dashboard-tablet"
                  alt="Image"
                />
              </button>

              <button className="dashboard-button-tablet" onClick={onDashboardClick}>
                <img
                  src="../../../src/assets/icons/IconRopa.png"
                  className="sidebar-fichajes-icon-dashboard-tablet"
                  alt="Image"
                />
              </button>
            </div>
          </div>

          <button className="sidebar-fichajes-button-compress" onClick={onFichajesClick}>
            <div>
              <img
                src="../../../src/assets/icons/IconFichar.png"
                className="sidebar-fichajes-icon-compress"
                alt="Image"
              />
            </div>
          </button>
        </>
      )}

      {isMobile && (
        <div className="sidebar-mobile-container">
          <button
            className="sidebar-mobile-button"
            type="button"
            onClick={togglePopup}
          >
            <img
              src="../../../src/assets/images/User.jpg"
              className="sidebar-fichajes-user-image-mobile-compress"
              alt="User"
            />
          </button>

          {isPopupOpen && (
            <ul className="dropdown-menu" ref={popupRef}>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onDashboardClick();
                    setIsPopupOpen(false);
                  }}
                >
                  DASHBOARD
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onDashboardClick();
                    setIsPopupOpen(false);
                  }}
                >
                  MATERIAL DE OFICINA
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onDashboardClick();
                    setIsPopupOpen(false);
                  }}
                >
                  ROPA RBX
                </a>
              </li>
            </ul>
          )}

          <button className="sidebar-mobile-button" onClick={onFichajesClick}>
            <div>
              <img
                src="../../../src/assets/icons/IconFichar.png"
                className="sidebar-fichajes-icon-compress"
                alt="Fichar"
              />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
