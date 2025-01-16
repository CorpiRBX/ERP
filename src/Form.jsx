import React, { useState } from "react";
import "./Form.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { IconButton, TextField } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Asegúrate de importar el icono de AccessTime

function Form({ onClose }) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      endDate: "",
    },
  ]);

  const [time1, setTime1] = useState(new Date());
  const [time2, setTime2] = useState(() => {
    const newTime = new Date();
    newTime.setHours(newTime.getHours() + 9); // Agrega 9 horas a la hora actual
    return newTime;
  });
  const [time3, setTime3] = useState(() => {
    const newTime = new Date();
    newTime.setHours(1, 0, 0, 0); // Establece la hora a las 01:00:00
    return newTime;
  });
  const [openPicker1, setOpenPicker1] = useState(false);
  const [openPicker2, setOpenPicker2] = useState(false);
  const [openPicker3, setOpenPicker3] = useState(false);

  const handleClickOpen1 = () => setOpenPicker1(true);
  const handleClickOpen2 = () => setOpenPicker2(true);
  const handleClickOpen3 = () => setOpenPicker3(true);

  const [showCalendar, setShowCalendar] = useState(false); // Controlar la visibilidad del calendario popup

  const handleDateChange = (item) => {
    setDateRange([item.selection]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); // Alterna la visibilidad del calendario
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
                  dateRange[0].endDate === "" ||
                  dateRange[0].startDate === dateRange[0].endDate
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
              <div
                className="calendar-popup"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="time-picker-container">
              <div className="time-picker-row">
                <div className="time-picker-item">
                  <label htmlFor="entrada" className="form-group-label">
                    HORA DE ENTRADA
                  </label>
                  <div className="input-container">
                    <TextField
                      value={time1.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      variant="outlined"
                      fullWidth
                      inputProps={{ readOnly: true }} // Esto asegura que no se pueda editar el input directamente
                    />
                    <IconButton onClick={handleClickOpen1}>
                      <AccessTimeIcon />
                    </IconButton>
                    {openPicker1 && (
                      <MobileTimePicker
                        open={openPicker1}
                        value={time1}
                        onChange={(newTime) => setTime1(newTime)}
                        onClose={() => setOpenPicker1(false)}
                        renderInput={(props) => <input {...props} />}
                      />
                    )}
                  </div>
                </div>

                <div className="time-picker-item">
                  <label htmlFor="salida" className="form-group-label">
                    HORA DE SALIDA
                  </label>
                  <div className="input-container">
                    <TextField
                      value={time2.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      variant="outlined"
                      fullWidth
                      inputProps={{ readOnly: true }} // También aseguramos que el input no se pueda editar
                    />
                    <IconButton onClick={handleClickOpen2}>
                      <AccessTimeIcon />
                    </IconButton>
                    {openPicker2 && (
                      <MobileTimePicker
                        open={openPicker2}
                        value={time2}
                        onChange={(newTime) => setTime2(newTime)}
                        onClose={() => setOpenPicker2(false)}
                        renderInput={(props) => <input {...props} />}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="time-picker-row">
                <div className="time-picker-item">
                  <label htmlFor="break" className="form-group-label">
                    BREAK
                  </label>
                  <div className="input-container">
                    <TextField
                      value={time3.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      variant="outlined"
                      fullWidth
                      inputProps={{ readOnly: true }} // Lo mismo aquí, el input es solo de lectura
                    />
                    <IconButton onClick={handleClickOpen3}>
                      <AccessTimeIcon />
                    </IconButton>
                    {openPicker3 && (
                      <MobileTimePicker
                        open={openPicker3}
                        value={time3}
                        onChange={(newTime) => setTime3(newTime)}
                        onClose={() => setOpenPicker3(false)}
                        renderInput={(props) => <input {...props} />}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </LocalizationProvider>

          {/* BUTTONS */}
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
