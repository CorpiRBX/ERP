export interface TimesheetDto 
{
    id?: number;
    employeeId: number;
    date: string; // Puede ajustarse según el formato de fecha devuelto
    week: number;
    departmentsId: number;
    projectId: number;
    taskObservation?: string;
    timeIn: string; // Similar para las propiedades de tiempo
    timeOut: string;
    break: string;
    holiday: boolean;
    typeOfWorkId: number;
    validation: boolean;
    branchId: number;
    createdAt?: string;
    modifiedAt?: string;
  }