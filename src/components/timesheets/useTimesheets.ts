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
      console.log('useTimesheets. filters.date', filters.date);
      // if(filters.date === '2021/03')
      // {
      //   filters.date = filters.date + '/02';
      //   console.log('useTimesheets. filters.date === 2021/03. filters.date', filters.date);
      // }
      // var year = new Date(filters.date!).getFullYear();
      // var month = new Date(filters.date!).getMonth() +1;
      // var day = new Date(filters.date!).getDate();
      let year: number | undefined;
      let month: number | undefined;
      let day: number | undefined;

      if (filters.date) {
        const parts = filters.date.split("/");

        if (filters.date.length === 4) {
          // Solo año: "2021"
          year = parseInt(filters.date, 10);
        } else if (filters.date.length === 7) {
          // Año y mes: "2021/03"
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
        } else if (filters.date.length === 10) {
          // Año, mes y día: "2021/03/31"
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          day = parseInt(parts[2], 10);
        }
      }

      console.log('useTimesheets. year', year);
      console.log('useTimesheets. month', month);
      console.log('useTimesheets. day', day);
        const filtersForApi: GetPagedTimesheetsParams = {
            // year: filters.date ? new Date(filters.date).getFullYear() : undefined,
            // month: filters.date ? new Date(filters.date).getMonth() +1 : undefined,
            // day: filters.date ? new Date(filters.date).getDate() : undefined,
            employeeId: filters.employeeId,
            pageNumber: 1, // Parámetros adicionales
            pageSize: 10,
          };
          console.log('useTimesheets2. year', year);
          console.log('useTimesheets2. month', month);
          console.log('useTimesheets2. day', day);
      console.log('useTimesheets. filtersForApi', filtersForApi);

      // Verificar si filters.date tiene un valor válido y descomponerlo en año, mes y día
      if (filters.date) {
        const parts = filters.date.split("/");

        if (filters.date.length === 4) {
          // Solo año: "2021"
          filtersForApi.year = parseInt(filters.date, 10);
        } else if (filters.date.length === 7) {
          // Año y mes: "2021/03"
          filtersForApi.year = parseInt(parts[0], 10);
          filtersForApi.month = parseInt(parts[1], 10);
        } else if (filters.date.length === 10) {
          // Año, mes y día: "2021/03/31"
          filtersForApi.year = parseInt(parts[0], 10);
          filtersForApi.month = parseInt(parts[1], 10);
          filtersForApi.day = parseInt(parts[2], 10);
        }
      }
      console.log('useTimesheets. filtersForApi2', filtersForApi);

      const response = await getPagedTimesheets(filtersForApi);
      console.log('useTimesheets. response', response);
      const data = response.data;
      console.log('useTimesheets. data', data);

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
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = window.setTimeout(async () => {
      try {
        if (date != null) {
          console.log('date', date);
          updateFilter("date", date);
        } else {
          updateFilter("date", undefined);
        }
      } catch {
        updateFilter("date", undefined);
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
    handleDateFilter
  };
};
