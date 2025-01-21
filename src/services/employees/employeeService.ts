import axios from "axios";
import { ApiResponse } from "../../types/ApiResponse";
import { EmployeeDto } from "../../dtos/EmployeeDto";
import { API_BASE_URL } from "../../config/apiConfig";

export const getEmployeeById = async (id: number): Promise<ApiResponse<EmployeeDto>> => {
  try {
    const response = await axios.get<ApiResponse<EmployeeDto>>(`${API_BASE_URL}/api/employees/GetById/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error desconocido al obtener el empleado.");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
};
