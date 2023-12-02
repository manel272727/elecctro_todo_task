// import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
// import '../App.css'; 

// const FormTodo = ({ addTodo }) => {
//   const [value, setValue] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3001/api/todos', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ todo_body: value }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add todo');
//       }

//       // If successful, add the todo locally to update UI
//       addTodo(value);
//       setValue("");
//     } catch (error) {
//       console.error('Error adding todo:', error);
//       // Handle error scenario (show error message, etc.)
//     }
//   };

//   return (
//     <form className="TodoForm" onSubmit={handleSubmit}>
//       <div className="input-group mb-3">
//         <input
//           type="text"
//           className="form-control"
//           value={value}
//           placeholder="Escreve aqui as tuas tarefas"
//           onChange={(e) => setValue(e.target.value)}
//           required
//         />
//         <Button className="todo-btn"  variant="primary" type="submit">Adicionar</Button>
//       </div>
//     </form>
//   );
// };

// export default FormTodo;

import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import '../App.css'; 

const FormTodo = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo_body: value }), // Send the todo_body property
      });
  
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      // If successful, add the todo locally to update UI
      addTodo(value);
      setValue("");
    } catch (error) {
      console.error('Error adding todo:', error);
      // Handle error scenario (show error message, etc.)
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={value}
          placeholder="Escreve aqui as tuas tarefas"
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <Button
          className="todo-btn"
          variant="primary"
          onClick={handleButtonClick} // Call handleButtonClick when clicked
          type="submit"
        >
          Adicionar
        </Button>
      </div>
    </form>
  );
};

export default FormTodo;
