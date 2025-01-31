export interface ProjectDto {
  id: number;
  projectName: string;
  date: string;
  description?: string;
  branchId: number;
  projectStatusId: number;
  clientId?: number;
  manufacturerId?: number;
  locationId?: number;
  startDate?: string;
  finishDate?: string;
  models?: number;
  plcs?: number;
  robots?: number;
  revenue?: number;
  projectOwner?: number;
  projectManager?: number;
  projectTypeId: number;
  createdAt?: string;
  modifiedAt?: string;
}
