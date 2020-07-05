import React from "react";

const ContactInfoModal = ({
  contact,
  handleSubmit,
  handleDeleteContact,
  closeModal,
}) => {
  const handleCloseModal = (e) => {
    if (
      e.target.classList.contains("contactInfoModal__wrapper") ||
      e.target.classList.contains("contactInfoModal__cancel")
    ) {
      closeModal();
    }
  };
  return (
    <div className="contactInfoModal__wrapper" onClick={handleCloseModal}>
      <div className="contactInfoModal__content">
        <form className="contactInfoModal__form" onSubmit={handleSubmit}>
          <div className="contactInfoModal__field">
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={contact ? contact.name : ""}
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
            <button type="button" className="contactInfoModal__cancel">
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
