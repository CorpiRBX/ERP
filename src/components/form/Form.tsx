import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./Form.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "rsuite/dist/rsuite.min.css";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import DepartmentSelect from "./DepartmentSelect";
import ProjectSelect from "./ProjectsSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface FormProps {
  onClose: () => void;
  state: string | null;
  isMobile: boolean;
}

const Form: React.FC<FormProps> = ({ onClose, state, isMobile }) => {
  const text = state ? state : "Estado no definido";
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [time1, setTime1] = useState<Date | null>(new Date());
  const [time2, setTime2] = useState<Date | null>(() => {
    const newTime = new Date();
    newTime.setHours(newTime.getHours() + 9);
    return newTime;
  });

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const maxDate = state !== "vacaciones" ? new Date() : null;

  const handleDateChange = (item: any) => {
    setDateRange([item.selection]);
  };

  const handleSelect = () => {
    const selectedDates: string[] = [];
    const { startDate, endDate } = dateRange[0];

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      selectedDates.push(format(currentDate, "dd/MM/yyyy"));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(selectedDates);
    toggleCalendar();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onClose();
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  const stateToImageMap: { [key: string]: { img: string; text: string } } = {
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
    <div>
      <form onSubmit={handleSubmit}>
        {/* <h2 className="form-title">FICHAJE</h2> */}
        <div className="header-container">
          <h2 className="title">FICHAJE</h2>
          <button className="close-btn"onClick={onClose}>
            <FontAwesomeIcon icon= {faTimes}></FontAwesomeIcon>
          </button>
        </div>
        <div className="form-box">
          {stateToImageMap[state || ""] ? (
            <div>
              <img
                src={stateToImageMap[state || ""].img}
                className={`form-state-img ${state}`}
                alt={stateToImageMap[state || ""].text}
              />
            </div>
          ) : (
            <p>Estado no válido</p>
          )}
        </div>
        <label className="form-label">{stateToImageMap[state || ""].text}</label>
        {(state === "onsite" || state === "oficina") && (
          <>
            <div className="form-group">
              <div className="form-group-label-filter">
                <label htmlFor="departamento" className="form-group-label">
                  DEPARTAMENTO
                </label>
              </div>
              <DepartmentSelect />
            </div>
            <div className="form-group">
              <div className="form-group-label-filter">
                <label htmlFor="departamento" className="form-group-label">
                  PROYECTO
                </label>
              </div>
              <ProjectSelect />
            </div>
            <div className="form-group">
              <label className="form-group-label">OBSERVACIONES</label>
              <div className="form-box-text">
                <textarea
                  id="observaciones"
                  className="form-textarea"
                ></textarea>
              </div>
            </div>
          </>
        )}
        <div className="form-group">
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
        </div>
        {(state === "onsite" || state === "oficina") && (
          <>
            <div className="form-group">
              <div className="time-picker-row">
                <div>
                  <label className="form-group-label">HORA DE ENTRADA</label>
                  <input
                    type="time"
                    className="time-input time-12"
                    value={time1 ? time1.toTimeString().slice(0, 5) : ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!value) {
                        setTime1(null);
                        return;
                      }
                      const [hours, minutes] = value.split(":");
                      const updatedTime = new Date(time1 || Date.now());
                      updatedTime.setHours(Number(hours));
                      updatedTime.setMinutes(Number(minutes));
                      setTime1(updatedTime);
                    }}
                  />
                </div>
                <div
                  className={`time-picker-input ${isMobile ? "isMobile" : "isDesktop"
                    }`}
                >
                  <label className="form-group-label">HORA DE SALIDA</label>
                  <input
                    type="time"
                    className="time-input time-12"
                    value={time2 ? time2.toTimeString().slice(0, 5) : ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!value) {
                        setTime2(null);
                        return;
                      }
                      const [hours, minutes] = value.split(":");
                      const updatedTime = new Date(time2 || Date.now());
                      updatedTime.setHours(Number(hours));
                      updatedTime.setMinutes(Number(minutes));
                      setTime2(updatedTime);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
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
            </div>
          </>
        )}

        <div className="form-group">
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
        </div>
        <div className="form-button-ends">
          <button
            type="button"
            className="form-button-cancel"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="form-button-submit"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
