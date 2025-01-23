import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  userRol: number;
  toggleSidebar: () => void;
  onFichajesClick: () => void;
  onDashboardClick: () => void;
}


const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  userRol,
  toggleSidebar,
  onFichajesClick,
  onDashboardClick
}) => {

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isExpandedUser, setisExpandedUser] = useState<boolean>(false);
  const [isExpandedFichajes, setisExpandedFichajes] = useState<boolean>(false);
  const [isUserPopupOpen, setisUserPopupOpen] = useState<boolean>(false);
  const [isFichajePopupOpen, setisFichajePopupOpen] = useState<boolean>(false);
  const popupUserRef = useRef<HTMLUListElement | null>(null);
  const popupFichajeRef = useRef<HTMLUListElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);
  const fichajesRef = useRef<HTMLDivElement | null>(null);

  const toggleUserPopup = (event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que el clic se propague y dispare el cierre
    setisUserPopupOpen(!isUserPopupOpen);
  };

  const toggleFichajePopup = (event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que el clic se propague y dispare el cierre
    setisFichajePopupOpen(!isFichajePopupOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Cierra la expansión de usuario si se hace clic fuera del área correspondiente
      if (userRef.current && !userRef.current.contains(target)) {
        setisExpandedUser(false);
      }

      // Cierra la expansión de fichajes si se hace clic fuera del área correspondiente
      if (fichajesRef.current && !fichajesRef.current.contains(target)) {
        setisExpandedFichajes(false);
      }

      // Cierra el popup si se hace clic fuera de él
      if (popupUserRef.current && !popupUserRef.current.contains(target)) {
        setisUserPopupOpen(false);
      }

      if (popupFichajeRef.current && !popupFichajeRef.current.contains(target)) {
        setisFichajePopupOpen(false);
      }
    };

    // Agrega el listener para manejar clics
    document.addEventListener("mousedown", handleClickOutside);

    // Limpia el listener al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  const handleExpandUserClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setisExpandedUser(!isExpandedUser);
  };

  const handleExpandFichajesClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setisExpandedFichajes(!isExpandedFichajes);
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
            ref={userRef}
            className={`sidebar-button ${isExpandedUser ? "expanded" : ""}`}
            onClick={handleExpandUserClick}
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
              className="sidebar-button-expanded-content"
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

          {userRol < 3 ? (
            <div
              ref={fichajesRef}
              className={`sidebar-fichajes-button ${isExpandedFichajes ? "expanded" : ""}`}
              onClick={handleExpandFichajesClick}
            >
              <div>
                <img
                  src="../../../src/assets/icons/IconFichar.png"
                  className="sidebar-fichajes-icon"
                  alt="Image"
                />
                <label className="sidebar-fichajes-button-text">FICHAJES</label>
              </div>
              <div className="sidebar-fichaje-button-expanded-content">
                <button className="fichajes-button" onClick={onFichajesClick}>
                  <img
                    src="../../../src/assets/icons/IconFichar.png"
                    className="sidebar-fichajes-icon-dashboard"
                    alt="Icono Fichar"
                  />
                  <span className="dashboard-text">FICHAR</span>
                </button>
                <button className="fichajes-button" onClick={onFichajesClick}>
                  <img
                    src="../../../src/assets/icons/IconRevisarFichaje.png"
                    className="sidebar-fichajes-icon-dashboard"
                    alt="Icono Revisar Fichajes"
                  />
                  <span className="dashboard-text">REVISAR FICHAJES</span>
                </button>
              </div>
            </div>
          ) : (
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
          )}
        </>
      )}

      {!isOpen && !isMobile && (
        <>
          <div
            ref={userRef}
            className={`sidebar-button-compress ${isExpandedUser ? "expanded" : ""}`}
            onClick={handleExpandUserClick}
          >
            <div>
              <img
                src="../../../src/assets/images/User.jpg"
                className="sidebar-fichajes-user-image-compress"
                alt="Image"
              />
            </div>
            <div
              className={`sidebar-button-expanded-content ${isExpandedUser ? "show" : ""}`}
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
                  src="../../../src/assets/icons/IconMaterial.png"
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

          {userRol < 3 ? (
            <div
              ref={fichajesRef}
              className={`sidebar-fichajes-button-compress ${isExpandedFichajes ? "expanded" : ""}`}
              onClick={handleExpandFichajesClick}
            >
              <div>
                <img
                  src="../../../src/assets/icons/IconFichar.png"
                  className="sidebar-fichajes-icon-compress"
                  alt="Image"
                />
              </div>

              <div className={`sidebar-fichaje-button-expanded-content ${isExpandedFichajes ? "expanded" : ""}`}>
                <button className="fichajes-button-tablet" onClick={onFichajesClick}>
                  <img
                    src="../../../src/assets/icons/IconFichar.png"
                    className="sidebar-fichajes-icon-dashboard-tablet"
                    alt="Icono Fichar"
                  />
                </button>
                <button className="fichajes-button-tablet" onClick={onFichajesClick}>
                  <img
                    src="../../../src/assets/icons/IconRevisarFichaje.png"
                    className="sidebar-fichajes-icon-dashboard-tablet"
                    alt="Icono Revisar Fichajes"
                  />
                </button>
              </div>

            </div>
          ) : (
            <button className="sidebar-fichajes-button-compress" onClick={onFichajesClick}>
              <div>
                <img
                  src="../../../src/assets/icons/IconFichar.png"
                  className="sidebar-fichajes-icon-compress"
                  alt="Image"
                />
              </div>
            </button>
          )}
        </>
      )}

      {isMobile && (
        <div className="sidebar-mobile-container">
          <button
            className="sidebar-mobile-button"
            type="button"
            onClick={toggleUserPopup}
          >
            <img
              src="../../../src/assets/images/User.jpg"
              className="sidebar-fichajes-user-image-mobile-compress"
              alt="User"
            />
          </button>

          {isUserPopupOpen && (
            <ul className="dropdown-menu-popup" ref={popupUserRef}>
              <li>
                <button
                  className="dropdown-item-popup"
                  onClick={(e) => {
                    e.preventDefault();
                    onDashboardClick();
                    setisUserPopupOpen(false);
                  }}
                >
                  DASHBOARD
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item-popup"
                  onClick={(e) => {
                    e.preventDefault();
                    onDashboardClick();
                    setisUserPopupOpen(false);
                  }}
                >
                  MATERIAL DE OFICINA
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item-popup"
                  onClick={(e) => {
                    e.preventDefault();
                    onDashboardClick();
                    setisUserPopupOpen(false);
                  }}
                >
                  ROPA RBX
                </button>
              </li>
            </ul>
          )}

          {userRol < 3 ? (
            <>
              <button
                className="sidebar-mobile-button"
                onClick={toggleFichajePopup}
              >
                <div>
                  <img
                    src="../../../src/assets/icons/IconFichar.png"
                    className="sidebar-fichajes-icon-mobile-compress"
                    alt="Fichar"
                  />
                </div>
              </button>

              {isFichajePopupOpen && (
                <ul className="dropdown-menu-popup fichaje" ref={popupFichajeRef}>
                  <li>
                    <button
                      className="dropdown-item-popup"
                      onClick={(e) => {
                        e.preventDefault();
                        onFichajesClick();
                        setisFichajePopupOpen(false);
                      }}
                    >
                      FICHAR
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item-popup"
                      onClick={(e) => {
                        e.preventDefault();
                        onFichajesClick();
                        setisFichajePopupOpen(false);
                      }}
                    >
                      REVISAR FICHAJES
                    </button>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <button className="sidebar-mobile-button" onClick={onFichajesClick}>
              <div>
                <img
                  src="../../../src/assets/icons/IconFichar.png"
                  className="sidebar-fichajes-icon-mobile-compress"
                  alt="Fichar"
                />
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  )
};
export default Sidebar;
