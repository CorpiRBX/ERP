import { useState, useEffect, useCallback, useRef } from "react";
import { getPagedTimesheets } from "../../services/timesheets/timesheetService";
import { getEmployeeById, getEmployeeByName } from "../../services/employees/employeeService";
import { GetPagedTimesheetsParams } from "../../types/GetPagedTimesheetsParams";
import { TimesheetDto } from "../../dtos/TimesheetDto";

export const useTimesheets = () => {
  const [timesheets, setTimesheets] = useState<TimesheetDto[]>([]);
  const [employeeNames, setEmployeeNames] = useState<{ [key: number]: string }>({});
  const [filters, setFilters] = useState<GetPagedTimesheetsParams>({ pageNumber: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimeout = useRef<number | null>(null);

  // Función para obtener fichajes
  const fetchTimesheets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPagedTimesheets(filters);
      const data = response.data;

      // Obtener nombres de empleados en batch
      const names: { [key: number]: string } = {};
      await Promise.all(
        data.map(async (item) => {
          if (!names[item.employeeId]) {
            const employeeResponse = await getEmployeeById(item.employeeId);
            names[item.employeeId] = employeeResponse.data.name;
          }
        })
      );

      setTimesheets(data);
      setEmployeeNames(names);
    } catch (err: any) {
      setError(err.message || "Error al cargar los fichajes.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Función para actualizar filtros
  const updateFilter = (key: keyof GetPagedTimesheetsParams, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filtro con debounce
  const handleEmployeeNameFilter = (name: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = window.setTimeout(async () => {
      if (name.length >= 5) {
        try {
          const response = await getEmployeeByName(name);
          if (response.success && response.data) {
            updateFilter("employeeId", response.data.id);
          } else {
            updateFilter("employeeId", undefined);
          }
        } catch {
          updateFilter("employeeId", undefined);
        }
      } else {
        updateFilter("employeeId", undefined);
      }
    }, 1000);
  };

  // Cargar fichajes cuando cambian los filtros
  useEffect(() => {
    fetchTimesheets();
  }, [fetchTimesheets]);

  return {
    timesheets,
    employeeNames,
    loading,
    error,
    updateFilter,
    handleEmployeeNameFilter,
  };
};
