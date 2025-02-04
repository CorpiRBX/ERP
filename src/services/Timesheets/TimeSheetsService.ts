import { ApiResponse } from "../../types/ApiResponse.ts";
import { TimesheetDto } from "../../dtos/TimesheetDto.ts";
import { GetPagedTimesheetsParams } from "../../types/GetPagedTimesheetsParams.ts";
import api from '../../config/ApiConfig.ts'
import { GetPagedResponse } from "../../types/GetPagedResponse.ts";

// Función para obtener un timesheet por ID
export const getTimesheetById = async (id: number): Promise<ApiResponse<TimesheetDto>> => {
  try {
    const response = await api.get<ApiResponse<TimesheetDto>>(`timesheets/GetById/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error desconocido al obtener el timesheet.");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
};

// Función para obtener timesheets paginados
export const getPagedTimesheets = async (params: GetPagedTimesheetsParams): Promise<ApiResponse<GetPagedResponse<TimesheetDto>>> => {
  try {
    const response = await api.get<ApiResponse<GetPagedResponse<TimesheetDto>>>(`timesheets/GetPaged`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error al obtener los fichajes paginados.");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
};

//funcion para crear un nuevo timesheet
export const createTimesheet = async (timesheet: TimesheetDto): Promise<ApiResponse<TimesheetDto>> => {
  try {
    const response = await api.post<ApiResponse<TimesheetDto>>("timesheets/Create", timesheet);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error al crear el timesheet.");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
};
