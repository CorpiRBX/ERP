import axios from "axios";
import { ApiResponse } from "../../types/ApiResponse";
import { ProjectDto } from "../../dtos/ProjectDto";
import { API_BASE_URL } from "../../config/ApiConfig";

export const getProjectById = async (id: number): Promise<ApiResponse<ProjectDto>> => {
  try {
    const response = await axios.get<ApiResponse<ProjectDto>>(`${API_BASE_URL}/api/projects/GetById/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error desconocido al obtener el proyecto.");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
};

export const getNameProjectById = async (id: number): Promise<{ data: { name: string } }> => {
  try {
    const response = await axios.get<ApiResponse<ProjectDto>>(`${API_BASE_URL}/api/projects/GetById/${id}`);

    return { data: { name: response.data.data.projectName } }; // Mapear projectName a name
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error desconocido al obtener el proyecto.");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
};

export const getProjectByName = async (name: string): Promise<ApiResponse<ProjectDto>> => {
  try {
    const response = await axios.get<ApiResponse<ProjectDto>>(`${API_BASE_URL}/api/projects/GetByName/${name}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error al buscar proyecto por nombre.");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
};
