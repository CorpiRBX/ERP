import React, { useState } from "react";
import { FilterConfig } from "../../interfaces/FilterConfig";
import { TimesheetFilters } from "../../interfaces/TimesheetFilters";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FiltersProps {
  config: FilterConfig[];
  onFilterChange: (key: keyof TimesheetFilters, value: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ config, onFilterChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    // if (date) {
    //   onFilterChange("year", date.getFullYear());
    //   onFilterChange("month", date.getMonth() + 1); // Meses en JavaScript son 0-indexed
    //   onFilterChange("day", date.getDate());
    // } else {
    //   onFilterChange("year", undefined);
    //   onFilterChange("month", undefined);
    //   onFilterChange("day", undefined);
    // }
    onFilterChange("date", date);
  };

  return (
    <div className="filters-container">
      {config.map((filter) =>
        filter.key === "date" ? (
          // Renderizado único para el filtro "Fecha"
          <div className="filter-row" key={filter.key}>
            <label>{filter.placeholder}:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Selecciona una fecha"
              isClearable
              showMonthYearPicker // Permite seleccionar solo mes y año
              showYearPicker // Permite seleccionar solo año
            />
          </div>
        ) : (
          // Renderizado para otros filtros
          <div className="filter-row" key={filter.key}>
            <label>{filter.placeholder}:</label>
            <input
              type={filter.type}
              className="filter-input"
              placeholder={filter.placeholder}
              onChange={(e) => {
                const value =
                  filter.type === "number"
                    ? parseInt(e.target.value) || undefined
                    : e.target.value;
                onFilterChange(filter.key, value);
              }}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Filters;
