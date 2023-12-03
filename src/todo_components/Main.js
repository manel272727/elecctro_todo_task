import React, { useState, useEffect } from "react";
import FormTodo from "./FormTodo";
import { v4 as uuidv4 } from "uuid";
import '../App.css'; 
import { Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

uuidv4();

const Main = () => {
  const [fetchedTodos, setFetchedTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/data');
      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
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

  const deleteTodo = async (id) => {
    // Implement logic to delete the todo using API call
    // Update the UI by filtering out the deleted todo
    setFetchedTodos(fetchedTodos.filter(todo => todo.id !== id));
  };

  const editTodo = async (id) => {
    // Implement logic to edit the todo using API call
    // Update the UI if necessary after editing
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
        <FormTodo />
        <TransitionGroup className="input-container">
          <div className="todo-cards">
            {fetchedTodos.map((todo) => (
              <CSSTransition key={todo.id} timeout={500} classNames="card">
                <div className="card">
                  <label>
                    {todo.todo_body}
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={() => editTodo(todo.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteTodo(todo.id)}
                    />
                  </label>
                </div>
              </CSSTransition>
            ))}
          </div>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Main;
