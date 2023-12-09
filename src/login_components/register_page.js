import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style_credentials.css";

const SignUp = ({ history }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

      // Handle the response accordingly
      if (response.status === 201) {
        // Registration successful, navigate to the main page
        navigate('/main'); // Replace '/main' with your main page route
      } else {
        // Handle other cases
        setError("Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      setError("Registration failed");
    }
  };

  return (
    <div className="container"> {/* Enclosing container */}
      <div className="signup-form">
        <h1 className="signup-name">Registo</h1>
        <form onSubmit={handleSignUp}>
          <div>
            <input className="fields" placeholder="Name" type="text" ref={nameRef} />
          </div>
          <div>
            <input className="fields" placeholder="Email" type="email" ref={emailRef} />
          </div>
          <div>
            <input className="fields" placeholder="Password" type="password" ref={passwordRef} />
          </div>
          <button type="submit">Register</button>
          {error && <p>{error}</p>}
        </form>
        <div className="register-link">
          <p>
            Have an account? <Link to="/" className="register">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
