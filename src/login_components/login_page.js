import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style_credentials.css";
import lockerTodoImage from "../assets/locker_todo.png";

const Login = ({ history }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password
      });
      if (response.status === 200) {
        navigate('/main'); 
      } else {
        setError("Credenciais Inválidas");
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 3000); 
      }
    } catch (error) {
      setError("Erro no Login");
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
      <h1 className="signup-name">Login</h1>
        <form onSubmit={handleLogin} className="form">
          <div className="form-group">
            <input
              id="email"
              type="email"
              ref={emailRef}
              placeholder="Email"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              id="password"
              type="password"
              ref={passwordRef}
              placeholder="Password"
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">Login</button>

          {showErrorAlert && (
            <div className="position-fixed bottom-0 start-0 p-3">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
        </form>
        <div className="register-link">
          <p>
            Ainda não tem conta? <Link to="/register" className="register">Registo</Link>
          </p>
        </div>
      </div>
      <div className="right-section">
        <h1>Elecctro To Do Notepad</h1>
        <img className="locker_icon" src={lockerTodoImage} alt="Locker Todo" />
        <p>Para aceder ao seu to-do list, inicie sessão ou faça o registo de uma nova conta caso ainda não tenha.</p>
      </div>
      </div>
    </>
  );
};

export default Login;