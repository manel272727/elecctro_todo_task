import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
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

      addTodo(value);
      setValue("");      
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    handleSubmit();
    window.location.reload(); ///THIS HAS TO BE CHANGED///
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
        <Button
          className="todo-btn"
          variant="primary"
          onClick={handleButtonClick}
          type="submit"
        >
          Adicionar
        </Button>
      </div>
    </form>
  );
};

export default FormTodo;
