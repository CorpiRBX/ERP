import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Timesheets.css";
import Form from "../form/Form";
import TimesheetList from "./TimesheetList";

const Timesheets = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState(false);
  const [timesheetHistory, setTimesheetHistory] = useState([]); // Estado para guardar los datos de la lista

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleOpenForm = (state) => {
    setFormState(state); // Establece el estado adecuado cuando se abre el formulario
    setShowForm(true);
  };

  const handleCloseForm = () => {
    console.log("Cerrar formulario");
    setShowForm(false);
  };

  const handleDataUpdate = (data) => {
    setTimesheetHistory(data); // Actualiza el historial con los datos obtenidos de TimesheetList
  };

  return (
    <div className="timesheets-container">
      <div className="timesheets-main-container">
        <div className="timesheets-header">
          <h2 className="timesheets-title">FICHAJE</h2>
        </div>
        <div className="timesheets-button-container">
        <button className="timesheets-button-oficina" onClick={() => handleOpenForm("oficina")}>
        {showForm && (formState === "oficina") && (<Form onClose={handleCloseForm} state={"oficina"} isMobile={isMobile} />)}
          <img
              src="../../../src/assets/images/Oficinas.jpg"
              className="timesheets-button-img"
              alt="Onsite"
            ></img>
          </button>
          <span className="timesheets-label">OFICINAS</span>
        </div>
        <div className="timesheets-button-container">
        <button className="timesheets-button-onsite" onClick={() => handleOpenForm("onsite")}>
            {showForm && formState === "onsite" && (<Form onClose={handleCloseForm} state={"onsite"} isMobile={isMobile} />)}
            <img
              src="../../../src/assets/images/OnSite.jpg"
              className="timesheets-button-img-onsite"
              alt="Onsite"
            ></img>
          </button>
          <span className="timesheets-label">ONSITE</span>
        </div>
        <div className="timesheets-button-group">
          <div className="timesheets-button-wrapper">
          <button className="timesheets-button-vacaciones" onClick={() => handleOpenForm("vacaciones")}>
          {showForm && formState === "vacaciones" && (<Form onClose={handleCloseForm} state={"vacaciones"} isMobile={isMobile} />)}
              <img
                src="../../../src/assets/images/Vacaciones.jpg"
                className="timesheets-button-img-vacaciones"
                alt="Onsite">                
              </img>
            </button>
            <span className="timesheets-label-right">VACACIONES</span>
          </div>

          <div className="timesheets-button-wrapper">
          <button className="timesheets-button-baja" onClick={() => handleOpenForm("baja")}>
          {showForm && formState === "baja" && (<Form onClose={handleCloseForm} state={"baja"} isMobile={isMobile} />)}
            <img
              src="../../../src/assets/images/Baja.jpg"
              className="timesheets-button-img-baja"
              alt="Onsite"
            ></img>
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
            <TimesheetList onDataUpdate={handleDataUpdate} />
            <ul>
              {timesheetHistory.map((item) => (
                <li key={item.id}>
                  <span>ID: {item.id}</span> - 
                  <span>Empleado: {item.employeeId}</span> - 
                  <span>Fecha: {item.date}</span>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
};

export default Timesheets;
