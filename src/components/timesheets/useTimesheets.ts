import { useState, useEffect, useCallback, useRef } from "react";
import { getPagedTimesheets } from "../../services/timesheets/timesheetService";
import { getEmployeeById, getEmployeeByName } from "../../services/employees/employeeService";
import { GetPagedTimesheetsParams } from "../../types/GetPagedTimesheetsParams";
import { TimesheetDto } from "../../dtos/TimesheetDto";
import { TimesheetFilters } from "../../interfaces/TimesheetFilters";

export const useTimesheets = () => {
  const [timesheets, setTimesheets] = useState<TimesheetDto[]>([]);
  const [employeeNames, setEmployeeNames] = useState<{ [key: number]: string }>({});
  const [filters, setFilters] = useState<TimesheetFilters>({ });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimeout = useRef<number | null>(null);

  // Función para obtener fichajes
  const fetchTimesheets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
        const filtersForApi: GetPagedTimesheetsParams = {
            year: filters.date ? new Date(filters.date).getFullYear() : undefined,
            month: filters.date ? new Date(filters.date).getMonth() +1 : undefined,
            day: filters.date ? new Date(filters.date).getDate() : undefined,
            employeeId: filters.employeeId,
            pageNumber: 1, // Parámetros adicionales
            pageSize: 10,
          };
      const response = await getPagedTimesheets(filtersForApi);
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
  const updateFilter = (key: keyof TimesheetFilters, value: any) => {
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

  const handleDateFilter = (date: Date) => {
    // if (debounceTimeout.current) {
    //   clearTimeout(debounceTimeout.current);
    // }

    // debounceTimeout.current = window.setTimeout(async () => {
      try {
        if (date != null) {
          updateFilter("date", date);
        } else {
          updateFilter("date", undefined);
        }
      } catch {
        updateFilter("date", undefined);
      }
    // }, 1000);
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
    handleDateFilter
  };
};
