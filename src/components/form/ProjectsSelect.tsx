import React, { useState } from 'react';
import { ProjectDto } from '../../Dtos/ProjectsDto';

interface ProjectSelectProps {
  projects: ProjectDto[]; // Lista de proyectos pasada como prop
  onProjectSelect: (selectedId: string | null) => void; // Callback para informar al padre sobre la selección
}

const ProjectSelect: React.FC<ProjectSelectProps> = ({ projects, onProjectSelect }) => {
  const [selectedProject, setSelectedProject] = useState<string>(''); // Para manejar el valor seleccionado

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value; // Obtén el valor seleccionado
    setSelectedProject(selectedId); // Actualiza el estado local
    onProjectSelect(selectedId); // Llama al callback con el valor seleccionado
  };

  return (
    <div className="select-container">
      <select
        id="project"
        className="form-select"
        value={selectedProject}
        onChange={handleProjectChange}
      >
        <option value="">Seleccione un Proyecto</option> {/* Opción por defecto */}

        {projects.map((project) => (
          <option key={project.id} value={project.id.toString()}>
            {project.projectName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelect;
