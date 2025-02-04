import api from '../../config/ApiConfig'
import { ProjectDto } from '../../dtos/ProjectDto';
import { ApiResponse } from '../../types/ApiResponse';

export const getAllProjects = async (): Promise<ProjectDto[]> => {
    try {
      const response = await api.get('/projects/GetAll');
      
      // Validamos si la respuesta tiene datos
    //   console.log(response);
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data.map((project: any) => ({
          id: project.id,
          projectName: project.projectName,
        }));
      }      
      // Si la estructura no es la esperada, lanzamos un error
      throw new Error('Unexpected response format');
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  };

  export const getProjectById = async (id: number): Promise<ApiResponse<ProjectDto>> => {
    try {
      const response = await api.get<ApiResponse<ProjectDto>>(`/api/projects/GetById/${id}`);
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
      const response = await api.get<ApiResponse<ProjectDto>>(`projects/GetById/${id}`);
  
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
      const response = await api.get<ApiResponse<ProjectDto>>(`projects/GetByName/${name}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || "Error al buscar proyecto por nombre.");
      } else {
        throw new Error("No se pudo conectar con el servidor.");
      }
    }
  };