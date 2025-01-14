import React, { useState, useEffect } from "react";

const Sidebar = ({ isOpen, toggleSidebar, onFichajesClick }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 720;
  const isTablet = windowWidth < 1200;

  const sidebarWidth = isTablet
    ? isMobile
      ? "100%"
      : "7rem"
    : isOpen
    ? "250px"
    : "0";
  const sidebarHeight = isMobile ? "auto" : "100vh";
  const sidebarPosition = isMobile ? "fixed" : "static";
  const flexDirection = isMobile ? "row" : "column";
  const justifyContent = isMobile ? "space-around" : "flex-start";
  const alignItems = isMobile ? "center" : "center";

  return (
    <div
      style={{
        width: sidebarWidth,
        height: sidebarHeight,
        backgroundColor: "#222",
        color: "white",
        transition: "width 0.3s ease-in-out",
        overflowX: "hidden",
        paddingTop: "5px",
        display: "flex",
        flexDirection: flexDirection,
        alignItems: alignItems,
        position: sidebarPosition,
        bottom: 0,
        left: 0,
        justifyContent: justifyContent,
      }}
    >
      {isOpen && !isMobile && (
        <>
          <button
            style={{
              marginBottom: "5px",
              textAlign: "center",
              backgroundColor: "transparent",
              border: "1.5px solid white",
              borderRadius: "15px",
              padding: "10px",
              width: "calc(100% - 20px)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              height: "90px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "white",
                marginRight: "10px",
              }}
            ></div>
            <p
              style={{
                color: "white",
                fontWeight: "bold",
                position: "relative",
                top: "-15px",
              }}
            >
              Nombre de usuario
            </p>
          </button>
          <button
            style={{
              backgroundColor: "#252323",
              color: "white",
              padding: "10px 10px",
              border: "1.5px solid white",
              borderRadius: "15px",
              cursor: "pointer",
              width: "calc(100% - 20px)",
              margin: "5px",
              textAlign: "center",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
            onClick={onFichajesClick}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                backgroundColor: "white",
                position: "absolute",
                left: "10px",
              }}
            ></div>
            <strong style={{ fontWeight: "bold" }}>Fichajes</strong>
          </button>
        </>
      )}

      {!isOpen && !isMobile && (
        <>
          <button
            style={{
              marginBottom: "5px",
              textAlign: "center",
              backgroundColor: "transparent",
              border: "1.5px solid white",
              borderRadius: "15px",
              padding: "10px",
              width: "calc(100% - 20px)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              height: "90px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "white",
              }}
            ></div>
          </button>
          <button
            style={{
              backgroundColor: "#252323",
              color: "white",
              padding: "10px 10px",
              border: "1.5px solid white",
              borderRadius: "15px",
              cursor: "pointer",
              width: "calc(100% - 20px)",
              margin: "5px",
              textAlign: "center",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
            onClick={onFichajesClick}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                backgroundColor: "white",
                position: "absolute",
              }}
            ></div>
          </button>
        </>
      )}
      {isMobile && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <button
              style={{
                marginBottom: "5px",
                marginLeft: "5px",
                textAlign: "center",
                backgroundColor: "transparent",
                border: "1.5px solid white",
                borderRadius: "15px",
                width: "90px", // Establecer un ancho fijo
                height: "90px", // Establecer una altura igual al ancho para hacerlo cuadrado
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              ></div>
            </button>

            <button
              style={{
                marginBottom: "5px",
                marginLeft: "5px",
                textAlign: "center",
                backgroundColor: "transparent",
                border: "1.5px solid white",
                borderRadius: "15px",
                width: "90px", // Establecer un ancho fijo
                height: "90px", // Establecer una altura igual al ancho para hacerlo cuadrado
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={onFichajesClick}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              ></div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
