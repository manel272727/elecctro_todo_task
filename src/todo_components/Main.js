import React, { useState, useEffect } from "react";
import FormTodo from "./FormTodo";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import {Dropdown } from "react-bootstrap";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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
  const [sortOrder, setSortOrder] = useState("date");
  const navigate = useNavigate();
  const [insertSuccess, setInsertSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);


  const showInsertAlert = () => {
    setInsertSuccess(true);
    setTimeout(() => {
      setInsertSuccess(false);
    }, 3000);
  };

  const showErrorAlert = () => {
    setDeleteError(true);
    setTimeout(() => {
      setDeleteError(false);
    }, 3000);
  };


  
  const [selectedTodo, setSelectedTodo] = useState(null);

 
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/userData");
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
      const data = await response.json();
      setUserData(data);
  
      data.forEach((userDataItem) => {
        console.log(userDataItem);
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/data");
      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
  
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
      case "new-old":
        sortedTodos.sort((a, b) => new Date(b.createdat) - new Date(a.createdat));
        break;
      case "old-new":
        sortedTodos.sort((a, b) => new Date(a.createdat) - new Date(b.createdat));
        break;
      default:
        break;
    }
    setFetchedTodos(sortedTodos);
  };


  const handleSortSelection = (selectedOption) => {
    setSortOrder(selectedOption);
    sortTodos(selectedOption);
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
      showInsertAlert(); 
    } catch (error) {
      console.error("Error deleting todo:", error);
      showErrorAlert(); 
    }
  };

  const deleteAccount = async () => {
    try {
      if (userData.length > 0) {
        const userIdToDelete = userData[0].id;
        const response = await fetch(`http://localhost:3001/api/deleteAccount/${userIdToDelete}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error(`Failed to delete account: ${response.statusText}`);
        }
  
        navigate('/register');
      } else {
        console.error("No user data available to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
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
      
      let bodyData;
      if (isCompleted) {
        bodyData = JSON.stringify({ complete: null });
      } else {
        bodyData = JSON.stringify({ complete: !isCompleted });
      }
  
      const response = await fetch(`http://localhost:3001/api/todos/${todoId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyData,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update todo completion: ${response.statusText}`);
      }
  
      setCompletedTodos(
        isCompleted
          ? completedTodos.filter((id) => id !== todoId)
          : [...completedTodos, todoId]
      );

      fetchTodos()
    } catch (error) {
      console.error('Error updating todo completion:', error);
    }
  };
  
  


  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="container-sm">
        <div className="dropdown-wrapper">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <FontAwesomeIcon size="xl" icon={faArrowRightFromBracket} />
            </Dropdown.Toggle>

            <Dropdown.Menu className="exit-dropdown">
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              <Dropdown.Item onClick={deleteAccount}>
                Apagar Conta
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
          <button className="btn-gray" onClick={toggleShowCompleted}>
            {showCompleted ? (
              <>
                <FontAwesomeIcon icon={faEyeSlash} />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faEye} />
              </>
            )}
          </button>
        </div>
        <FormTodo
          addTodo={(newTodo) => setFetchedTodos([...fetchedTodos, newTodo])}
        />

        <div className="summary-label d-flex justify-content-between align-items-center">
          <Dropdown className="dropdown-sort">
            <Dropdown.Toggle variant="secondary" id="dropdown-sort">
              {sortOrder}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortSelection("A-Z")}>
                A-Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortSelection("Z-A")}>
                Z-A
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortSelection("new-old")}>
                New - Old
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortSelection("old-new")}>
                Old - New
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="completed-count">
            <p>{`${completedCount} de ${totalCount} completos`}</p>
          </div>
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

        <div className="position-fixed bottom-0 start-0 p-3">
        {insertSuccess && (
          <div className="alert alert-success" role="alert">
            Todo successfully deleted!
          </div>
        )}

        {deleteError && (
          <div className="alert alert-danger" role="alert">
            Error deleting todo!
          </div>
        )}
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
