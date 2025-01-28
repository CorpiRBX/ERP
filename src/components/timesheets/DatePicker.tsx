import React, { useState, useRef, useEffect } from "react";

const DatePicker = ({ onChange }) => {
  const [date, setDate] = useState("");
  const [year, setYear] = useState<number | null>(new Date().getFullYear());
  const [month, setMonth] = useState<number | null>(new Date().getMonth() + 1);
  const [day, setDay] = useState<number | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [view, setView] = useState("year");
  const [yearPage, setYearPage] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const paginatedYears = years.slice(yearPage * 16, (yearPage + 1) * 16);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ].map((label, index) => ({ value: index + 1, label }));

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleCalendar = () => {
    if (calendarOpen) return setCalendarOpen(false);

    const parts = date.split("/").map(Number);
    const [newYear, newMonth, newDay] = parts;

    if (newYear && newMonth && newDay) {
      setYear(newYear);
      setMonth(newMonth);
      setDay(newDay);
      setView("day");
    } else if (newYear && newMonth) {
      setYear(newYear);
      setMonth(newMonth);
      setView("day");
    } else if (newYear) {
      setYear(newYear);
      setView("month");
    } else {
      setYearPage(0);
      setView("year");
    }

    setCalendarOpen(true);
  };

  const setToday = () => {
    const today = new Date();
    const newYear = today.getFullYear();
    const newMonth = today.getMonth() + 1;
    const newDay = today.getDate();

    setYear(newYear);
    setMonth(newMonth);
    setDay(newDay);
    setDate(`${newYear}/${String(newMonth).padStart(2, "0")}/${String(newDay).padStart(2, "0")}`);
    setView("day");
    setCalendarOpen(false);
    onChange({ year: newYear, month: newMonth, day: newDay });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDate(value);
    const [newYear, newMonth, newDay] = value.split("/").map(Number);
    setYear(newYear || null);
    setMonth(newMonth || null);
    setDay(newDay || null);
    onChange({ year: newYear, month: newMonth, day: newDay });
  };

  const handleYearClick = (selectedYear) => {
    setYear(selectedYear);
    setView("month");
    setDate(`${selectedYear}`);
    onChange({ year: selectedYear, month: null, day: null });
  };

  const handleMonthClick = (selectedMonth) => {
    setMonth(selectedMonth);
    setView("day");
    setDate(`${year}/${String(selectedMonth).padStart(2, "0")}`);
    onChange({ year, month: selectedMonth, day: null });
  };

  const handleDayClick = (selectedDay) => {
    setDay(selectedDay);
    setCalendarOpen(false);
    setDate(`${year}/${String(month).padStart(2, "0")}/${String(selectedDay).padStart(2, "0")}`);
    onChange({ year, month, day: selectedDay });
  };

  const handleMonthChange = (change) => {
    if (!month || !year) return;
    let newMonth = month + change;
    let newYear = year;

    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    setMonth(newMonth);
    setYear(newYear);
    setDate(`${newYear}/${String(newMonth).padStart(2, "0")}`);
    onChange({ year: newYear, month: newMonth, day: null });
  };

  const handlePreviousYearPage = () => {
    if (yearPage > 0) setYearPage((prev) => prev - 1);
  };

  const handleNextYearPage = () => {
    if ((yearPage + 1) * 16 < years.length) setYearPage((prev) => prev + 1);
  };

  const getPaddedDays = (year, month) => {
    if (!year || !month) return [];
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay() || 7;
    const paddedStart = Array.from({ length: firstDay - 1 }, () => null);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const paddedEnd = Array.from({ length: (7 - (paddedStart.length + daysArray.length) % 7) % 7 }, () => null);
    return [...paddedStart, ...daysArray, ...paddedEnd];
  };

  return (
    <div style={{ position: "relative", maxWidth: "300px", margin: "0 auto" }}>
      <input
        ref={inputRef}
        type="text"
        value={date}
        onChange={handleInputChange}
        placeholder="yyyy/mm/dd"
        onFocus={toggleCalendar}
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      />

      {calendarOpen && (
        <div ref={calendarRef} style={{ position: "absolute", top: "100%", left: 0, background: "#fff", border: "1px solid #ccc", borderRadius: "5px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", zIndex: 10, padding: "10px", width: "100%" }}>
          {view === "year" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <button onClick={() => setCalendarOpen(false)}>⬅ Back</button>
                <button onClick={setToday}>Today</button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <button onClick={handlePreviousYearPage} disabled={yearPage === 0}>◀ Prev</button>
                <span>{paginatedYears[paginatedYears.length - 1]} - {paginatedYears[0]}</span>
                <button onClick={handleNextYearPage} disabled={(yearPage + 1) * 16 >= years.length}>Next ▶</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px" }}>
                {paginatedYears.map((y) => (
                  <button key={y} onClick={() => handleYearClick(y)}>{y}</button>
                ))}
              </div>
            </>
          )}
          {view === "month" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <button onClick={() => setView("year")}>⬅ Back</button>
                <button onClick={setToday}>Today</button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <button onClick={() => handleMonthChange(-1)}>◀ Prev</button>
                <span>{year}</span>
                <button onClick={() => handleMonthChange(1)}>Next ▶</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px" }}>
                {months.map((m) => (
                  <button key={m.value} onClick={() => handleMonthClick(m.value)}>{m.label}</button>
                ))}
              </div>
            </>
          )}
          {view === "day" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <button onClick={() => setView("month")}>⬅ Back</button>
                <button onClick={setToday}>Today</button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <button onClick={() => handleMonthChange(-1)}>◀ Prev</button>
                <span>{year}/{String(month).padStart(2, "0")}</span>
                <button onClick={() => handleMonthChange(1)}>Next ▶</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dayName) => (
                  <div key={dayName} style={{ textAlign: "center", fontWeight: "bold" }}>{dayName}</div>
                ))}
                {getPaddedDays(year, month).map((day, index) => (
                  <button key={index} onClick={() => day && handleDayClick(day)} disabled={!day}>
                    {day || ""}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
