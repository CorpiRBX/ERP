import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Timesheets.css";
import Form from "../form/Form";
import { useTimesheets } from "./useTimesheets";
import Filters from "./Filters";
import { FilterConfig } from "../../interfaces/FilterConfig";

const Timesheets: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 800);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formState, setFormState] = useState<string | boolean>(false);
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const debounceTimer: number = 500;

  const {
    timesheets,
    employeeNames,
    loading,
    error,
    updateFilter,
    handleEmployeeNameFilter,
    handleDateFilter,
    currentPage,
    totalPages,
    pageSize,
    setCurrentPage,
    setPageSize
  } = useTimesheets();

  const filtersConfig: FilterConfig[] = [
    { key: "employeeId", type: "text", placeholder: "Empleado" },
    { key: "date", type: "string", placeholder: "Fecha" }
    // { key: "timeOut", type: "date", placeholder: "Fecha de salida" },
    // { key: "projectId", type: "number", placeholder: "ID del proyecto" },
    // { key: "departmentsId", type: "number", placeholder: "ID del departamento" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const handleGoBack = () => navigate("/");

  const handleOpenForm = (state: string) => {
    setFormState(state);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setInputPage((prev) => prev + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setInputPage((prev) => prev - 1);
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const [inputPage, setInputPage] = useState(currentPage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(Math.max(1, Math.min(totalPages, inputPage)));
      if(inputPage > totalPages) setInputPage(totalPages);
    }, debounceTimer);

    return () => clearTimeout(timer);
  }, [inputPage]);

  return (
    <div className="timesheets-container">
      <div className="timesheets-main-container">
        <div className="timesheets-header">
          <h2 className="timesheets-title">FICHAJE</h2>
        </div>
        <div className="timesheets-button-container">
          <button
            className="timesheets-button-oficina"
            onClick={() => handleOpenForm("oficina")}
          >
            {showForm && formState === "oficina" && (
              <Form
                onClose={handleCloseForm}
                state={"oficina"}
                isMobile={isMobile}
              />
            )}
            <img
              src="../../../src/assets/images/Oficinas.jpg"
              className="timesheets-button-img"
              alt="Onsite"
            ></img>
          </button>
          <span className="timesheets-label">OFICINAS</span>
        </div>
        <div className="timesheets-button-container">
          <button
            className="timesheets-button-onsite"
            onClick={() => handleOpenForm("onsite")}
          >
            {showForm && formState === "onsite" && (
              <Form
                onClose={handleCloseForm}
                state={"onsite"}
                isMobile={isMobile}
              />
            )}
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
            <button
              className="timesheets-button-vacaciones"
              onClick={() => handleOpenForm("vacaciones")}
            >
              {showForm && formState === "vacaciones" && (
                <Form
                  onClose={handleCloseForm}
                  state={"vacaciones"}
                  isMobile={isMobile}
                />
              )}
              <img
                src="../../../src/assets/images/Vacaciones.jpg"
                className="timesheets-button-img-vacaciones"
                alt="Onsite"
              ></img>
            </button>
            <span className="timesheets-label-right">VACACIONES</span>
          </div>

          <div className="timesheets-button-wrapper">
            <button
              className="timesheets-button-baja"
              onClick={() => handleOpenForm("baja")}
            >
              {showForm && formState === "baja" && (
                <Form
                  onClose={handleCloseForm}
                  state={"baja"}
                  isMobile={isMobile}
                />
              )}
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
            <label className="timesheets-last-entry-detail-label">ENTRADA</label>
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
            
            <button onClick={() => setFiltersVisible(!filtersVisible)} className="filter-toggle-button">
              <i className={`bi ${filtersVisible ? "bi-filter-circle-fill" : "bi-filter-circle"}`}></i>
            </button>
            
            {filtersVisible && (
              <Filters
                config={filtersConfig}
                onFilterChange={(key, value) => {
                  if (key === "employeeId") {
                    handleEmployeeNameFilter(value);
                  }
                  if (key === "date") {
                    handleDateFilter(value);
                  } 
                  // else {
                  //   updateFilter(key, value);
                  // }
                }}
              />
            )}
          </div>
        </div>

        <div className="timesheets-history-content">
          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <table className="timesheets-table">
            <thead>
              <tr>
                {["Nombre", "Entrada", "Salida", "Break", "Proyecto", "Departamento"].map((header) => (
                  <th key={header} className="timesheets-history-header-bottom-label">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timesheets.map(({ id, employeeId, timeIn, timeOut, break: breakTime, projectId, departmentsId }) => (
                <tr key={id}>
                  <td>{employeeNames[employeeId] || "Cargando..."}</td>
                  <td>{timeIn}</td>
                  <td>{timeOut}</td>
                  <td>{breakTime}</td>
                  <td>{projectId}</td>
                  <td>{departmentsId}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button disabled={currentPage === 1} onClick={handlePreviousPage}>Anterior</button>
            <span>
              Página
              {' '}
              <input
                className="paginator-input"
                type="number"
                value={inputPage}
                onChange={(e) => setInputPage(Number(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setCurrentPage((prevPage) =>
                      Math.max(1, Math.min(totalPages, prevPage))
                    );
                  }
                }}
                onFocus={(e) => e.target.select()}
              />
              {' '}
              de {totalPages} |
              
              Fichajes por página:
              {' '}
              <select value={pageSize} onChange={handlePageSizeChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select> 
              
            </span>
            <button disabled={currentPage === totalPages} onClick={handleNextPage}>Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timesheets;
