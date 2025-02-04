import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '../services/projects/ProjectServices';

export const useGetAllProjects = () =>{
    return useQuery({
        queryKey:['projects'],
        queryFn : getAllProjects
    });
};