import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function DatePicker({ dateRange, onDateChange, onClose }) {
  return (
    <div className="calendar-popup" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <DateRange
        editableDateInputs={true}
        onChange={onDateChange}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
      />
      <button
        className="select-button"
        onClick={onClose}
      >
        SELECT
      </button>
    </div>
  );
}

export default DatePicker;
