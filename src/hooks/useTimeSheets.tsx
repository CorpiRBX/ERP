import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPagedTimesheets,getTimesheetById } from '../services/Timesheets/TimeSheetsService';
import { TimesheetDto } from '../Dtos/TimesheetDto';
import { GetPagedTimesheetsParams } from '../types/GetPagedTimesheetsParams';


export const useGetTimesheetById = (id: number) => {
    return useQuery({
      queryKey: ['timesheet', id],
      queryFn: () => getTimesheetById(id),
      enabled: !!id, // Solo se ejecuta si el ID es válido
    });
  };

export const useGetPagedTimesheets = (params: GetPagedTimesheetsParams) => {
    return useQuery({
      queryKey: ['timesheets', params],
      queryFn: () => getPagedTimesheets(params),
      enabled: !!params.pageNumber && !!params.pageSize, // Solo se ejecuta si pageNumber y pageSize están presentes
    });
  };

