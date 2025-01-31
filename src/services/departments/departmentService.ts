import axios from "axios";
import { ApiResponse } from "../../types/ApiResponse";
import { DepartmentDto } from "../../dtos/DepartmentDto";
import { API_BASE_URL } from "../../config/ApiConfig";

export const getDepartmentById = async (id: number): Promise<ApiResponse<DepartmentDto>> => {
  try {
    const response = await axios.get<ApiResponse<DepartmentDto>>(`${API_BASE_URL}/api/departments/GetById/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error desconocido al obtener el departamento.");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
};
