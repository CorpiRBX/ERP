import { useState, useEffect, useCallback, useRef } from "react";
import { getPagedTimesheets } from "../../services/timesheets/timesheetService";
import { getEmployeeById, getEmployeeByName } from "../../services/employees/employeeService";
import { getNameProjectById, getProjectByName } from "../../services/projects/projectService";
import { getDepartmentById } from "../../services/departments/departmentService";
import { GetPagedTimesheetsParams } from "../../types/GetPagedTimesheetsParams";
import { TimesheetDto } from "../../dtos/TimesheetDto";
import { TimesheetFilters } from "../../interfaces/TimesheetFilters";
import { TimesheetSortOption } from "../../enums/TimesheetSortOption";
import { useFetchNames } from "../../hooks/useFetchNames";
import { useEntityFilter } from "../../hooks/useEntityFilter";
import { EmployeeDto } from "../../dtos/EmployeeDto";
import { ProjectDto } from "../../dtos/ProjectDto";

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
  const { names: departmentNames, fetchNames: fetchDepartmentNames } = useFetchNames(getDepartmentById);

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
        projectId: filters.projectId,
        pageNumber: currentPage,
        pageSize,
        ...dateFilter,
        sortBy: sortBy,
        ascending: ascending,
      };

      const response = await getPagedTimesheets(filtersForApi);
      const data = response.data;
      const pagedItemsList = response.data.pagedItemsList;

      await fetchEmployeeNames(pagedItemsList, "employeeId"); // Nombre de la propiedad de TimesheetDto
      await fetchProjectNames(pagedItemsList, "projectId");
      await fetchDepartmentNames(pagedItemsList, "departmentsId");

      setTimesheets(pagedItemsList);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
    } catch (err: any) {
      setError(err.message || "Error al cargar los fichajes.");
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage, pageSize, sortBy, ascending, fetchEmployeeNames, fetchProjectNames, fetchDepartmentNames]);

  const updateFilter = (key: keyof TimesheetFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const debounce = (callback: () => void, delay: number) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = window.setTimeout(callback, delay);
  };

  const { handleFilter: handleEmployeeNameFilter } = useEntityFilter<EmployeeDto, keyof TimesheetFilters>(
    getEmployeeByName,
    updateFilter,
    "employeeId"
  );

  const { handleFilter: handleProjectNameFilter } = useEntityFilter<ProjectDto, keyof TimesheetFilters>(
    getProjectByName,
    updateFilter,
    "projectId"
  );

  const handleDateFilter = (date: Date | null) => {
    debounce(() => updateFilter("date", date ?? undefined), 1000);
  };

  useEffect(() => {
    fetchTimesheets();
  }, [fetchTimesheets]);

  return {
    timesheets,
    employeeNames,
    projectNames,
    departmentNames,
    loading,
    error,
    updateFilter,
    handleEmployeeNameFilter,
    handleProjectNameFilter,
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
