import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/actions/userActions";
import ContactInfoModal from "../../components/modals/ContactInfoModal";
import AddContactModal from "../../components/modals/AddContactModal";
import { contactsScreenStyles } from "../../style/contactsStyles";
import { customStyles } from "../../style/createQuizScreenStyles";
import { Typography, Grid, Paper } from "@material-ui/core";
import Modal from "react-modal";

const Contacts = () => {
  const dispatch = useDispatch();
  const classes = contactsScreenStyles();
  const user = useSelector((state) => state.auth.user);

  const [selectedContact, setSelectedContact] = useState(null);
  const [addContactModalIsOpen, setAddContactModalIsOpen] = useState(false);
  const [contactInfoModalIsOpen, setContactInfoModalIsOpen] = useState(false);

  //HANDLERS
  const closeModal = () => {
    setAddContactModalIsOpen(false);
    setContactInfoModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    dispatch(userActions.addContact({ name, email }));
    closeModal();
    e.target.reset();
  };

  const handleDeleteContact = () => {
    dispatch(userActions.deleteContact(selectedContact._id));
    closeModal();
  };

  const handleUpdateContact = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updatedContact = { name, email };
    dispatch(userActions.updateContact(selectedContact._id, updatedContact));
    closeModal();
  };

  //MAIN
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xl={12}>
        <Typography variant="h5">Contacts</Typography>
      </Grid>
      <Grid item xl={12}>
        <input type="text" placeholder="Search" />
      </Grid>
      <Grid item xl={12} xs={12} container spacing={3} className={classes.list}>
        {user &&
          user.contacts &&
          user.contacts.map((contact, index) => (
            <Grid
              item
              lg={4}
              xs={12}
              key={index}
              onClick={() => {
                setContactInfoModalIsOpen(true);
                setSelectedContact(contact);
              }}
            >
              <Paper>{contact.name}</Paper>
            </Grid>
          ))}
      </Grid>
      <Grid item xs={12} xl={12}>
        <button
          onClick={() => {
            setAddContactModalIsOpen(true);
          }}
          type="button"
        >
          Add Contact
        </button>
      </Grid>
      <Modal
        isOpen={addContactModalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <AddContactModal handleSubmit={handleSubmit} />
      </Modal>

      <Modal
        isOpen={contactInfoModalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ContactInfoModal
          contact={selectedContact}
          setSelectedContact={setSelectedContact}
          handleSubmit={handleUpdateContact}
          handleDeleteContact={handleDeleteContact}
          closeModal={closeModal}
        />
      </Modal>
    </Grid>
  );
};

export default Contacts;
