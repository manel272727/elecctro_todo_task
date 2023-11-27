import React, { useState } from "react";
import FormTodo from "./FormTodo";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodo from "./EditTodo";
import '../App.css'; 
import { Button } from "react-bootstrap";
uuidv4();

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false, createdAt: new Date().toLocaleString() },
    ]);
  };

  const doneTasks = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };


  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const logout = () => {
    localStorage.removeItem("signUp")
    window.location.reload()
  }
  const deleteAccount = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container-sm">
        <button onClick={logout} className="logout" >Logout</button>
        <button onClick={deleteAccount} className="delete">Delete Account</button>
        <h1 className="title">{localStorage.getItem("name")}, Welcome to Elecctro To Do List</h1>
        <Button onClick={toggleShowCompleted}>
          {showCompleted ? "Hide Completed" : "Ver todos"}
        </Button>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) =>
            (showCompleted || !todo.completed) ? (
              todo.isEditing ? (
                <EditTodo key={todo.id} editTodo={editTask} task={todo} />
              ) : (
                <Todo
                  key={todo.id}
                  task={todo}
                  markComplete={doneTasks}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  createdAt
                />
              )
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};


export default Main;
