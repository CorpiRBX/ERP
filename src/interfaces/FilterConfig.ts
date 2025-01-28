import { TimesheetFilters } from "./TimesheetFilters";

export interface FilterConfig {
    key: keyof TimesheetFilters;
    type: "text" | "date" | "number";
    placeholder: string;
  }
