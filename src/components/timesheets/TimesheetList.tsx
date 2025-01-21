import React, { useEffect, useState } from "react";
import { getPagedTimesheets } from "../../services/timesheets/timesheetService";
import { getEmployeeById } from "../../services/employees/employeeService"; // Importa el servicio de empleados
import { TimesheetDto } from "../../dtos/TimesheetDto";

interface TimesheetListProps {
  onDataUpdate: (data: TimesheetDto[], employeeNames: { [key: number]: string }) => void;
}

const TimesheetList: React.FC<TimesheetListProps> = ({ onDataUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTimesheets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPagedTimesheets({ pageNumber: 1, pageSize: 10 });
      const timesheets = response.data;

      // Obtener los nombres de los empleados
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

  useEffect(() => {
    fetchTimesheets();
  }, []);

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={fetchTimesheets}>Aplicar Filtros</button>
    </div>
  );
};

export default TimesheetList;
