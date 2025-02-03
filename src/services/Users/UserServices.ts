import api from '../../config/ApiConfig'
import { UserDTO } from '../../Dtos/UserDto';

export const getAllUsers = async (token:string) : Promise<UserDTO[]> =>{
    try{
        const response = await api.get<UserDTO[]>('/UserInfo/GetAll',{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data
    }catch(error){
        console.log('Error al obtener usuarios: ',error)
        throw error;
    }
};