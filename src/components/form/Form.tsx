//Hooks
import React, { useState, useRef, useEffect, useContext } from "react";
import { useGetAllDepartments } from "../../hooks/useDepartments";
import { useGetAllProjects } from "../../hooks/useProjects";
import { useCreateTimesheet } from "../../hooks/useTimeSheetQueries";
//Styles
import "./Form.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "rsuite/dist/rsuite.min.css";
//Components
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { DropdownSelect } from "./DropdownSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
//Dtos
import { DepartmentsDto } from "../../dtos/DepartmentsDto";
import { ProjectDto } from "../../Dtos/ProjectsDto";
import { ParsedDate } from "../../types/ParsedDate";
import { TimesheetDto } from "../../dtos/TimesheetDto";
//Context
import { TimesheetType } from "../../context/TimesheetContext";
import { useTimesheet } from "../../context/TimesheetContext";


interface FormProps {
  onClose: () => void;
  state: TimesheetType | null;
  isMobile: boolean;
}

const Form: React.FC<FormProps> = ({ onClose, state, isMobile }) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [exitTime, setExitTime] = useState<Date | null>(() => {
    const newTime = new Date();
    newTime.setHours(newTime.getHours() + 9);
    return newTime;
  });
  const [departmentId, setDeparmentId] = useState<number | null>(null)
  const [projectId, setProjectId] = useState<number | null>(null);
  const [breakTime,setBreakTime] = useState<string | undefined>(undefined)
  const [showCalendar, setShowCalendar] = useState<boolean>(false);  
  const [entryTime, setEntryTime] = useState<Date | null>(new Date());
  const [errors, setErrors] = useState<{ departmentId?: string; projectId?: string }>({});
  const {timesheetType,setTimesheetType} = useTimesheet();


  const maxDate = state !== TimesheetType.Vacaciones ? new Date() : null;


  const handleDateChange = (item: any) => {
    setDateRange([item.selection]);
  };

  const handleDateSelect = () => {
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
   // Usar el hook de mutación
  const { mutate: createTimesheet, status, isError, error } = useCreateTimesheet();

  //Handle submit event in button press
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let validationErrors: { departmentId?: string; projectId?: string } = {};

    if (departmentId === null) {
      validationErrors.departmentId = "El departamento es obligatorio.";
    }
    if (projectId === null) {
      validationErrors.projectId = "El proyecto es obligatorio.";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // No continuar si hay errores
    }
  
    // Resetear errores si los campos son válidos
    setErrors({});
    const customEntryDate = new ParsedDate(entryTime ?? new Date())
    const customExitDate = new ParsedDate(exitTime ?? new Date())

    const storedEmployeeId = localStorage.getItem('employeeId');
  
    if (storedEmployeeId !== null ) {
      const timesheet : TimesheetDto = {
        employeeId: Number(storedEmployeeId),
        date : customEntryDate.formattedDate,
        week : customEntryDate.weekOfYear,
        timeIn: customEntryDate.formattedTime,
        timeOut : customExitDate.formattedTime,
        break : breakTime ?? '01:00:00',
        taskObservation:  observacionesRef.current?.value,
        departmentsId: departmentId ?? -1,
        projectId:projectId ?? -1,
        holiday:false,
        typeOfWorkId:Number(timesheetType),
        validation:false,
        branchId :1,
    };

    if (status) {
      console.log("Creando timesheet...",status);
    }

    createTimesheet(timesheet,{
      onSuccess: ()=>{
        alert("✅ Timesheet creado correctamente.");
        onClose();
      },
      onError: (error: { message: any; }) => {
        console.error("Error al crear el timesheet:", error);
        alert(`❌ Error al crear el timesheet: ${error.message || "Error desconocido"}`);
      }
    });

  
    if (isError && error) {
      console.error("Error al crear el timesheet:", error);
    }

    } else {
      console.error('No se encontró employeeId en localStorage');
    }
    
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const observacionesRef = useRef<HTMLTextAreaElement>(null);

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  // const stateToImageMap: { [key: string]: { img: string; text: string } } = {
  //   oficina: {
  //     img: "../../../src/assets/images/Oficinas.jpg",
  //     text: "OFICINA",
  //   },
  //   onsite: {
  //     img: "../../../src/assets/images/Onsite.jpg",
  //     text: "VIAJE",
  //   },
  //   vacaciones: {
  //     img: "../../../src/assets/images/Vacaciones.jpg",
  //     text: "VACACIONES",
  //   },
  //   baja: {
  //     img: "../../../src/assets/images/Baja.jpg",
  //     text: "BAJA",
  //   },
  // };
  const stateToImageMap: Record<TimesheetType, { img: string; text: string }> = {
    [TimesheetType.Trabajo]: {
      img: "../../../src/assets/images/Oficinas.jpg",
      text: "OFICINA",
    },
    [TimesheetType.Viaje]: {
      img: "../../../src/assets/images/Onsite.jpg",
      text: "VIAJE",
    },
    [TimesheetType.Vacaciones]: {
      img: "../../../src/assets/images/Vacaciones.jpg",
      text: "VACACIONES",
    },
    [TimesheetType.Baja]: {
      img: "../../../src/assets/images/Baja.jpg",
      text: "BAJA",
    },
    [TimesheetType.Undefined]:{
      img:"",
      text:""
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <h2 className="form-title">FICHAJE</h2> */}
        <div className="header-container">
          <h2 className="title">FICHAJE</h2>
          <button type='button' className="close-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </button>
        </div>
        <div className="form-box">
          {stateToImageMap[state??TimesheetType.Undefined] ? (
            <div>
              <img
                src={stateToImageMap[state??TimesheetType.Undefined].img}
                className={`form-state-img ${String(state).toLowerCase()}`}
                alt={stateToImageMap[state??TimesheetType.Undefined].text}
              />
            </div>
          ) : (
            <p>Estado no válido</p>
          )}
        </div>
        <label className="form-label">{stateToImageMap[state??TimesheetType.Undefined].text}</label>
        {(state === TimesheetType.Viaje || state === TimesheetType.Trabajo) && (
          <>
            <div className="form-group">
              <div className="form-group-label-filter">
                <label htmlFor="departamento" className="form-group-label">
                  DEPARTAMENTO
                </label>
              </div>
              <DropdownSelect<DepartmentsDto>
                queryHook={useGetAllDepartments}
                getLabel={(option) => option.name}  // Asumiendo que 'name' es la propiedad que quieres mostrar
                getValue={(option) => option.id.toString()}  // Usamos 'id' como valor
                onChange={(value) => setDeparmentId(value ? parseInt(value, 10) : null)}  // El valor seleccionado será el 'id' de la opción
              />
              {errors.departmentId && <p className="error-text">{errors.departmentId}</p>}
            </div>
            <div className="form-group">
              <div className="form-group-label-filter">
                <label htmlFor="departamento" className="form-group-label">
                  PROYECTO
                </label>
              </div>
              <DropdownSelect<ProjectDto>
                queryHook={useGetAllProjects}
                getLabel={(option) => option.projectName}
                getValue={(option) => option.id.toString()}
                onChange={(value) => setProjectId(value ? parseInt(value, 10) : null)}
              />
              {errors.departmentId && <p className="error-text">{errors.departmentId}</p>}
            </div>
            <div className="form-group">
              <label className="form-group-label">OBSERVACIONES</label>
              <div className="form-box-text">
                <textarea
                  id="observaciones"
                  className="form-textarea"
                  ref={observacionesRef}
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
                    onClick={handleDateSelect}
                  >
                    Select
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {(state === TimesheetType.Viaje || state === TimesheetType.Trabajo) && (
          <>
            <div className="form-group">
              <div className="time-picker-row">
                <div>
                  <label className="form-group-label">HORA DE ENTRADA</label>
                  <input
                    type="time"
                    className="time-input time-12"
                    value={entryTime ? entryTime.toTimeString().slice(0, 5) : ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!value) {
                        setEntryTime(null);
                        return;
                      }
                      const [hours, minutes] = value.split(":");
                      const updatedTime = new Date(entryTime || Date.now());
                      updatedTime.setHours(Number(hours));
                      updatedTime.setMinutes(Number(minutes));
                      console.log('raw date', updatedTime)
                      setEntryTime(updatedTime);
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
                    value={exitTime ? exitTime.toTimeString().slice(0, 5) : ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!value) {
                        setExitTime(null);
                        return;
                      }
                      const [hours, minutes] = value.split(":");
                      const updatedTime = new Date(exitTime || Date.now());
                      updatedTime.setHours(Number(hours));
                      updatedTime.setMinutes(Number(minutes));                      
                      setExitTime(updatedTime);
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
                      setBreakTime(e.target.value)
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
            // onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
