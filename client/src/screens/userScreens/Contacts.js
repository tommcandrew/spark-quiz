import React from "react";
import { useSelector } from "react-redux";

const Contacts = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h1>Contacts</h1>
      <div className="contacts__content">
        <div>
          <input type="text" placeholder="Search" />
        </div>
        <div>
          {user &&
            user.contacts.map((contact) => (
              <div className="contact__contact">{contact.name}</div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
