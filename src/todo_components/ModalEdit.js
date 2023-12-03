import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CardModal = ({ show, handleClose, todo }) => {
  const [editedTodoBody, setEditedTodoBody] = useState(todo.todo_body);

  const handleInputChange = (e) => {
    setEditedTodoBody(e.target.value);
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo_body: editedTodoBody }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to edit todo: ${response.statusText}`);
      }
  
      console.log('Todo updated successfully!');
      handleClose();
      window.location.reload(); ///THIS HAS TO BE CHANGED///
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTodoBody">
            <Form.Control
              type="text"
              value={editedTodoBody}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleEdit}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;
