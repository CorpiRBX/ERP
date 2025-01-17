import React, { useState } from "react";
import "./Form.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "rsuite/dist/rsuite.min.css";


const Form = ({ onClose }) => {
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
  const [time3, setTime3] = useState("01:00");

  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (item) => {
    setDateRange([item.selection]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleTime1Change = (value) => {
    if (value) {
      setTime1(value);
    }
  };

  const handleTime2Change = (value) => {
    if (value) {
      setTime2(value);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">FICHAJE</h2>
          <div className="form-box"></div>
          {/* OFICINAS */}
          <label className="form-label">OFICINAS</label>
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
                />
                <button
                  type="button"
                  className="select-button"
                  onClick={toggleCalendar}
                >
                  Select
                </button>
              </div>
            )}
          </div>

          {/* TIME PICKER */}

          <div className="time-picker-row">
            <div>
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
            <div className="time-picker-input">
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
          <div>
            <label className="form-group-label">FIRMA</label>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
