import React, { useState } from 'react';
import { DepartmentsDto } from '../../Dtos/DepartmentsDto';

interface DepartmentSelectProps {
  departments: DepartmentsDto[]; // Lista de departamentos como prop
  onDepartmentSelect: (selectedId: string | null) => void; // Callback para enviar el valor seleccionado al padre
}

const DepartmentSelect: React.FC<DepartmentSelectProps> = ({ departments, onDepartmentSelect }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>(''); // Para manejar el valor seleccionado

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value; // Obtén el valor seleccionado
    setSelectedDepartment(selectedId); // Actualiza el estado local
    onDepartmentSelect(selectedId); // Llama al callback con el valor seleccionado
  };

  return (
    <div className="select-container">
      <select
        id="departamento"
        className="form-select"
        value={selectedDepartment}
        onChange={handleDepartmentChange}
      >
        <option value="">Seleccione un departamento</option> {/* Opción por defecto */}

        {departments.map((department) => (
          <option key={department.id} value={department.id.toString()}>
            {department.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentSelect;
