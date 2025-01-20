import React, { useState, useRef } from "react";
import "./Form.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "rsuite/dist/rsuite.min.css";
import { ReactSketchCanvas } from "react-sketch-canvas";

const Form = ({ onClose, state, isMobile }) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [time1, setTime1] = useState(new Date());
  const [time2, setTime2] = useState(() => {
    const newTime = new Date();
    newTime.setHours(newTime.getHours() + 9);
    return newTime;
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const maxDate = state !== "vacaciones" ? new Date() : null;

  const handleDateChange = (item) => {
    setDateRange([item.selection]);
  };

  const handleSelect = () => {
    const selectedDates = [];
    const { startDate, endDate } = dateRange[0];
  
    // Generar el array de fechas seleccionadas entre startDate y endDate
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      selectedDates.push(format(currentDate, "dd/MM/yyyy"));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(selectedDates);
    toggleCalendar();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const canvasRef = useRef(null);
  // Función para limpiar el contenido del Sketch
  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  const stateToImageMap = {
    oficina: {
      img: "../../../src/assets/images/Oficinas.jpg",
      text: "OFICINA",
    },
    onsite: {
      img: "../../../src/assets/images/Onsite.jpg",
      text: "ONSITE",
    },
    vacaciones: {
      img: "../../../src/assets/images/Vacaciones.jpg",
      text: "VACACIONES",
    },
    baja: {
      img: "../../../src/assets/images/Baja.jpg",
      text: "BAJA",
    },
  };

  return (
    <div className="form-overlay">
      <div className={`form-container ${isMobile ? "isMobile" : "isDesktop"}`}>
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">FICHAJE</h2>
          <div className="form-box">
            {stateToImageMap[state] ? (
              <div>
                <img
                  src={stateToImageMap[state].img}
                  className={`form-state-img ${state}`}
                  alt={stateToImageMap[state].text}
                />
              </div>
            ) : (
              <p>Estado no válido</p>
            )}
          </div>
          {/* OFICINAS */}
          <label className="form-label">{stateToImageMap[state].text}</label>
          {(state === "onsite" || state === "oficina") && (
            <>
          <div className="form-group">
            <label htmlFor="departamento" className="form-group-label">
              DEPARTAMENTO
            </label>
            <div className="select-container">
              <select id="departamento" className="form-select">
                <option value="rrhh">RRHH</option>
                <option value="it">IT</option>
                <option value="marketing">Marketing</option>
                <option value="ventas">Ventas</option>
              </select>
              <div className="select-arrow"></div>
            </div>
          </div>
          {/* PROYECTO */}
          <div className="form-group">
            <label htmlFor="proyecto" className="form-group-label">
              PROYECTO
            </label>
            <div className="select-container">
              <select id="proyecto" className="form-select">
                <option value="proyecto1">Proyecto 1</option>
                <option value="proyecto2">Proyecto 2</option>
                <option value="proyecto3">Proyecto 3</option>
                <option value="proyecto4">Proyecto 4</option>
              </select>
              <div className="select-arrow"></div>
            </div>
          </div>
          {/* OBSERVACIONES */}
          <label className="form-group-label">OBSERVACIONES</label>
          <div className="form-box-text">
            <textarea id="observaciones" className="form-textarea"></textarea>
          </div>
          </>
          )}
          {/* FECHA */}
          <label className="form-group-label">FECHA</label>
          <div className="form-group date-inputs">
            <div className="date-input-container">
              <input
                type="text"
                className="form-date-input no-calendar"
                placeholder="dd/mm/yyyy"
                value={
                  dateRange[0].startDate
                    ? format(dateRange[0].startDate, "dd/MM/yyyy")
                    : ""
                }
                readOnly
              />
              <input
                type="text"
                className="form-date-input no-calendar"
                placeholder="dd/mm/yyyy"
                value={
                  dateRange[0].endDate === null ||
                  dateRange[0].startDate.getTime() ===
                    dateRange[0].endDate?.getTime()
                    ? ""
                    : format(dateRange[0].endDate, "dd/MM/yyyy")
                }
                readOnly
              />
              <button
                type="button"
                className="calendar-button"
                onClick={toggleCalendar}
              >
                <img
                  src="../../../src/assets/icons/IconCalendario.png"
                  className="form-button-icon-calendar"
                  alt="Calendario"
                />
              </button>
            </div>
            {showCalendar && (
              <div className="calendar-popup">
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateChange}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  maxDate={maxDate}
                />
                <div className="form-button-ends">
                  <button
                    type="button"
                    className="select-button"
                    onClick={handleSelect}
                  >
                    Select
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* TIME PICKER */}
          {(state === "onsite" || state === "oficina") && (
            <>
          <div className="time-picker-row">
            <div style={{ marginBottom: "1rem" }}>
              <label className="form-group-label">HORA DE ENTRADA</label>
              <input
                type="time"
                className="time-input time-12"
                value={time1.toTimeString().slice(0, 5)}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(":");
                  const updatedTime = new Date(time1);
                  updatedTime.setHours(Number(hours));
                  updatedTime.setMinutes(Number(minutes));
                  setTime1(updatedTime);
                }}
              />
            </div>
            <div
              className={`time-picker-input ${
                isMobile ? "isMobile" : "isDesktop"
              }`}
            >
              <label className="form-group-label">HORA DE SALIDA</label>
              <input
                type="time"
                className="time-input time-12"
                value={time2.toTimeString().slice(0, 5)}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(":");
                  const updatedTime = new Date(time2);
                  updatedTime.setHours(Number(hours));
                  updatedTime.setMinutes(Number(minutes));
                  setTime2(updatedTime);
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label className="form-group-label">DESCANSO</label>
            <div>
              <input
                type="time"
                className="time-input time-3"
                defaultValue="01:00"
                onChange={(e) => {
                  console.log("Nuevo valor:", e.target.value);
                }}
              />
            </div>
          </div>
          </>
          )}
          {/* FIRMA */}
          <div>
            <div style={{ display: "flex" }}>
              <div>
                <label className="form-group-label">FIRMA</label>
              </div>
              <div className="align-right">
                <button
                  className="form-button-reload"
                  type="button"
                  onClick={handleClearClick}
                >
                  <img
                    src="../../../src/assets/icons/IconRecarga.png"
                    className="form-button-icon"
                    alt="Firma"
                  />
                </button>
              </div>
            </div>
            <div className="form-draw-box">
              <ReactSketchCanvas
                ref={canvasRef}
                width="100%"
                height="150px"
                canvasColor="transparent"
                strokeColor="black"
                strokeWidth={2}
              />
            </div>
          </div>
          <div className="form-button-ends">
            <button
              type="button"
              className="form-button-cancel"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="form-button-submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
