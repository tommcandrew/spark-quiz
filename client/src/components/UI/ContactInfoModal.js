import React from "react";
import "./ContactinfoModal.css";

const ContactInfoModal = ({
  contact,
  handleSubmit,
  setSelectedContact,
  handleDeleteContact,
}) => {
  return (
    <div className="contactInfoModal__wrapper">
      <div className="contactInfoModal__content">
        <form className="contactInfoModal__form" onSubmit={handleSubmit}>
          <div className="contactInfoModal__field">
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={contact.name}
            />
          </div>
          <div className="contactInfoModal__field">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={contact.email}
            />
          </div>
          <div className="contactInfoModal__buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setSelectedContact(false)}>
              Cancel
            </button>
          </div>
          <button type="button" onClick={handleDeleteContact}>
            Delete Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactInfoModal;
