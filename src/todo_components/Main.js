import React, { useState, useEffect } from "react";
import FormTodo from "./FormTodo";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import { Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import CardModal from "./ModalEdit";
import { useNavigate } from "react-router-dom";

uuidv4();

const Main = () => {
  const [fetchedTodos, setFetchedTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [sortOrder, setSortOrder] = useState("date"); // Default sort order by date
  const navigate = useNavigate();

  
  const [selectedTodo, setSelectedTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/data");
      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
  
        // Sort todos by date (newest to oldest)
        const sortedTodos = data.sort((a, b) => {
          return new Date(b.createdat) - new Date(a.createdat);
        });
  
        setFetchedTodos(sortedTodos);
  
        const completed = sortedTodos.filter((todo) => todo.complete);
        setCompletedTodos(completed.map((todo) => todo.id));
      } else {
        const text = await response.text();
        console.error("Unexpected response format:", text);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };


  const sortTodos = (order) => {
    let sortedTodos = [...visibleTodos];
    switch (order) {
      case "A-Z":
        sortedTodos.sort((a, b) =>
          a.todo_body.localeCompare(b.todo_body, "en", { sensitivity: "base" })
        );
        break;
      case "Z-A":
        sortedTodos.sort((a, b) =>
          b.todo_body.localeCompare(a.todo_body, "en", { sensitivity: "base" })
        );
        break;
      case "date":
        sortedTodos.sort((a, b) => new Date(b.createdat) - new Date(a.createdat));
        break;
      default:
        break;
    }
    setFetchedTodos(sortedTodos);
  };



  const handleSort = () => {
    switch (sortOrder) {
      case "A-Z":
        sortTodos("Z-A");
        setSortOrder("Z-A");
        break;
      case "Z-A":
        sortTodos("date");
        setSortOrder("date");
        break;
      case "date":
        sortTodos("A-Z");
        setSortOrder("A-Z");
        break;
      default:
        break;
    }
  };




  

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.statusText}`);
      }

      setFetchedTodos(fetchedTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const completedCount = completedTodos.length;
  const totalCount = fetchedTodos.length;


  const visibleTodos = showCompleted
    ? fetchedTodos
    : fetchedTodos.filter((todo) => !completedTodos.includes(todo.id));


    const logout = () => {
      navigate('/');
    };

    const deleteAccount = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/deleteAccount", {
          method: "DELETE",
          // Optionally, include any necessary headers or credentials here
        });
    
        if (!response.ok) {
          throw new Error(`Failed to delete account: ${response.statusText}`);
        }
    
        // Clear any stored user data or tokens from the client-side
    
        // Perform necessary actions after successful deletion
        navigate('/');
        // window.location.href = "/login"; // Redirect to the login page
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    };

  const openModal = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setShowModal(false);
  };


  const handleTodoCompletion = async (todoId) => {
    try {
      const isCompleted = completedTodos.includes(todoId);
  
      const response = await fetch(`http://localhost:3001/api/todos/${todoId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complete: !isCompleted }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update todo completion: ${response.statusText}`);
      }
  
      setCompletedTodos(
        isCompleted
          ? completedTodos.filter((id) => id !== todoId)
          : [...completedTodos, todoId]
      );
    } catch (error) {
      console.error('Error updating todo completion:', error);
    }
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
        <div className="summary-label">
          <Button onClick={handleSort}>Sort</Button>
          <p>{`${completedCount} de ${totalCount} completos`}</p>
        </div>
        <div className="card-radio-container">
          <TransitionGroup className="input-container">
            <div className="todo-cards">
              {visibleTodos.map((todo) => (
                <CSSTransition key={todo.id} timeout={500} classNames="card">
                  <div className="card-container">
                    <div className="radio-button">
                      <input
                        type="checkbox"
                        checked={completedTodos.includes(todo.id)}
                        onChange={() => handleTodoCompletion(todo.id)}
                      />
                    </div>
                    <div className="card" onClick={() => openModal(todo)}>
                      <div className="card-content">
                        <div className="todo-body">{todo.todo_body}</div>
                        <div className="todo-separator">|</div>
                        <div className="todo-dates">
                          <label>
                            created at:{" "}
                            {new Date(todo.createdat).toLocaleString("pt-PT")}
                          </label>
                          <label>
                            finished at:{" "}
                            {new Date(todo.createdat).toLocaleString("pt-PT")}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      className="delete-icon"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <FontAwesomeIcon
                        className="radio-button"
                        size="xl"
                        icon={faTrash}
                      />
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </div>
          </TransitionGroup>
        </div>

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
