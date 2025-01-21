import { TimesheetSortOption } from "../enums/TimesheetSortOption";

export interface GetPagedTimesheetsParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: TimesheetSortOption;
  ascending?: boolean;
  id?: number;
  employeeId?: number;
  year?: number;
  month?: number;
  day?: number;
}
