import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";

const Sidebar = ({
  isOpen,
  toggleSidebar,
  onFichajesClick,
  onDashboardClick,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isExpanded, setIsExpanded] = useState(false);
  const [transition, setTransition] = useState("width 0.3s ease-in-out");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = (event) => {
    event.stopPropagation(); // Evita que el clic se propague y dispare el cierre
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica si el clic fue fuera del popup y cierra el popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
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
  const sidebarHeight = isMobile ? "60px" : "100vh";
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
              className={`sidebar-button-expanded-content ${
                isExpanded ? "show" : ""
              }`}
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
            className={`sidebar-button-compress ${
              isExpanded ? "expanded" : ""
            }`}
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
              className={`sidebar-button-expanded-content ${
                isExpanded ? "show" : ""
              }`}
            >
              <button
                className="dashboard-button-tablet"
                onClick={onDashboardClick}
              >
                <img
                  src="../../../src/assets/icons/IconDashboard.png"
                  className="sidebar-fichajes-icon-dashboard-tablet"
                  alt="Image"
                />
              </button>

              <button
                className="dashboard-button-tablet"
                onClick={onDashboardClick}
              >
                <img
                  src="../../../src/assets/icons/IconMAterial.png"
                  className="sidebar-fichajes-icon-dashboard-tablet"
                  alt="Image"
                />
              </button>

              <button
                className="dashboard-button-tablet"
                onClick={onDashboardClick}
              >
                <img
                  src="../../../src/assets/icons/IconRopa.png"
                  className="sidebar-fichajes-icon-dashboard-tablet"
                  alt="Image"
                />
              </button>
            </div>
          </div>

          <button
            className="sidebar-fichajes-button-compress"
            onClick={onFichajesClick}
          >
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
          {/* Botón para abrir/cerrar el popup */}
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

          {/* Popup flotante */}
          {isPopupOpen && (
            <ul
              className="dropdown-menu"
              ref={popupRef}
              style={{
                position: "fixed", // Flotante fuera del contenedor
                bottom: "4.2rem", // Ajusta según la posición deseada
                left: "7.1rem", // Centrado horizontalmente
                transform: "translateX(-50%)", // Ajusta el centrado
                zIndex: 1050, // Encima de otros elementos
                backgroundColor: "#222222", // Fondo blanco
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra
                borderRadius: "8px",
                padding: "10px",
                width: "200px", // Ajusta el ancho del popup
              }}
            >
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    onDashboardClick(e);
                    setIsPopupOpen(false); // Cierra el popup después de la acción
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
                    onDashboardClick(e);
                    setIsPopupOpen(false); // Cierra el popup después de la acción
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
                    onDashboardClick(e);
                    setIsPopupOpen(false); // Cierra el popup después de la acción
                  }}
                >
                  ROPA RBX
                </a>
              </li>
            </ul>
          )}

          {/* Botón adicional para fichajes */}
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
