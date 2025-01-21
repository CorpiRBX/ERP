import React, { useEffect, useState } from "react";
import { getPagedTimesheets } from "../../services/timesheets/timesheetService";
import { TimesheetDto } from "../../dtos/TimesheetDto";

interface TimesheetListProps {
  onDataUpdate: (data: TimesheetDto[]) => void;
}

const TimesheetList: React.FC<TimesheetListProps> = ({ onDataUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTimesheets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPagedTimesheets({ pageNumber: 1, pageSize: 10 });
      onDataUpdate(response.data); // Envía los datos al componente padre
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Llamada inicial para cargar los datos al montar el componente
  useEffect(() => {
    fetchTimesheets();
  }, []); // Se ejecuta una vez al cargar

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Botón para disparar la carga manual */}
      <button onClick={fetchTimesheets}>Aplicar Filtros</button>
    </div>
  );
};

export default TimesheetList;
