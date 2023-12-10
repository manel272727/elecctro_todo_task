import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import '../App.css'; 

const FormTodo = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo_body: value }), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      // Get the newly added todo from the response
      const newTodo = await response.json();
      addTodo(newTodo); // Update the list of todos in Main component
      setValue("");      
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={value}
          placeholder="Escreve aqui as tuas tarefas"
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button
          className="circular-button" // Apply the circular-button class here
          onClick={handleButtonClick}
          type="submit"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </form>
  );
};

export default FormTodo;