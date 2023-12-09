// // import React, { useState, useEffect } from "react";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";


// // const Todo = ({ task, markComplete, deleteTodo, editTodo }) => {
// //   const [isChecked, setIsChecked] = useState(task.completed);
// //   const [todos, setTodos] = useState([]);

// //   const fetchTodos = async () => {
// //     try {
// //       const response = await fetch('http://localhost:3001/api/data');
// //       if (!response.ok) {
// //         throw new Error(`Failed to fetch todos: ${response.statusText}`);
// //       }
// //       const contentType = response.headers.get('content-type');
// //       if (contentType && contentType.includes('application/json')) {
// //         const data = await response.json();
// //         setTodos(data);
// //       } else {
// //         const text = await response.text();
// //         console.error('Unexpected response format:', text);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching todos:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchTodos(); // Fetch todos when the component mounts
// //   }, []);


// //   const handleCheckboxChange = () => {
// //     setIsChecked(!isChecked);
// //     markComplete(task.id);
// //   };

// //   const handleHideTodo = (id) => {
// //     setFetchedTodos(fetchedTodos.filter(todo => todo.id !== id));
// //   };

// //   return (
// //     <div className="d-flex align-items-center justify-content-between">
// //       <div className="form-check">
// //         <input
// //           type="checkbox"
// //           className="form-check-input"
// //           checked={isChecked}
// //           onChange={handleCheckboxChange}
// //         />
// //         <label
// //           className={`form-check-label ${task.completed ? "completed" : ""}`}
// //           onClick={() => markComplete(task.id)}
// //         >



// // {todos.map((todo) => (
// //           <li key={todo.id}>
// //             {todo.todo_body} 
// //               <FontAwesomeIcon
// //             className="fa-2x"
// //             icon={faPenToSquare}
// //             onClick={() => editTodo(task.id)}
// //           />
// //             <FontAwesomeIcon
// //           className="fa-2x"
// //           icon={faTrash}
// //           onClick={() => deleteTodo(task.id)}
// //         />
// //           </li>
// //         ))}





// //         </label>
// //         <p>Created at: {task.createdAt}</p> 
// //       </div>

// //       <div className="d-flex align-items-center m3">
// //         <FontAwesomeIcon
// //           className="fa-2x"
// //           icon={faPenToSquare}
// //           onClick={() => editTodo(task.id)}
// //         />

// //         <FontAwesomeIcon
// //           className="fa-2x"
// //           icon={faTrash}
// //           onClick={() => deleteTodo(task.id)}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Todo;

// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

// const Todo = ({ task, markComplete, deleteTodo, editTodo }) => {
//   const [isChecked, setIsChecked] = useState(task.completed);
//   const [todos, setTodos] = useState([]);

//   const fetchTodos = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/data');
//       if (!response.ok) {
//         throw new Error(`Failed to fetch todos: ${response.statusText}`);
//       }
//       const contentType = response.headers.get('content-type');
//       if (contentType && contentType.includes('application/json')) {
//         const data = await response.json();
//         setTodos(data);
//       } else {
//         const text = await response.text();
//         console.error('Unexpected response format:', text);
//       }
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTodos(); // Fetch todos when the component mounts
//   }, []);

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//     markComplete(task.id);
//   };

//   const handleHideTodo = (id) => {
//     // Logic for hiding the todo item
//     // You might need to adjust this based on your requirements
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-between">
//       <div className="form-check">
//         <input
//           type="checkbox"
//           className="form-check-input"
//           checked={isChecked}
//           onChange={handleCheckboxChange}
//         />
//         <label
//           className={`form-check-label ${task.completed ? "completed" : ""}`}
//           onClick={() => markComplete(task.id)}
//         >
//           {/* Render todos */}
//           {todos.map((todo) => (
//             <li key={todo.id}>
//               {todo.todo_body}
//               <FontAwesomeIcon
//                 className="fa-2x"
//                 icon={faPenToSquare}
//                 onClick={() => editTodo(task.id)}
//               />
//               <FontAwesomeIcon
//                 className="fa-2x"
//                 icon={faTrash}
//                 onClick={() => deleteTodo(task.id)}
//               />
//             </li>
//           ))}
//         </label>
//         <p>Created at: {task.createdAt}</p>
//       </div>

//       <div className="d-flex align-items-center m3">
//         <FontAwesomeIcon
//           className="fa-2x"
//           icon={faPenToSquare}
//           onClick={() => editTodo(task.id)}
//         />

//         <FontAwesomeIcon
//           className="fa-2x"
//           icon={faTrash}
//           onClick={() => deleteTodo(task.id)}
//         />
//       </div>
//     </div>
//   );
// };

// export default Todo;
