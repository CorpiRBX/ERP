import { useState, useEffect, useCallback, useRef } from "react";
import { getPagedTimesheets } from "../../services/timesheets/timesheetService";
import { getEmployeeById, getEmployeeByName } from "../../services/employees/employeeService";
import { GetPagedTimesheetsParams } from "../../types/GetPagedTimesheetsParams";
import { TimesheetDto } from "../../dtos/TimesheetDto";
import { TimesheetFilters } from "../../interfaces/TimesheetFilters";

export const useTimesheets = () => {
  const [timesheets, setTimesheets] = useState<TimesheetDto[]>([]);
  const [employeeNames, setEmployeeNames] = useState<{ [key: number]: string }>({});
  const [filters, setFilters] = useState<TimesheetFilters>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimeout = useRef<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

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
      };

      const response = await getPagedTimesheets(filtersForApi);
      const data = response.data;

      // Fetch employee names in batch
      const names: { [key: number]: string } = {};
      const uniqueEmployeeIds = new Set(data.map((item) => item.employeeId));

      await Promise.all(
        Array.from(uniqueEmployeeIds).map(async (id) => {
          const employeeResponse = await getEmployeeById(id);
          names[id] = employeeResponse.data.name;
        })
      );

      setTimesheets(data);
      setEmployeeNames(names);
      // setTotalPages(data.totalPages); // TODO: Devolver la cantidad total de paginas en el endpoint del backend
      setTotalPages(10);
    } catch (err: any) {
      setError(err.message || "Error al cargar los fichajes.");
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage, pageSize]);

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
    loading,
    error,
    updateFilter,
    handleEmployeeNameFilter,
    handleDateFilter,
    currentPage,
    totalPages,
    pageSize,
    setCurrentPage,
    setPageSize
  };
};
