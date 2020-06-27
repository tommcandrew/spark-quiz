import React from "react";
import "./GroupInfoModal.css";

const GroupInfoModal = ({
  group,
  setSelectedGroup,
  handleDeleteGroup,
  handleDeleteMember,
}) => {
  return (
    <div className="groupInfoModal__wrapper">
      <div className="groupInfoModal__content">
        <form className="groupInfoModal__form">
          <div className="groupInfoModal__field">
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={group.name}
            />
          </div>
          <div className="groupInfoModal__field">
            <ul>
              {group.contacts.map((contact, index) => (
                <li key={index} className="groupInfoModal__field">
                  <div>{contact.name}</div>
                  <span
                    className="groupInfoModal__delete"
                    onClick={() => handleDeleteMember(contact._id)}
                  >
                    &times;
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="groupInfoModal__buttons">
            <button type="button" onClick={() => setSelectedGroup(false)}>
              Cancel
            </button>
          </div>
          <button type="button" onClick={handleDeleteGroup}>
            Delete group
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupInfoModal;
