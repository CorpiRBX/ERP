import React from "react";
import { FilterConfig } from "../../interfaces/FilterConfig";
import { TimesheetFilters } from "../../interfaces/TimesheetFilters";
import DatePicker from "./DatePicker";
import "react-datepicker/dist/react-datepicker.css";

interface FiltersProps {
  config: FilterConfig[];
  onFilterChange: (key: keyof TimesheetFilters, value: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ config, onFilterChange }) => {
  return (
    <div className="filters-container">
      {config.map(({ key, type, placeholder }) => (
        <div className="filter-row" key={key}>
          <label>{placeholder}:</label>
          {key === "date" ? (
            <DatePicker onChange={(date) => onFilterChange("date", date)} />
          ) : (
            <input
              type={type}
              className="filter-input"
              placeholder={placeholder}
              onChange={(e) =>
                onFilterChange(
                  key,
                  type === "number" ? parseInt(e.target.value) || undefined : e.target.value
                )
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Filters;
