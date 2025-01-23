import React, { useEffect, useState } from "react";
import { getPagedTimesheets } from "../../services/timesheets/timesheetService";
import { getEmployeeById } from "../../services/employees/employeeService"; // Importa el servicio de empleados
import { TimesheetDto } from "../../dtos/TimesheetDto";
import { GetPagedTimesheetsParams } from "../../types/GetPagedTimesheetsParams";

interface TimesheetListProps {
  onDataUpdate: (data: TimesheetDto[], employeeNames: { [key: number]: string }) => void;
  onFetchTimesheets?: (fn: (params: GetPagedTimesheetsParams) => void) => void; // Nueva prop opcional para exponer la función
}

const TimesheetList: React.FC<TimesheetListProps> = ({ onDataUpdate, onFetchTimesheets }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTimesheets = async (params: GetPagedTimesheetsParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPagedTimesheets(params);
      const timesheets = response.data;

      const employeeNames: { [key: number]: string } = {};
      await Promise.all(
        timesheets.map(async (timesheet) => {
          if (!employeeNames[timesheet.employeeId]) {
            const employeeResponse = await getEmployeeById(timesheet.employeeId);
            employeeNames[timesheet.employeeId] = employeeResponse.data.name;
          }
        })
      );

      onDataUpdate(timesheets, employeeNames); // Envía los fichajes y los nombres de los empleados
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Llama a la función para que el padre pueda controlarla
  useEffect(() => {
    if (onFetchTimesheets) {
      onFetchTimesheets((params: GetPagedTimesheetsParams) => 
      {
        fetchTimesheets(params);
      }); // Exponer solo la referencia de la función
    }
  }, []);

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TimesheetList;
