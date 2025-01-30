import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllDepartments } from "../services/Departments/DeparmentsServices";
import { DepartmentsDto } from '../Dtos/DepartmentsDto';

export const useGetAllDepartments = () => {
    return useQuery<DepartmentsDto[], Error>({
      queryKey: ['departments'],
      queryFn: getAllDepartments,
    });
  };