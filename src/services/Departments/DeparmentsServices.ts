import api from '../../config/ApiConfig'
import { DepartmentsDto } from '../../dtos/DepartmentsDto'

export const getAllDepartments = async (): Promise<DepartmentsDto[]> => {
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