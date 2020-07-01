import React from "react";

const AddContactModal = ({ handleSubmit }) => {
  return (
    <>
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
  </>
  );
};

export default AddContactModal;
