import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

const FormTodo = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo(value);
    setValue("");
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
        />
        
        <Button className="todo-btn"  variant="primary" type="submit">Adicionar</Button>
          
      </div>
    </form>
  );
};

export default FormTodo;
