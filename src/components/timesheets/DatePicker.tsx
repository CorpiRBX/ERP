import React, { useState, useRef, useEffect } from "react";

const DatePicker = ({ onChange }) => {
  const [date, setDate] = useState(""); // Full date string
  const [year, setYear] = useState<number | null>(new Date().getFullYear());
  const [month, setMonth] = useState<number | null>(new Date().getMonth() + 1); // Months are 0-based in JS
  const [day, setDay] = useState<number | null>(null);  const [calendarOpen, setCalendarOpen] = useState(false);
  const [view, setView] = useState("year"); // View: "year", "month", "day"
  const [yearPage, setYearPage] = useState(0); // Paginator for year view

  const inputRef = useRef<HTMLInputElement>(null);

  // Generate years dynamically based on the current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const yearsPerPage = 16;
  const paginatedYears = years.slice(
    yearPage * yearsPerPage,
    (yearPage + 1) * yearsPerPage
  );

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const getDaysInMonth = (year, month) => {
    if (!year || !month) return [];
    return Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1);
  };
  const days = getDaysInMonth(year, month);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDate(value);

    const parts = value.split("/").map((p) => parseInt(p, 10));
    const newYear = parts[0] || null;
    const newMonth = parts[1] || null;
    const newDay = parts[2] || null;

    setYear(newYear);
    setMonth(newMonth);
    setDay(newDay);
    onChange({ year: newYear, month: newMonth, day: newDay });
  };

  const handleYearClick = (selectedYear) => {
    setYear(selectedYear);
    setDate(`${selectedYear}`);
    setView("month");
    onChange({ year: selectedYear, month: null, day: null });
  };

  const handleMonthClick = (selectedMonth) => {
    setMonth(selectedMonth);
    setDate(`${year}/${String(selectedMonth).padStart(2, "0")}`);
    setView("day");
    onChange({ year, month: selectedMonth, day: null });
  };

  const handleDayClick = (selectedDay) => {
    setDay(selectedDay);
    setDate(`${year}/${String(month).padStart(2, "0")}/${String(selectedDay).padStart(2, "0")}`);
    setCalendarOpen(false);
    onChange({ year, month, day: selectedDay });
  };

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
    setView("year");
  };

  const closeCalendar = () => {
    setCalendarOpen(false);
  };

  const handleNextYearPage = () => {
    if ((yearPage + 1) * yearsPerPage < years.length) {
      setYearPage((prev) => prev + 1);
    }
  };

  const handlePreviousYearPage = () => {
    if (yearPage > 0) {
      setYearPage((prev) => prev - 1);
    }
  };

  const calendarRef = useRef<HTMLDivElement>(null);

    const closeCalendarOnBlur = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.relatedTarget)) {
        setCalendarOpen(false);
    }
    };

    const getFirstDayOfMonth = (year: number | null, month: number | null): number | null => {
        if (!year || !month) return null;
        let firstDay = new Date(year, month - 1, 1).getDay(); // Get day of the week (0 = Sunday, 6 = Saturday)
        
        return firstDay === 0 ? 7 : firstDay; // Adjust Sunday to be at the end (Monday-based week)
      };
      
    //   const getPaddedDays = (year, month) => {
    //     const daysInMonth = getDaysInMonth(year, month); // Get total days
    //     const firstDay = getFirstDayOfMonth(year, month) || 7; // Adjust Sunday (0) to 7 for Monday-based week
    //     const paddedDays = Array.from({ length: firstDay - 1 }, () => null); // Empty slots for alignment
    //     const daysArray: number[] = Array.from(Array(daysInMonth), (_, i) => i + 1);
         
    //     return [...paddedDays, ...daysArray]; // Combine padded and actual days
    //   };
      
    const getPaddedDays = (year: number | null, month: number | null): (number | null)[] => {
        if (!year || !month) return []; // Return empty if no valid year/month
      
        const daysInMonth = new Date(year, month, 0).getDate(); // Get total days in the month
        const firstDay = getFirstDayOfMonth(year, month) ?? 7; // Ensure firstDay is always a number
      
        // Create an array of nulls for padding before the first day
        const paddedStart: (number | null)[] = Array.from({ length: Math.max(firstDay - 1, 0) }, () => null);
      
        // Create an array of days in the month
        const daysArray: number[] = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      
        // Add padding at the end to ensure a full grid
        const totalSlots = paddedStart.length + daysArray.length;
        const paddedEnd: (number | null)[] = Array.from(
          { length: totalSlots % 7 === 0 ? 0 : 7 - (totalSlots % 7) },
          () => null
        );
      
        return [...paddedStart, ...daysArray, ...paddedEnd];
      };

      const handleMonthChange = (change: number) => {
        if (month === null || year === null) return; // Ensure month and year are defined
      
        let newMonth = month + change;
        let newYear = year;
      
        if (newMonth < 1) {
          newMonth = 12;
          newYear -= 1; // Go to previous year
        } else if (newMonth > 12) {
          newMonth = 1;
          newYear += 1; // Go to next year
        }
      
        setMonth(newMonth);
        setYear(newYear);
        setDate(`${newYear}/${String(newMonth).padStart(2, "0")}`); // Update input field
        onChange({ year: newYear, month: newMonth, day: null }); // Reset day selection
      };
      
    useEffect(() => {
        const handleOutsideClick = (e) => {
          if (calendarRef.current && !calendarRef.current.contains(e.target)) {
            setCalendarOpen(false);
          }
        };
      
        document.addEventListener("mousedown", handleOutsideClick);
      
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, [calendarOpen]);

  return (
    <div style={{ position: "relative", maxWidth: "300px", margin: "0 auto" }}>
      {/* Text Input */}
      <input
        ref={inputRef}
        type="text"
        value={date}
        onChange={handleInputChange}
        placeholder="yyyy/mm/dd"
        onFocus={toggleCalendar}
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      />

      {/* Calendar Pop-Up */}
      {calendarOpen && (
        <div
        ref={calendarRef}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
            padding: "10px",
            width: "100%",
          }}
//           onBlur={closeCalendarOnBlur}
//   tabIndex={-1} // Allow div to be focusable
        >
          {view === "year" && (
            <div>
              <strong>Select Year</strong>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px" }}>
                {paginatedYears.map((y) => (
                  <button
                    key={y}
                    onClick={() => handleYearClick(y)}
                    style={{ padding: "5px", cursor: "pointer" }}
                  >
                    {y}
                  </button>
                ))}
              </div>
              {/* Paginator */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <button
                  onClick={handlePreviousYearPage}
                  disabled={yearPage === 0}
                  style={{
                    padding: "5px",
                    cursor: yearPage > 0 ? "pointer" : "not-allowed",
                    backgroundColor: yearPage > 0 ? "#007bff" : "#ccc",
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                  }}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextYearPage}
                  disabled={(yearPage + 1) * yearsPerPage >= years.length}
                  style={{
                    padding: "5px",
                    cursor: (yearPage + 1) * yearsPerPage < years.length ? "pointer" : "not-allowed",
                    backgroundColor: (yearPage + 1) * yearsPerPage < years.length ? "#007bff" : "#ccc",
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {view === "month" && (
            <div>
              <strong>Select Month</strong>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px" }}>
                {months.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => handleMonthClick(m.value)}
                    style={{ padding: "5px", cursor: "pointer" }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          )}

{view === "day" && (
  <div>
    <strong>Select Day</strong>

    {/* Month & Year Navigation */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
      <button
        onClick={() => handleMonthChange(-1)} // Move to previous month
        style={{ padding: "5px", cursor: "pointer" }}
      >
        ◀ Previous
      </button>

      <span style={{ fontWeight: "bold" }}>
        {year}/{String(month).padStart(2, "0")}
      </span>

      <button
        onClick={() => handleMonthChange(1)} // Move to next month
        style={{ padding: "5px", cursor: "pointer" }}
      >
        Next ▶
      </button>
    </div>

    {/* Day Names */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", marginTop: "10px" }}>
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dayName) => (
        <div
          key={dayName}
          style={{
            textAlign: "center",
            fontWeight: "bold",
            padding: "5px",
            backgroundColor: "#f0f0f0",
            borderRadius: "3px",
          }}
        >
          {dayName}
        </div>
      ))}
    </div>

    {/* Calendar Grid */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", marginTop: "5px" }}>
      {getPaddedDays(year, month).map((day, index) => (
        <button
          key={index}
          onClick={() => day && handleDayClick(day)}
          style={{
            padding: "5px",
            cursor: day ? "pointer" : "default",
            textAlign: "center",
            backgroundColor: day ? "#007bff" : "transparent",
            color: day ? "#fff" : "transparent",
            border: day ? "1px solid #ccc" : "none",
            borderRadius: "3px",
          }}
          disabled={!day}
        >
          {String(day || "")}
        </button>
      ))}
    </div>
  </div>
)}



        </div>
      )}
    </div>
  );
};

export default DatePicker;
