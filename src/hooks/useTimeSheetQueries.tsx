import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPagedTimesheets,getTimesheetById, createTimesheet} from '../services/timesheets/TimeSheetsService';
import { TimesheetDto } from '../dtos/TimesheetDto';
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


export const useCreateTimesheet = () =>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : (timesheet: TimesheetDto)=> createTimesheet(timesheet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheets'] })
    },
    onError: (error: any) => {
      console.error("Error al crear el timesheet:", error);
    },    
  });
}