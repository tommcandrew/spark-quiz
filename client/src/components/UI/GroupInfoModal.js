import React from "react";
import "./GroupInfoModal.css";

const GroupInfoModal = ({
  selectedGroup,
  setSelectedGroupId,
  handleDeleteGroup,
  handleDeleteMember,
  user,
  handleUpdateGroup,
  handleAddMember,
}) => {
  let groupMembers = [];
  selectedGroup.contacts.forEach((contact) => {
    groupMembers.push(contact._id);
  });
  let nonGroupContacts = user.contacts.filter(
    (contact) => !groupMembers.includes(contact._id)
  );

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
              defaultValue={selectedGroup.name}
            />
          </div>
          <div className="groupInfoModal__field">
            <ul>
              {selectedGroup.contacts.map((contact, index) => (
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
            <button type="button" onClick={() => setSelectedGroupId(null)}>
              Cancel
            </button>
          </div>
          <button type="button" onClick={handleDeleteGroup}>
            Delete group
          </button>
        </form>
        <form>
          <h2>Add member to group</h2>
          {nonGroupContacts &&
            nonGroupContacts.map((contact) => (
              <div key={contact._id}>
                <label htmlFor={contact.name}>{contact.name}</label>
                <input
                  type="checkbox"
                  onChange={handleAddMember}
                  value={contact._id}
                />
              </div>
            ))}
        </form>
        <button onClick={handleUpdateGroup}>Done</button>
      </div>
    </div>
  );
};

export default GroupInfoModal;
