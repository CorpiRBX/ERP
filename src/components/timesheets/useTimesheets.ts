import { useState, useEffect, useCallback, useRef } from "react";
import { getPagedTimesheets } from "../../services/timesheets/timesheetService";
import { getEmployeeById, getEmployeeByName } from "../../services/employees/employeeService";
import { getNameProjectById, getProjectByName } from "../../services/projects/projectService"; // Importar servicio de proyectos
import { GetPagedTimesheetsParams } from "../../types/GetPagedTimesheetsParams";
import { TimesheetDto } from "../../dtos/TimesheetDto";
import { TimesheetFilters } from "../../interfaces/TimesheetFilters";
import { TimesheetSortOption } from "../../enums/TimesheetSortOption";
import { useFetchNames } from "../../hooks/useFetchNames"; // Importamos el nuevo hook

export const useTimesheets = () => {
  const [timesheets, setTimesheets] = useState<TimesheetDto[]>([]);
  const [filters, setFilters] = useState<TimesheetFilters>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimeout = useRef<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  const [sortBy, setSortBy] = useState<TimesheetSortOption>(TimesheetSortOption.Id);
  const [ascending, setAscending] = useState<boolean>(true);

  // Utilizar el hook para obtener nombres
  const { names: employeeNames, fetchNames: fetchEmployeeNames } = useFetchNames(getEmployeeById);
  const { names: projectNames, fetchNames: fetchProjectNames } = useFetchNames(getNameProjectById);

  const parseDateFilter = (dateString?: string) => {
    if (!dateString) return {};

    const parts = dateString.split("/");
    const [year, month, day] = parts.map((part) => parseInt(part, 10));

    return {
      year: year || undefined,
      month: month || undefined,
      day: day || undefined,
    };
  };

  const fetchTimesheets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const dateFilter = parseDateFilter(filters.date);
      const filtersForApi: GetPagedTimesheetsParams = {
        employeeId: filters.employeeId,
        pageNumber: currentPage,
        pageSize,
        ...dateFilter,
        sortBy: sortBy,
        ascending: ascending,
      };

      const response = await getPagedTimesheets(filtersForApi);
      const data = response.data;
      const pagedItemsList = response.data.pagedItemsList;

      // Obtener nombres de empleados y proyectos en lote
      await fetchEmployeeNames(pagedItemsList, "employeeId");
      await fetchProjectNames(pagedItemsList, "projectId");

      setTimesheets(pagedItemsList);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
    } catch (err: any) {
      setError(err.message || "Error al cargar los fichajes.");
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage, pageSize, sortBy, ascending, fetchEmployeeNames, fetchProjectNames]);

  const updateFilter = (key: keyof TimesheetFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const debounce = (callback: () => void, delay: number) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = window.setTimeout(callback, delay);
  };

  const handleEmployeeNameFilter = (name: string) => {
    debounce(async () => {
      if (name.length >= 5) {
        try {
          const response = await getEmployeeByName(name);
          updateFilter("employeeId", response.success ? response.data?.id : undefined);
        } catch {
          updateFilter("employeeId", undefined);
        }
      } else {
        updateFilter("employeeId", undefined);
      }
    }, 1000);
  };

  const handleDateFilter = (date: Date | null) => {
    debounce(() => updateFilter("date", date ?? undefined), 1000);
  };

  useEffect(() => {
    fetchTimesheets();
  }, [fetchTimesheets]);

  return {
    timesheets,
    employeeNames,
    projectNames, // Devuelve también los nombres de proyectos
    loading,
    error,
    updateFilter,
    handleEmployeeNameFilter,
    handleDateFilter,
    currentPage,
    totalPages,
    totalCount,
    pageSize,
    setCurrentPage,
    setPageSize,
    setSortBy,
    setAscending,
  };
};
