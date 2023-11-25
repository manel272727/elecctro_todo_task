import React, { useEffect, useRef, useState } from "react";
import Main from "../todo_components/Main";
import "./style_credentials.css";

const CredentialsCheck = () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const signUpLocalStorage = localStorage.getItem("signUp");
  const localEmail = localStorage.getItem("email");
  const localStorageName = localStorage.getItem("name");
  const localStoragePassword = localStorage.getItem("password");
  const [goTodo, setGoTodo] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (signUpLocalStorage) {
      setGoTodo(true);
    }
    if (localEmail) {
      setShow(true);
    }
  });

  const handleSignUp = () => {
    if (name.current.value && email.current.value && password.current.value) {
      localStorage.setItem("name", name.current.value);
      localStorage.setItem("email", email.current.value);
      localStorage.setItem("password", password.current.value);
      localStorage.setItem("signUp", email.current.value);
      window.location.reload();
    }
  };

  const handleSignIn=()=>{
    if(email.current.value === localEmail && password.current.value === localStoragePassword){
        localStorage.setItem("signUp", email.current.value)
        window.location.reload();
    }else{
        alert("Credenciais Inválidas")
    }
  }
  return (
    <div>
      {goTodo ? (
        <Main />
      ) : show ? (
        <div className="container">
          <h1>Olá {localStorageName}</h1>
          <div className="inputs">
            <input placeholder="email" type="email" ref={email} />
          </div>
          <div className="inputs">
            <input placeholder="password " type="password" ref={password} />
          </div>

          <button onClick={handleSignIn} type="submit">
            Login
          </button>
        </div>
      ) : (
        <div className="container">
          <h1>Registo</h1>
          <div className="inputs">
            <input placeholder="name" type="text" ref={name} />
          </div>
          <div className="inputs">
            <input placeholder="email" type="email" ref={email} />
          </div>
          <div className="inputs">
            <input placeholder="password " type="password" ref={password} />
          </div>

          <button onClick={handleSignUp} type="submit">
            Registar
          </button>
        </div>
      )}
    </div>
  );
};

export default CredentialsCheck;
