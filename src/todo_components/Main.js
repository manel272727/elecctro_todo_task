import React, { useState, useEffect } from "react";
import FormTodo from "./FormTodo";
import { v4 as uuidv4 } from "uuid";
import '../App.css'; 
import { Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CardModal from "./ModalEdit"; 


uuidv4();

const Main = () => {
  const [fetchedTodos, setFetchedTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState(null);




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
    fetchTodos(); 
  }, []);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.statusText}`);
      }
  
      setFetchedTodos(fetchedTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
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


  const openModal = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setShowModal(false);
  };

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
          <div className="todo-cards" >
            {fetchedTodos.map((todo) => (
              <>
              <CSSTransition key={todo.id} timeout={500} classNames="card">
                <div className="card-container">
                  <div className="card" onClick={() => openModal(todo)}>
                    <label>{todo.todo_body}</label>
                    <label>{new Date(todo.createdat).toLocaleString('pt-PT')}</label>
                  </div>
                  <div className="delete-icon">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteTodo(todo.id)}
                    />
                  </div>
                </div>
              </CSSTransition>

               <div>
                <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteTodo(todo.id)}
                    />
                </div> 
                </>
            ))}
          </div>
        </TransitionGroup>
        {selectedTodo && (
        <CardModal
          show={showModal}
          handleClose={closeModal}
          todo={selectedTodo}
        />
      )}
      </div>
    </div>
  );
};

export default Main;
