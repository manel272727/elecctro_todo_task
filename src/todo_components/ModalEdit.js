import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import "../App.css"


const CardModal = ({ show, handleClose, todo }) => {
  const [editedTodoBody, setEditedTodoBody] = useState(todo.todo_body);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleInputChange = (e) => {
    setEditedTodoBody(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo_body: editedTodoBody, description: editedDescription }),
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
      <Modal.Header className="modal-title" closeButton>
  <FontAwesomeIcon icon={faInfoCircle} className="icon-info" />
  <Modal.Title>Info</Modal.Title>
</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
          <Form.Group controlId="formTodoBody">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={editedTodoBody}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editedDescription}
              onChange={handleDescriptionChange}
              className="col-12"
              style={{ width: "100%" }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleEdit}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;
