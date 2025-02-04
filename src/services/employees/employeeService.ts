import { ApiResponse } from "../../types/ApiResponse";
import { EmployeeDto } from "../../dtos/EmployeeDto";
import api from "../../config/ApiConfig";

export const getEmployeeById = async (id: number): Promise<ApiResponse<EmployeeDto>> => {
  try {
    const response = await api.get<ApiResponse<EmployeeDto>>(`employees/GetById/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error desconocido al obtener el empleado.");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
};

export const getEmployeeByName = async (name: string): Promise<ApiResponse<EmployeeDto>> => {
  try {
    const response = await api.get<ApiResponse<EmployeeDto>>(`employees/GetByEmployeeName/${name}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error al buscar empleado por nombre.");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
};
