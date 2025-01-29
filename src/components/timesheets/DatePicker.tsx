import React, { useState, useRef, useEffect } from "react";
import "./DatePicker.css";

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
    handleDateChange(newYear, newMonth, newDay); // Pass the new values directly
  };
  
  const handleDateChange = (newYear: number | null, newMonth: number | null, newDay: number | null) => {
    if (newYear && newMonth && newDay) {
      const dateObj = new Date(newYear, newMonth - 1, newDay); // Create a valid Date object
      const dateString = getStringDate(newYear, newMonth, newDay);
      console.log('getStringDate() anyo, mes y dia', dateString);
      console.log('dateObj. newYear && newMonth && newDay', dateObj);
      onChange(dateString);
    } 
    else if (newYear && newMonth) {
      const dateObj = new Date(newYear, newMonth - 1); // Create a valid Date object
      const dateString = getStringDate(newYear, newMonth, newDay);
      console.log('dateObjgetMonth. newYear && newMonth', dateObj.getMonth());
      console.log('getStringDate() anyo y mes', dateString);
      onChange(dateString);
    }
    else if (newYear) {
      const dateObj = new Date(newYear); // Create a valid Date object
      const dateString = getStringDate(newYear, newMonth, newDay);
      console.log('dateObjgetMonth. newYear', dateObj.getMonth());
      console.log('getStringDate() anyo', dateString);
      onChange(dateString);
    } else {
      onChange(null); // Invalid or partial date
    }
  };
  
  const handleInputChange = (e) => {
    // console.log('eeeeeeeeeeee', e);
    const value = e.target.value;
    // console.log('valueeeeeeeeeeeee', value);
    setDate(value);
    const [newYear, newMonth, newDay] = value.split("/").map(Number);
    setYear(newYear || null);
    setMonth(newMonth || null);
    setDay(newDay || null);
    handleDateChange(newYear || null, newMonth || null, newDay || null); // Pass the parsed values directly
  };
  
  const handleYearClick = (selectedYear) => {
    setYear(selectedYear);
    setDate(`${selectedYear}`);
    setView("month");
    console.log('handleYearClick newYear', selectedYear);
    handleDateChange(selectedYear, null, null); // Pass the new values directly
  };
  
  const handleMonthClick = (selectedMonth) => {
    const newYear = year;
    setMonth(selectedMonth);
    setDate(`${newYear}/${String(selectedMonth).padStart(2, "0")}`);
    setView("day");
    console.log('handleMonthClick newYear', newYear);
    console.log('handleMonthClick selectedMonth', selectedMonth);
    handleDateChange(newYear, selectedMonth, null); // Pass the new values directly
  };
  
  const handleDayClick = (selectedDay) => {
    const newYear = year;
    const newMonth = month;
    setDay(selectedDay);
    setCalendarOpen(false);
    setDate(`${newYear}/${String(newMonth).padStart(2, "0")}/${String(selectedDay).padStart(2, "0")}`);
    console.log('handleDayClick newYear', newYear);
    console.log('handleDayClick newMonth', newMonth);
    console.log('handleDayClick selectedDay', selectedDay);
    handleDateChange(newYear, newMonth, selectedDay); // Pass the new values directly
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
    handleDateChange(newYear, newMonth, day);
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

  const getStringDate2 = (date) => {
    var year;
    var month;
    var day;
    if(date)
    {
      month = '' + (date.getMonth() + 1);
      day = '' + date.getDate();
      year = date.getFullYear();
    }

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;

    return [year, month, day].join('/');
  }

  const getStringDate = (year: number | null, month: number | null, day: number | null): string => {
    if (!year)
    {
      console.log('getStringDate function !year');
      return ""; // Si no hay año, devolver cadena vacía
    } 

    let dateString = `${year}`;

    if (month !== null) {
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        dateString += `/${formattedMonth}`;
    }

    if (day !== null) {
        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        dateString += `/${formattedDay}`;
    }

    console.log('getStringDate dateString', dateString);
    return dateString;
};

  return (
    <div className="date-picker">
      <input
        ref={inputRef}
        type="text"
        value={date}
        onChange={handleInputChange}
        placeholder="yyyy/mm/dd"
        onFocus={toggleCalendar}
        className="date-picker-input"
      />

      {calendarOpen && (
        <div ref={calendarRef} className="date-picker-calendar">
          {view === "year" && (
            <>
              <div className="date-picker-nav">
                <button onClick={() => setCalendarOpen(false)}>⬅ Back</button>
                <button onClick={setToday}>Today</button>
              </div>
              <div className="date-picker-nav">
                <button onClick={handlePreviousYearPage} disabled={yearPage === 0}>◀ Prev</button>
                <span>{paginatedYears[paginatedYears.length - 1]} - {paginatedYears[0]}</span>
                <button onClick={handleNextYearPage} disabled={(yearPage + 1) * 16 >= years.length}>Next ▶</button>
              </div>
              <div className="date-picker-grid year">
                {paginatedYears.map((y) => (
                  <button key={y} onClick={() => handleYearClick(y)}>{y}</button>
                ))}
              </div>
            </>
          )}
          {view === "month" && (
            <>
              <div className="date-picker-nav">
                <button onClick={() => setView("year")}>⬅ Back</button>
                <button onClick={setToday}>Today</button>
              </div>
              <div className="date-picker-nav">
                <button onClick={() => handleMonthChange(-1)}>◀ Prev</button>
                <span>{year}</span>
                <button onClick={() => handleMonthChange(1)}>Next ▶</button>
              </div>
              <div className="date-picker-grid month">
                {months.map((m) => (
                  <button key={m.value} onClick={() => handleMonthClick(m.value)}>{m.label}</button>
                ))}
              </div>
            </>
          )}
          {view === "day" && (
            <>
              <div className="date-picker-nav">
                <button onClick={() => setView("month")}>⬅ Back</button>
                <button onClick={setToday}>Today</button>
              </div>
              <div className="date-picker-nav">
                <button onClick={() => handleMonthChange(-1)}>◀ Prev</button>
                <span>{year}/{String(month).padStart(2, "0")}</span>
                <button onClick={() => handleMonthChange(1)}>Next ▶</button>
              </div>
              <div className="date-picker-day-names">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dayName) => (
                  <div key={dayName}>{dayName}</div>
                ))}
              </div>
              <div className="date-picker-grid day">
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
