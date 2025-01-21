export interface EmployeeDto {
    id: number;
    active?: boolean | null;
    name: string;
    email?: string | null;
    phone?: string | null;
    socialSecurityNumber?: string | null;
    hourlyCost?: number | null;
    extraHourlyCost?: number | null;
    userId?: string | null;
    createdAt?: string | null;
    modifiedAt?: string | null;
    branchId: number;
  }
  