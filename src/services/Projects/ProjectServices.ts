import api from '../../config/ApiConfig'
import { ProjectDto } from '../../Dtos/ProjectsDto';

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