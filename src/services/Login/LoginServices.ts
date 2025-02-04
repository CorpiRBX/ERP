import api from '../../config/ApiConfig'
import { LoginResponseDto } from '../../dtos/LoginResponseDto';

// Función para hacer login  
  export const loginUser = async (username: string, password: string): Promise<LoginResponseDto> => {
    try {
      const response = await api.post('userInfo/Login', {
        email: username,
        password: password,
      });
  
      // Retorna el objeto con ambas propiedades
      return {
        token: response.data.data.token,
        employeeId: response.data.data.employeeId,
        roleId: response.data.data.roleId
      };
    } catch (error) {
      console.error('Error en el login', error);
      throw error;
    }
  };
  