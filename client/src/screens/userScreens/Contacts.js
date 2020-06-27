import React, { useState } from "react";
import AddContactModal from "../../components/UI/AddContactModal";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/actions/userActions";
import "./Contacts.css";
import ContactInfoModal from "../../components/UI/ContactInfoModal";

const Contacts = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const handleClose = (e) => {
    if (e.target.classList.contains("addContactModal__wrapper")) {
      setShowAddContactModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    dispatch(userActions.addContact({ name, email }));
    e.target.reset();
    setShowAddContactModal(false);
    setSelectedContact(null);
  };

  const handleDeleteContact = () => {
    dispatch(userActions.deleteContact(selectedContact._id));
    setSelectedContact(null);
  };

  const handleUpdateContact = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updatedContact = { name, email };
    dispatch(userActions.updateContact(selectedContact._id, updatedContact));
    setShowAddContactModal(false);
    setSelectedContact(null);
  };

  return (
    <div className="contacts__wrapper">
      <h1 className="contacts__title">Contacts</h1>
      <div className="contacts__content">
        <div>
          <input type="text" placeholder="Search" />
        </div>
        <div className="contacts__contacts">
          {user &&
            user.contacts &&
            user.contacts.map((contact, index) => (
              <div
                key={index}
                className="contacts__contact"
                onClick={() => setSelectedContact(contact)}
              >
                {contact.name}
              </div>
            ))}
        </div>
        <button onClick={() => setShowAddContactModal(true)} type="button">
          Add Contact
        </button>
      </div>
      {showAddContactModal && (
        <AddContactModal
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )}
      {selectedContact && (
        <ContactInfoModal
          contact={selectedContact}
          setSelectedContact={setSelectedContact}
          handleSubmit={handleUpdateContact}
          handleDeleteContact={handleDeleteContact}
        />
      )}
    </div>
  );
};

export default Contacts;
