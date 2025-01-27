import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../../services/Projects/ProjectServices';
import { ProjectDto } from '../../Dtos/ProjectsDto';

const ProjectSelect: React.FC = () => {
  const [projects, setDepartments] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string>(''); // Para manejar el valor seleccionado

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true); // Indicador de carga
        const data = await getAllProjects();
        setDepartments(data); // Actualiza el estado con los departamentos obtenidos
      } catch (err) {
        setError('Error fetching projects'); // Maneja el error
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchProjects(); // Llamamos a la función dentro del useEffect
  }, []); // [] asegura que solo se ejecute al montar el componente

  const handleProjecttChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(e.target.value); // Actualiza el estado con el valor seleccionado
  };

  return (
    <div className="select-container">
      <select
        id="departamento"
        className="form-select"
        value={selectedProject}
        onChange={handleProjecttChange}
      >
        <option value="">Seleccione un Projecto</option> {/* Opción por defecto */}
        
        {loading && <option>Loading...</option>} {/* Mostrar mientras carga */}
        {error && <option disabled>{error}</option>} {/* Mostrar error si lo hay */}

        {!loading && !error && projects.map((project) => (
          <option key={project.id} value={project.id.toString()}>
            {project.projectName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelect;
