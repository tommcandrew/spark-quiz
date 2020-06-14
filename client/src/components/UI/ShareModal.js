import React, { useState } from "react";

const styles = {
  wrapper: {
    border: "1px solid #333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

//DUMMY DATA
const groups = [
  {
    name: "1A",
    members: [
      {
        name: "Sarah Smith",
        email: "sarah@gmail.com",
      },
      {
        name: "John Brown",
        email: "john@gmail.com",
      },
      {
        name: "Greg Wallace",
        email: "greg@gmail.com",
      },
    ],
  },
  {
    name: "1B",
    members: [
      {
        name: "Tim Rice",
        email: "tim@gmail.com",
      },
      {
        name: "Jennifer Baxter",
        email: "jennifer@gmail.com",
      },
      {
        name: "Mary O'Toole",
        email: "mary@gmail.com",
      },
      {
        name: "Aoife Flynn",
        email: "aoife@gmail.com",
      },
    ],
  },
  {
    name: "1C",
    members: [
      {
        name: "Harry Hill",
        email: "harry@gmail.com",
      },
      {
        name: "Roger Allam",
        email: "roger@gmail.com",
      },
    ],
  },
];

const contacts = [
  {
    name: "Harry Hill",
    email: "harry@gmail.com",
  },
  {
    name: "Roger Allam",
    email: "roger@gmail.com",
  },
  {
    name: "Tim Rice",
    email: "tim@gmail.com",
  },
  {
    name: "Jennifer Baxter",
    email: "jennifer@gmail.com",
  },
  {
    name: "Mary O'Toole",
    email: "mary@gmail.com",
  },
  {
    name: "Aoife Flynn",
    email: "aoife@gmail.com",
  },
  {
    name: "Sarah Smith",
    email: "sarah@gmail.com",
  },
  {
    name: "John Brown",
    email: "john@gmail.com",
  },
  {
    name: "Greg Wallace",
    email: "greg@gmail.com",
  },
  {
    name: "Sarah Smith",
    email: "sarah@gmail.com",
  },
  {
    name: "John Brown",
    email: "john@gmail.com",
  },
  {
    name: "Greg Wallace",
    email: "greg@gmail.com",
  },
];

const handleCloseModal = () => {
  //clear recipients from state and close modal
};

const ShareModal = () => {
  const [recipients, setRecipients] = useState([]);

  const handleaddGroup = (e) => {
    const selectedGroupName = e.target.value;
    const selectedGroup = groups.find(
      (group) => group.name === selectedGroupName
    );

    if (e.target.checked) {
      setRecipients([...recipients, selectedGroup]);
    } else {
      setRecipients(
        recipients.filter((recipient) => recipient.name !== selectedGroupName)
      );
    }
  };

  const handleAddContact = (e) => {
    const selectedContactName = e.target.value;
    const selectedContact = contacts.find(
      (contact) => contact.name === selectedContactName
    );

    if (e.target.checked) {
      setRecipients([...recipients, selectedContact]);
    } else {
      setRecipients(
        recipients.filter((recipient) => recipient.name !== selectedContactName)
      );
    }
  };

  const handleComplete = () => {
    if (recipients.length === 0) {
      alert("Please add a recipient");
    }
    //close modal but keep recipients in state until publishing quiz
  };

  return (
    <div style={styles.wrapper}>
      <h2>Share</h2>
      <div>
        {recipients &&
          recipients.length > 0 &&
          recipients.map((recipient, index) => (
            <span key={index}>{recipient.name}</span>
          ))}
      </div>

      <div>
        <h2>Groups</h2>
        <ul>
          {groups.map((group, index) => (
            <div key={index}>
              <label htmlFor={group.name}>{group.name}</label>
              <input
                type="checkbox"
                id={group.name}
                onChange={handleaddGroup}
                value={group.name}
              />
            </div>
          ))}
        </ul>
      </div>

      <div>
        <h2>Contacts</h2>
        <ul>
          {contacts.map((contact, index) => (
            <div key={index}>
              <label htmlFor={contact.name}>{contact.name}</label>
              <input
                type="checkbox"
                id={contact.name}
                onChange={handleAddContact}
                value={contact.name}
              />
            </div>
          ))}
        </ul>
      </div>

      <div>
        <button type="button" onClick={handleComplete}>
          Done
        </button>
        <button type="button" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
