import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './login_components/register_page';
import Login from './login_components/login_page';
import Main from './todo_components/Main';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
