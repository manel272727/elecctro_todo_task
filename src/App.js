// import React from 'react';
// import './App.css';
// import CredentialsCheck from './login_components/credentials_check';


// const  App = () => {


//   return (
//     <div className='App'>
//       <CredentialsCheck/>
//     </div>
//   );
// }

// export default App;

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
        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
};

export default App;
