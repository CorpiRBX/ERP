import React, { useState } from "react";
import Form from "./Form";

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const state = "onsite";
  const isMobile = false;

  return (
    <div>
      <button onClick={handleOpenForm}>Open Form</button>
      {showForm && <Form onClose={handleCloseForm} state={state} isMobile={isMobile}/>}
    </div>
  );
}

export default App;
