import React, { useEffect, useState } from 'react';
import { getAllDepartments } from '../../services/Departments/DeparmentsServices';
import { DepartmentsDto } from '../../Dtos/DepartmentsDto';

const DepartmentSelect: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentsDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>(''); // Para manejar el valor seleccionado

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true); // Indicador de carga
        const data = await getAllDepartments();
        setDepartments(data); // Actualiza el estado con los departamentos obtenidos
      } catch (err) {
        setError('Error fetching departments'); // Maneja el error
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchDepartments(); // Llamamos a la función dentro del useEffect
  }, []); // [] asegura que solo se ejecute al montar el componente

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value); // Actualiza el estado con el valor seleccionado
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
        
        {loading && <option>Loading...</option>} {/* Mostrar mientras carga */}
        {error && <option disabled>{error}</option>} {/* Mostrar error si lo hay */}

        {!loading && !error && departments.map((department) => (
          <option key={department.id} value={department.id.toString()}>
            {department.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentSelect;
