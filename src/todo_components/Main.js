import React, { useState, useEffect } from "react";
import FormTodo from "./FormTodo";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodo from "./EditTodo";
import '../App.css'; 
import { Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import the icons you need
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import CSSTransition and TransitionGroup


uuidv4();

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [fetchedTodos, setFetchedTodos] = useState([]);

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

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/data');
      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setTodos(data);
        setFetchedTodos(data);
      } else {
        const text = await response.text();
        console.error('Unexpected response format:', text);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  

  useEffect(() => {
    fetchTodos(); // Fetch todos when the component mounts
  }, []);

  const handleFetchTodos = () => {
    fetchTodos(); // Call the fetch function to retrieve todos when the button is clicked
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
    <div className="d-flex justify-content-center align-items-center ">
      <div className="container-sm">
        <div className="dropdown-wrapper">
          <Dropdown className="dropdown">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Options
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              <Dropdown.Item onClick={deleteAccount}>
                Delete Account
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <img
          className="logo-elecctro"
          src="https://elecctro.com/wp-content/uploads/thegem-logos/logo_a5dc58ba2877528bdcbe9d018b14ee0b_1x.png"
          alt="Elecctro Logo"
        />
        <div className="btn-show-all">
          <Button onClick={toggleShowCompleted}>
            {showCompleted ? (
              <>
                <FontAwesomeIcon icon={faEyeSlash} /> 
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faEye} /> 
              </>
            )}
          </Button>
        </div>
        <FormTodo addTodo={addTodo} />
        <TransitionGroup className="input-container">
          {todos.map((todo, index) =>
            showCompleted || !todo.completed ? (
              <CSSTransition key={todo.id} timeout={300} classNames="todo-item">
                {todo.isEditing ? (
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
                )}
              </CSSTransition>
            ) : null
          )}
        </TransitionGroup>
        <Button onClick={handleFetchTodos}>
              HERE TO FETCH   
        </Button>
        <div>
        <h2>Fetched Todos:</h2>
        <ul>
          {fetchedTodos.map(todo => (
            // <li key={todo.id}>{todo.task}</li>
            <li key={todo.id}>{todo.todo_body}</li>
          ))}
        </ul>
      </div>
      
      </div>
    </div>
  );
};


export default Main;
