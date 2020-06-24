import React from "react";
import "./AddContactModal.css";

const AddContactModal = ({ handleClose, handleSubmit }) => {
  return (
    <div className="addContactModal__wrapper" onClick={handleClose}>
      <div className="addContactModal__content">
        <h1>Add Contact</h1>
        <form className="addContactModal__form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" id="email" />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;
