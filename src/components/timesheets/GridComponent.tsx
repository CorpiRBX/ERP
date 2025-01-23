import React, { useState } from "react";
import "./GridComponent.css";

const GridComponent: React.FC = () => {
  const [showRow, setShowRow] = useState(true); // Estado para controlar la visibilidad de la segunda fila

  const toggleRow = () => {
    setShowRow((prev) => !prev); // Alterna la visibilidad
  };

  return (
    <div className="grid-container">
      {/* Fila 1: Botón */}
      <div className="grid-item full-width">
        <button onClick={toggleRow} className="toggle-button">
          {showRow ? "Ocultar segunda fila" : "Mostrar segunda fila"}
        </button>
      </div>

      {/* Fila 2: 6 columnas */}
      <div className={`grid-row ${showRow ? "show" : "hide"}`}>
        <div className="grid-item">Columna 1</div>
        <div className="grid-item">Columna 2</div>
        <div className="grid-item">Columna 3</div>
        <div className="grid-item">Columna 4</div>
        <div className="grid-item">Columna 5</div>
        <div className="grid-item">Columna 6</div>
      </div>
    </div>
  );
};

export default GridComponent;
