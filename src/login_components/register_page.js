import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style_credentials.css";
import lockerTodoImage from "../assets/register_todo.png";

const SignUp = ({ history }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        username: name,
        email,
        password
      });

      if (response.status === 201) {
        navigate('/main'); 
      } else {
        setError("Erro no Registo");
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 3000); 
      }
    } catch (error) {
      setError("Erro no Registo");
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
    }
  };


  return (
    <>
      <div className="container-login">
        <div className="form-section">
          <div className="signup-form">
            <h1 className="signup-name">Registo</h1>
            <form onSubmit={handleSignUp} className="form">
              <div className="form-group">
                <input
                  className="input-field fields"
                  placeholder="Name"
                  type="text"
                  ref={nameRef}
                />
              </div>
              <div className="form-group">
                <input
                  className="input-field fields"
                  placeholder="Email"
                  type="email"
                  ref={emailRef}
                />
              </div>
              <div className="form-group">
                <input
                  className="input-field fields"
                  placeholder="Password"
                  type="password"
                  ref={passwordRef}
                />
              </div>
              <button type="submit" className="submit-button">
                Registar
              </button>
            </form>
            <div className="register-link">
              <p>
                Já tem conta? <Link to="/" className="register">Login</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="right-section">
          <h1>Bem-Vindo ao Elecctro To Do </h1>
          <p>Este é um portal onde pode organizar as suas tarefas.</p>
          <img
            className="locker_icon"
            src={lockerTodoImage}
            alt="Locker Todo"
          />
          <p>
            Crie aqui uma nova conta para organizar a sua vida.
          </p>
        </div>
        {showErrorAlert && (
            <div className="position-fixed bottom-0 start-0 p-3">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default SignUp;
