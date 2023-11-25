import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

const EditTodo = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();

    editTodo(value, task.id);
    setValue("");
  };
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div className="input-group mb-5">
        <input
          type="text"
          className="form-control"
          value={value}
          placeholder="Escreve aqui as tuas tarefas"
          onChange={(e) => setValue(e.target.value)}
        />
        
        <Button className="todo-btn"  variant="primary" type="submit">Editar</Button>
          
      </div>
    </form>
  );
};
export default EditTodo;
