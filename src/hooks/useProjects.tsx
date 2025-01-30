import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllProjects } from '../services/Projects/ProjectServices';
import { ProjectDto } from '../Dtos/ProjectsDto';

export const useGetAllProjects = () =>{
    return useQuery<ProjectDto[],Error>({
        queryKey:['projects'],
        queryFn : getAllProjects
    });
};