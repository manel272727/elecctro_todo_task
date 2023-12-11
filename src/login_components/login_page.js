import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style_credentials.css";

const Login = ({ history }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed");
    }
  };

  return (
    <>
      <div className="container-login">
      <div className="form-section">
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
          {error && <p>{error}</p>}
        </form>
        <div className="register-link">
          <p>
            Don't have an account? <Link to="/register" className="register">Register</Link>
          </p>
        </div>
      </div>
      <div className="right-section">
        <h1>Elecctro To Do Notepad</h1>
      </div>
      </div>
    </>
  );
};

export default Login;