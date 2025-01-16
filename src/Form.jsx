import React from 'react';
    import './Form.css';

    function Form({ onClose }) {
      const handleSubmit = (event) => {
        event.preventDefault();
        onClose();
      };

      return (
        <div className="form-overlay">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h2 className="form-title">FICHAJE</h2>
              <div className="form-box"></div>
              <label className="form-label">OFICINAS</label>
              <div className="form-group">
                <label htmlFor="departamento" className="form-group-label">DEPARTAMENTO</label>
                <div className="select-container">
                  <select id="departamento" className="form-select">
                    <option value="rrhh">RRHH</option>
                    <option value="it">IT</option>
                    <option value="marketing">Marketing</option>
                    <option value="ventas">Ventas</option>
                  </select>
                  <div className="select-arrow"></div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="proyecto" className="form-group-label">PROYECTO</label>
                <div className="select-container">
                  <select id="proyecto" className="form-select">
                    <option value="proyecto1">Proyecto 1</option>
                    <option value="proyecto2">Proyecto 2</option>
                    <option value="proyecto3">Proyecto 3</option>
                    <option value="proyecto4">Proyecto 4</option>
                  </select>
                  <div className="select-arrow"></div>
                </div>
              </div>
              <label className="form-group-label">OBSERVACIONES</label>
              <div className="form-box-text">
                <textarea id="observaciones" className="form-textarea"></textarea>
              </div>
              <div className="button-group">
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Close</button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    export default Form;
