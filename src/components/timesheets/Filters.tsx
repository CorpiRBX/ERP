import React, { useEffect, useState } from "react";
import { FilterConfig } from "../../interfaces/FilterConfig";
import { TimesheetFilters } from "../../interfaces/TimesheetFilters";
import DatePicker from "./DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Filters.css";
import { FilterState } from "../../types/FilterState";

interface FiltersProps {
  config: FilterConfig[];
  onFilterChange: (key: keyof TimesheetFilters, value: any) => void;
  noResults: boolean;
}

const Filters: React.FC<FiltersProps> = ({ config, onFilterChange, noResults }) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: string | number | undefined }>({});
  const [filterStates, setFilterStates] = useState<{ [key: string]: FilterState }>({});
  
  const onInputChange = (key: keyof TimesheetFilters, value: string | number | undefined) => {
    if (!key) return; // Prevents undefined errors
    setInputValues((prev) => ({ ...prev, [key]: value }));
    onFilterChange(key, value);
  };

  const clearInput = (key: keyof TimesheetFilters) => {
    setInputValues((prev) => ({ ...prev, [key]: "" }));

    setFilterStates((prev) => ({
      ...prev,
      [key]: FilterState.Empty
    }));
    onFilterChange(key, "");
  };

  useEffect(() => {
      Object.keys(inputValues).forEach((key) => {
          setFilterStates((prev) => ({
              ...prev,
              [key]: inputValues[key] !== undefined && inputValues[key] !== "" && noResults ? FilterState.Error : FilterState.Valid
          }));
      });
  }, [inputValues, noResults]);

  return (
    <div className="filters-container">
      {config.map(({ key, type, placeholder }) => (
        <div className="filter-row" key={key}>
          <label>{placeholder ?? "Unknown"}:</label>
          <div className="filter-input-container">
            {key === "date" ? (
              <DatePicker 
              value={inputValues[key] || ""} 
              onChange={(date: string | number | undefined) => onInputChange(key, date)} 
              clearInput={() => clearInput(key)}/>
            ) : (
              <>
                <input
                  type={type}
                  className={`filter-input ${filterStates[key] === FilterState.Error ? "input-error" : ""}`}
                  placeholder={placeholder}
                  value={inputValues[key] || ""}
                  onChange={(e) =>
                    onInputChange(
                      key,
                      type === "number" ? parseInt(e.target.value) || undefined : e.target.value
                    )
                  }
                />
                {
                  inputValues[key] && 
                  <button className="clear-button" onClick={() => clearInput(key)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                  </button>
                }
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filters;
