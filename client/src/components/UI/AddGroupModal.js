import React from "react";
import "./AddContactModal.css";

const AddGroupModal = ({ handleClose, handleSubmit }) => {
	return (
        <div className="addContactModal__wrapper" onClick={handleClose}>
			<div className="addContactModal__content">
				<form className="addContactModal__form" onSubmit={handleSubmit}>
					<div>
                        <label htmlFor="groupName">Group Name: </label>
                        <input type="text" name="groupName" id="groupName" />
                        <h5>Add contacts</h5>
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

export default AddGroupModal;
