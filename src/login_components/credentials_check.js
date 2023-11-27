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

  const welcomeMessage = 'Bem-vindo ao Todo Electro, onde você pode organizar as suas ideias';
  const [typedMessage, setTypedMessage] = useState('');

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

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < welcomeMessage.length) {
        setTypedMessage((prevMessage) => prevMessage + welcomeMessage.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100); 
    return () => clearInterval(timer);
  }, [welcomeMessage]);


  
  return (
    <div>
      {goTodo ? (
        <Main />
      ) : show ? (
        <>
        <h1>{typedMessage}</h1>
        <div className="container">
          <form className="form" onSubmit={handleSignIn}>
            <div className="fields">
              <input placeholder="Email" type="email" ref={email} />
            </div>
            <div className="fields">
              <input placeholder="Password" type="password" ref={password} />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
        </>
      ) : (
        
        <div className="container">
          <form className="form" onSubmit={handleSignUp}>
          <h1>Registo</h1>
          <div className="fields">
            <input placeholder="name" type="text" ref={name} />
          </div>
          <div className="fields">
            <input placeholder="email" type="email" ref={email} />
          </div>
          <div className="fields">
            <input placeholder="password " type="password" ref={password} />
          </div>

          <button type="submit">Registar</button>
          </form>
        </div>
      )}

    </div>
    
  );
};

export default CredentialsCheck;
