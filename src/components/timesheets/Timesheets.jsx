import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Timesheets.css";

const Timesheets = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="timesheets-container">
      <div className="timesheets-main-container">
        <div className="timesheets-header">
          <h2 className="timesheets-title">FICHAJE</h2>
        </div>
        <div className="timesheets-button-container">
          <button className="timesheets-button">
            <span className="timesheets-button-text">Oficina</span>
          </button>

          <span className="timesheets-label">OFICINAS</span>
        </div>
        <div className="timesheets-button-container">
          <button className="timesheets-button">
            <span className="timesheets-button-text">OnSite</span>
          </button>

          <span className="timesheets-label">ONSITE</span>
        </div>
        <div className="timesheets-button-group">
          <div className="timesheets-button-wrapper">
            <button className="timesheets-button">
              <span className="timesheets-button-text">Vacaciones</span>
            </button>
            <span className="timesheets-label-right">VACACIONES</span>
          </div>

          <div className="timesheets-button-wrapper">
            <button className="timesheets-button">
              <span className="timesheets-button-text">Baja</span>
            </button>
            <span className="timesheets-label-right">BAJA</span>
          </div>
        </div>

        <div className="timesheets-last-entry-container">
          <label className="timesheets-last-entry-label">ULTIMO FICHAJE</label>
          <label className="timesheets-last-entry-type">OFICINAS</label>
          <div className="timesheets-last-entry-details">
            <label className="timesheets-last-entry-detail-label">
              ENTRADA
            </label>
            <label className="timesheets-last-entry-detail-label">SALIDA</label>
            <label className="timesheets-last-entry-detail-label">
              PROYECTO
            </label>
            <label className="timesheets-last-entry-detail-label">
              DEPARTAMENTO
            </label>
          </div>
          <div>
            <div className="timesheets-last-entry-data"></div>
            <button className="timesheets-repeat-button">
              <span className="timesheets-repeat-button-text">
                REPETIR FICHAJE
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="timesheets-history-container">
        <div className="timesheets-history-header">
          <div className="timesheets-history-header-top">
            <h2 className="timesheets-history-title">HISTORIAL DE FICHAJES</h2>
            <div className="timesheets-history-filters">
              <span className="timesheets-history-filter-label">FILTROS</span>
              <input
                type="checkbox"
                className="timesheets-history-filter-checkbox"
              />
              <input
                type="checkbox"
                className="timesheets-history-filter-checkbox"
              />
            </div>
          </div>
          <div className="timesheets-history-header-bottom">
            <span className="timesheets-history-header-bottom-label">
              Nombre
            </span>
            <span className="timesheets-history-header-bottom-label">
              Entrada
            </span>
            <span className="timesheets-history-header-bottom-label">
              Salida
            </span>
            <span className="timesheets-history-header-bottom-label">
              Break
            </span>
            <span className="timesheets-history-header-bottom-label">
              Proyecto
            </span>
            <span className="timesheets-history-header-bottom-label">
              Departamento
            </span>
          </div>
        </div>
        <div className="timesheets-history-content">
          <ul>
            <li>Elemento 1</li>
            <li>Elemento 2</li>
            <li>Elemento 3</li>
            <li>Elemento 4</li>
            <li>Elemento 5</li>
            <li>Elemento 6</li>
            <li>Elemento 7</li>
            <li>Elemento 8</li>
            <li>Elemento 9</li>
            <li>Elemento 10</li>
            <li>Elemento 11</li>
            <li>Elemento 12</li>
            <li>Elemento 13</li>
            <li>Elemento 14</li>
            <li>Elemento 15</li>
            <li>Elemento 16</li>
            <li>Elemento 17</li>
            <li>Elemento 18</li>
            <li>Elemento 19</li>
            <li>Elemento 20</li>
            <li>Elemento 21</li>
            <li>Elemento 22</li>
            <li>Elemento 23</li>
            <li>Elemento 24</li>
            <li>Elemento 25</li>
            <li>Elemento 26</li>
            <li>Elemento 27</li>
            <li>Elemento 28</li>
            <li>Elemento 29</li>
            <li>Elemento 30</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Timesheets;
