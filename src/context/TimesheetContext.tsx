import React, { createContext, useState, ReactNode,useContext } from "react";

// Definir el enum
export enum TimesheetType {
 Undefined = -1,
  Trabajo = 1,
  Viaje = 2,
  Vacaciones = 3,
  Baja = 4,

}

// Definir el contexto
interface TimesheetTypeContext {
  timesheetType: TimesheetType | undefined;
  setTimesheetType: (type: TimesheetType | undefined) => void;
}

export const TimesheetContext = createContext<TimesheetTypeContext | undefined>(undefined);

export const TimesheetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timesheetType, setTimesheetType] = useState<TimesheetType | undefined>(undefined);

  return (
    <TimesheetContext.Provider value={{ timesheetType, setTimesheetType }}>
      {children}
    </TimesheetContext.Provider>
  );
};


// Hook para usar el contexto (opcional, mejora la legibilidad)
export const useTimesheet = () => {
  const context = useContext(TimesheetContext);
  if (!context) {
    throw new Error("useTimesheet debe usarse dentro de un TimesheetProvider");
  }
  return context;
};

export default TimesheetContext;