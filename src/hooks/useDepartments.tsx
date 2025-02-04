import { useQuery } from '@tanstack/react-query';
import { getAllDepartments } from "../services/departments/DeparmentsServices";

export const useGetAllDepartments = () => {
    return useQuery({
      queryKey: ['departments'],
      queryFn: getAllDepartments,
    });
  };