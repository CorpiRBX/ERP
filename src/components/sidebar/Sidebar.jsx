import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar, onFichajesClick, onDashboardClick }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isExpanded, setIsExpanded] = useState(false);
  const [transition, setTransition] = useState("width 0.3s ease-in-out");

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
              className={`sidebar-button-expanded-content ${
                isExpanded ? "show" : ""
              }`}
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
          <button className="sidebar-mobile-button">
            <img
              src="../../../src/assets/images/User.jpg"
              className="sidebar-fichajes-user-image-mobile-compress"
              alt="Image"
            />
          </button>
          <button className="sidebar-mobile-button" onClick={onFichajesClick}>
            <div>
              <img
                src="../../../src/assets/icons/IconFichar.png"
                className="sidebar-fichajes-icon-compress"
                alt="Image"
              />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
