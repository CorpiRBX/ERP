import { useQuery, useMutation, useQueryClient,UseMutationResult } from '@tanstack/react-query';
import { getPagedTimesheets,getTimesheetById, createTimesheet} from '../services/Timesheets/TimeSheetsService';
import { TimesheetDto } from '../Dtos/TimesheetDto';
import { GetPagedTimesheetsParams } from '../types/GetPagedTimesheetsParams';
import { ApiResponse } from '../types/ApiResponse';


export const useGetTimesheetById = (id: number) => {
    return useQuery<ApiResponse<TimesheetDto>>({
      queryKey: ['timesheet', id],
      queryFn: () => getTimesheetById(id),
      enabled: !!id, // Solo se ejecuta si el ID es válido
    });
  };


export const useGetPagedTimesheets = (params: GetPagedTimesheetsParams) => {
    return useQuery<ApiResponse<TimesheetDto[]>>({
      queryKey: ['timesheets', params],
      queryFn: () => getPagedTimesheets(params),
      enabled: !!params.pageNumber && !!params.pageSize, // Solo se ejecuta si pageNumber y pageSize están presentes
    });
  };


export const useCreateTimesheet = () =>{
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<TimesheetDto>,Error,TimesheetDto>({
    mutationFn : (timesheet)=> createTimesheet(timesheet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheets'] })
    },
    onError: (error) => {
      console.error("Error al crear el timesheet:", error);
    },    
  });
}