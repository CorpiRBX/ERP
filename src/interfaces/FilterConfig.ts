import { GetPagedTimesheetsParams } from "../types/GetPagedTimesheetsParams";

export interface FilterConfig {
    key: keyof GetPagedTimesheetsParams;
    type: "text" | "date" | "number";
    placeholder: string;
  }
