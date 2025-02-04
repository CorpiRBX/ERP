import { ApiResponse } from "../../types/ApiResponse";
import { DepartmentDto } from "../../dtos/DepartmentDto";
import api from "../../config/ApiConfig";

export const getDepartmentById = async (id: number): Promise<ApiResponse<DepartmentDto>> => {
  try {
    const response = await api.get<ApiResponse<DepartmentDto>>(`departments/GetById/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error desconocido al obtener el departamento.");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
};

export const getDepartmentByName = async (name: string): Promise<ApiResponse<DepartmentDto>> => {
  try {
    const response = await api.get<ApiResponse<DepartmentDto>>(`departments/GetByName/${name}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error desconocido al obtener el departamento.");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
};

export const getAllDepartments = async (): Promise<DepartmentDto[]> => {
  try {
    const response = await api.get('departments/GetAll');
    
    // Validamos si la respuesta tiene datos
  //   console.log(response);
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data.map((department: any) => ({
        id: department.id,
        name: department.name,
      }));
    }

    // Si la estructura no es la esperada, lanzamos un error
    throw new Error('Unexpected response format');
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};
