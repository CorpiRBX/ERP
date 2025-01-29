import { TimesheetFilters } from "./TimesheetFilters";

export interface FilterConfig {
    key: keyof TimesheetFilters;
    type: "text" | "string" | "number";
    placeholder: string;
  }
