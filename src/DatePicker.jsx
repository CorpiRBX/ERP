import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'; // Asegúrate de importar format
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function DatePicker({ dateRange, onDateChange, onClose }) {
  const [selectedDates, setSelectedDates] = useState([]);

  // Función para obtener todos los días entre dos fechas
  const getDaysArray = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate)); // Agrega una copia de la fecha actual
      currentDate.setDate(currentDate.getDate() + 1); // Avanza al siguiente día
    }

    return dates;
  };

  // Manejar el cambio de fechas
  const handleDateChange = (item) => {
    const { startDate, endDate } = item.selection;

    // Si no hay un rango de fechas válido, no hacer nada
    if (!startDate || !endDate) {
      console.log('Fechas no seleccionadas');
      return;
    }

    // Obtén todos los días entre las dos fechas seleccionadas
    const daysArray = getDaysArray(startDate, endDate);

    // Formatea las fechas y actualiza el estado
    const formattedDays = daysArray.map(date => format(date, 'dd/MM/yyyy'));
    setSelectedDates(formattedDays);  // Actualizamos el estado con las fechas formateadas
  };

  // Manejar el clic en el botón "Select"
  const handleSelectClick = () => {
    console.log('Días seleccionados:', selectedDates);
    // Aquí podrías hacer cualquier otra acción, como pasar las fechas a un componente padre
    onClose();
  };

  return (
    <div className="calendar-popup" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <DateRange
        editableDateInputs={true}
        onChange={handleDateChange} // Usamos la nueva función handleDateChange
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
      />
      <button
        className="select-button"
        onClick={handleSelectClick}  // Llamamos a handleSelectClick al hacer clic en el botón
      >
        SELECT
      </button>
    </div>
  );
}

export default DatePicker;
