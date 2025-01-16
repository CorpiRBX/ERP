import React, { useState } from 'react';
    import Form from './Form';

    function App() {
      const [showForm, setShowForm] = useState(false);

      const handleOpenForm = () => {
        setShowForm(true);
      };

      const handleCloseForm = () => {
        setShowForm(false);
      };

      return (
        <div>
          <button onClick={handleOpenForm}>Open Form</button>
          {showForm && <Form onClose={handleCloseForm} />}
        </div>
      );
    }

    export default App;
