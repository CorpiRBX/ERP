import React from "react";
import { FilterConfig } from "../../interfaces/FilterConfig";
import { GetPagedTimesheetsParams } from "../../types/GetPagedTimesheetsParams";

interface FiltersProps {
  config: FilterConfig[];
  onFilterChange: (key: keyof GetPagedTimesheetsParams, value: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ config, onFilterChange }) => {
  return (
    <div className="filters-container">
      {config.map((filter) => (
        <div className="filter-row" key={filter.key}>
          <label>{filter.placeholder}:</label>
          <input
            type={filter.type}
            className="filter-input"
            placeholder={filter.placeholder}
            onChange={(e) => {
              const value =
                filter.type === "number" ? parseInt(e.target.value) || undefined : e.target.value;
              onFilterChange(filter.key, value);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Filters;
