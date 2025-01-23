import api from '../../config/ApiConfig'
import { LoginResponseDto } from '../../Dtos/LoginResponseDto';

// Función para hacer login  
  export const loginUser = async (username: string, password: string): Promise<LoginResponseDto> => {
    try {
      const response = await api.post('userInfo/Login', {
        email: username,
        password: password,
      });
  
      // Retorna el objeto con ambas propiedades
      return {
        token: response.data.token,
        employeeId: response.data.employeeId,
      };
    } catch (error) {
      console.error('Error en el login', error);
      throw error;
    }
  };
  