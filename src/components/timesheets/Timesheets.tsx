import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Timesheets.css";
import Form from "../form/Form";
import TimesheetList from "./TimesheetList";
import GridComponent from "./GridComponent";
import { TimesheetDto } from "../../dtos/TimesheetDto";
import { GetPagedTimesheetsParams } from "../../types/GetPagedTimesheetsParams";
import { getEmployeeByName } from "../../services/employees/employeeService";

const Timesheets: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formState, setFormState] = useState<string | boolean>(false);
  const [timesheetHistory, setTimesheetHistory] = useState<TimesheetDto[]>([]); // Estado para guardar los datos de la lista
  const [employeeNames, setEmployeeNames] = useState<{ [key: number]: string }>({}); // Mapeo de nombres de empleados
  const [filters, setFilters] = useState<GetPagedTimesheetsParams>({
    pageNumber: 1,
    pageSize: 10,
  }); // Estado para manejar los filtros
  const [fetchTimesheetsFn, setFetchTimesheetsFn] = useState<((filters: GetPagedTimesheetsParams) => void) | null>(null);

  const [filtersVisible, setFiltersVisible] = useState<boolean>(false); // Estado para controlar la visibilidad de la fila de filtros

  const [isOpenRow, setOpenRow] = useState(false);

  const debounceTimeout = useRef<number  | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
// carga inicial
  useEffect(() => {
    if (fetchTimesheetsFn) {
      fetchTimesheetsFn(filters); // Cargar fichajes automáticamente al inicio
    }
  // }, [fetchTimesheetsFn, filters]);  // Pasandole filters actualiza con los filtros al escribirlos sin darle al boton de Aplicar filtros
  }, [fetchTimesheetsFn]);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleOpenForm = (state: string) => {
    setFormState(state); // Establece el estado adecuado cuando se abre el formulario
    setShowForm(true);
  };

  const handleCloseForm = () => {
    console.log("Cerrar formulario");
    setShowForm(false);
  };

  const handleDataUpdate = (
    data: TimesheetDto[],
    names: { [key: number]: string }
  ) => {
    setTimesheetHistory(data); // Actualiza la lista de fichajes
    setEmployeeNames(names); // Actualiza los nombres de empleados
  };

  const handleApplyFilters = () => {
    if (fetchTimesheetsFn) {
      fetchTimesheetsFn(filters); // Llama a la función de filtros
    }
  };
  
  const updateFilter = (key: keyof GetPagedTimesheetsParams, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // const normalizeText = (text: string) =>
  //   text
  //     .toLowerCase() // Convierte todo a minúsculas
  //     .normalize("NFD") // Descompone caracteres acentuados
  //     .replace(/[\u0300-\u036f]/g, ""); // Elimina las marcas diacríticas (tildes)

  const handleEmployeeNameFilter = (name: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Limpia el timeout anterior
    }
  
    debounceTimeout.current = setTimeout(async () => {
      // const normalizedName = normalizeText(name); // Normaliza el texto ingresado
      // if (normalizedName.length >= 5) {
      if (name.length >= 5) {
        try {
          const response = await getEmployeeByName(name); // Llama al servicio
          if (response.success && response.data) {
            const employeeId = response.data.id; // Extrae el ID del empleado
            updateFilter("employeeId", employeeId); // Actualiza el filtro con el ID
          } else {
            updateFilter("employeeId", undefined); // Limpia el filtro si no hay resultados
          }
        } catch (error) {
          console.error("Error buscando el empleado por nombre:", error);
        }
      } else {
        updateFilter("employeeId", undefined); // Limpia el filtro si no hay suficientes caracteres
      }
    }, 1000); // Retraso de 1000 ms
  };
  
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
            <div className="timesheets-history-filters">
            <button onClick={() => setFiltersVisible(!filtersVisible)} className="filter-toggle-button">
              <i className={`bi ${filtersVisible ? "bi-filter-circle-fill" : "bi-filter-circle"}`}></i>
            </button>

              <div className={`filters-container ${filtersVisible ? "filters-visible" : "filters-hidden"}`}>
                {/* <div className="filter-row">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filtrar Nombre"
                    onChange={async (e) => {
                      const employeeName = e.target.value;
                      if (employeeName) {
                        try {
                          const response = await getEmployeeByName(employeeName); // Llama al nuevo servicio
                          if (response.success && response.data) {
                            const employeeId = response.data.id; // Obtén el ID del empleado
                            updateFilter("employeeId", employeeId); // Actualiza el filtro con el ID
                          } else {
                            updateFilter("employeeId", undefined); // Limpia el filtro si no hay resultados
                          }
                        } catch (error) {
                          console.error("Error buscando el empleado por nombre:", error);
                        }
                      } else {
                        updateFilter("employeeId", undefined); // Limpia el filtro si no hay texto
                      }
                    }}
                  />
                </div> */}

                <div className="filter-row">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filtrar Nombre"
                    onChange={(e) => handleEmployeeNameFilter(e.target.value)}
                  />
                </div>

                <div className="filter-row">
                  <label>Entrada:</label>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filtrar Entrada"
                    onChange={(e) => updateFilter("timeIn", e.target.value)}
                  />
                </div>
                <div className="filter-row">
                  <label>Salida:</label>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filtrar Salida"
                    onChange={(e) => updateFilter("timeOut", e.target.value)}
                  />
                </div>
                <div className="filter-row">
                  <label>Break:</label>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filtrar Break"
                    onChange={(e) => updateFilter("break", e.target.value)}
                  />
                </div>
                <div className="filter-row">
                  <label>Proyecto:</label>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filtrar Proyecto"
                    onChange={(e) =>
                      updateFilter("projectId", e.target.value ? parseInt(e.target.value) : undefined)
                    }
                  />
                </div>
                <div className="filter-row">
                  <label>Departamento:</label>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filtrar Departamento"
                    onChange={(e) =>
                      updateFilter("departmentsId", e.target.value ? parseInt(e.target.value) : undefined)
                    }
                  />
                </div>
                <button onClick={handleApplyFilters} className="apply-filters-button">
                  Aplicar filtros
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="timesheets-history-content">
          <TimesheetList
            onDataUpdate={handleDataUpdate}
            onFetchTimesheets={(fn) => {
              if (!fetchTimesheetsFn) {
                setFetchTimesheetsFn(() => fn); // Establece la función solo una vez
              }
            }}
          />
          <table className="timesheets-table">
            <thead>
              <tr>
                <th className="timesheets-history-header-bottom-label">Nombre</th>
                <th className="timesheets-history-header-bottom-label">Entrada</th>
                <th className="timesheets-history-header-bottom-label">Salida</th>
                <th className="timesheets-history-header-bottom-label">Break</th>
                <th className="timesheets-history-header-bottom-label">Proyecto</th>
                <th className="timesheets-history-header-bottom-label">Departamento</th>
              </tr>
            </thead>
            <tbody>
              {timesheetHistory.map((item) => (
                <tr key={item.id}>
                  <td>{employeeNames[item.employeeId] || "Cargando..."}</td>
                  <td>{item.timeIn}</td>
                  <td>{item.timeOut}</td>
                  <td>{item.break}</td>
                  <td>{item.projectId}</td>
                  <td>{item.departmentsId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timesheets;
