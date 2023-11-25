import React from 'react';
import './App.css';
// import Main from './todo_components/Main';
import CredentialsCheck from './login_components/credentials_check';


const  App = () => {


  return (
    <div className='App'>
      <CredentialsCheck/>
     {/* <Main/> */}
    </div>
  );
}

export default App;
