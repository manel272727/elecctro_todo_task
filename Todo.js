import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, markComplete, deleteTodo, editTodo }) => {
  const [isChecked, setIsChecked] = useState(task.completed);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    markComplete(task.id);
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label
          className={`form-check-label ${task.completed ? "completed" : ""}`}
          onClick={() => markComplete(task.id)}
        >
          {task.task}
        </label>
        <p>Created at: {task.createdAt}</p> {/* Display createdAt timestamp */}
      </div>

      <div className="d-flex align-items-center">
        <FontAwesomeIcon
          className="fa-3x"
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />

        

        <FontAwesomeIcon
          className="fa-3x"
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};

export default Todo;
