import React, { useState } from "react";
import { FilterConfig } from "../../interfaces/FilterConfig";
import { TimesheetFilters } from "../../interfaces/TimesheetFilters";
import DatePicker from "./DatePicker";
import "react-datepicker/dist/react-datepicker.css";

interface FiltersProps {
  config: FilterConfig[];
  onFilterChange: (key: keyof TimesheetFilters, value: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ config, onFilterChange }) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: string | number | undefined }>({});

  const onInputChange = (key: keyof TimesheetFilters, value: string | number | undefined) => {
    console.log("onInputChange key:", key, "value:", value);
    if (!key) return; // Prevents undefined errors
    setInputValues((prev) => ({ ...prev, [key]: value }));
    onFilterChange(key, value);
  };

  const clearInput = (key: keyof TimesheetFilters) => {
    console.log("onInputChange key:", key);
    console.log("inputValues:", inputValues);
    console.log("key:", key);
    console.log("[key]", [key]);
    console.log("inputValues[key]:", inputValues[key]);
    setInputValues((prev) => ({ ...prev, [key]: "" }));
    console.log("inputValues after setInputValues:", inputValues);
    // // Assign "" for string filters (e.g., date), undefined for numbers (e.g., employeeId)
    // const clearedValue = key === "date" ? "" : undefined;
    // onFilterChange(key, clearedValue);

    onFilterChange(key, "");
  };

  return (
    <div className="filters-container">
      {config.map(({ key, type, placeholder }) => (
        <div className="filter-row" key={key}>
          <label>{placeholder ?? "Unknown"}:</label>
          <div className="filter-input-container">
            {key === "date" ? (
              <DatePicker 
              value={inputValues[key] || ""} 
              onChange={(date) => onInputChange(key, date)} 
              clearInput={() => clearInput(key)}/>
            ) : (
              <>
                <input
                  type={type}
                  className="filter-input"
                  placeholder={placeholder}
                  value={inputValues[key] || ""}
                  onChange={(e) =>
                    onInputChange(
                      key,
                      type === "number" ? parseInt(e.target.value) || undefined : e.target.value
                    )
                  }
                />
                {inputValues[key] && <button className="clear-button" onClick={() => clearInput(key)}>❌</button>}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filters;
