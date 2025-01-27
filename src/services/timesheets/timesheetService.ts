import axios from "axios";
import { ApiResponse } from "../../types/ApiResponse";
import { TimesheetDto } from "../../dtos/TimesheetDto";
import { GetPagedTimesheetsParams } from "../../types/GetPagedTimesheetsParams";
import { API_BASE_URL } from "../../config/ApiConfig";

// Función para obtener un timesheet por ID
export const getTimesheetById = async (id: number): Promise<ApiResponse<TimesheetDto>> => {
  try {
    const response = await axios.get<ApiResponse<TimesheetDto>>(`${API_BASE_URL}/api/timesheets/GetById/${id}`);
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
export const getPagedTimesheets = async (params: GetPagedTimesheetsParams): Promise<ApiResponse<TimesheetDto[]>> => {
  try {
    const response = await axios.get<ApiResponse<TimesheetDto[]>>(`${API_BASE_URL}/api/timesheets/GetPaged`, {
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
