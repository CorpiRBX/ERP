import React from "react";

interface DropdownSelectProps<T> {
  queryHook: ()=>{data?: T[]; isLoading:boolean; error?:unknown}
  getLabel: (option: T) => string;  // Cómo mostrar la opción en el dropdown
  getValue: (option: T) => string;
  onChange: (value: string) => void; // Manejar el cambio de selección
}

export function DropdownSelect<T>({ queryHook, getLabel, getValue, onChange }: DropdownSelectProps<T>) {
  const {data,isLoading,error} = queryHook();
  if(isLoading) return <p>Loading...</p>;
  if(error) return <p>Error loading data</p>;
  return (
    <div>
      {/* <label>{label}</label> */}
      <select onChange={(e) => onChange(e.target.value)}>
        <option value="">Seleccione...</option>
        {data?.map((option) => (
          <option key={getValue(option)} value={getValue(option)}>
            {getLabel(option)}
          </option>
        ))}
      </select>
    </div>
  );
}
