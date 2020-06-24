import React, { useState } from "react";
import AddContactModal from "../../components/UI/AddContactModal";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/actions/userActions";

const Contacts = () => {
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
  };

  return (
    <div>
      <h1>Contacts</h1>
      <div className="contacts__content">
        <div>
          <input type="text" placeholder="Search" />
        </div>
        <div>
          {user &&
            user.contacts &&
            user.contacts.map((contact) => (
              <div className="contact__contact">{contact.name}</div>
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
    </div>
  );
};

export default Contacts;
