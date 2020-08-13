import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/actions/userActions";
import ContactInfoModal from "../../components/modals/ContactInfoModal";
import AddContactModal from "../../components/modals/AddContactModal";
import {
  contactsScreenStyles,
  screenLayoutStyles,
  customStyles,
} from "../../style/screenStyles";
import {
  Typography,
  Grid,
  Paper,
  Divider,
  Input,
  InputAdornment,
  Button,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Modal from "react-modal";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";

const Contacts = () => {
  const dispatch = useDispatch();
  const classes = contactsScreenStyles();
  const root = screenLayoutStyles();
  const user = useSelector((state) => state.auth.user);

  const [selectedContact, setSelectedContact] = useState(null);
  const [addContactModalIsOpen, setAddContactModalIsOpen] = useState(false);
  const [contactInfoModalIsOpen, setContactInfoModalIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [displayedContacts, setDisplayedContacts] = useState([]);

  useEffect(() => {
    if (user && user.contacts) {
      if (searchInput === "") {
        setDisplayedContacts(user.contacts);
      } else {
        const filteredContacts = [...user.contacts].filter((contact) =>
          contact.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setDisplayedContacts(filteredContacts);
      }
    }
  }, [searchInput, user]);

  //HANDLERS
  function closeModal() {
    setAddContactModalIsOpen(false);
    setContactInfoModalIsOpen(false);
  }

  const handleAddContact = (name, email) => {
    dispatch(userActions.addContact({ name, email }));
    closeModal();
  };

  const handleUpdateContact = (name, email) => {
    const updatedContact = { name, email };
    dispatch(userActions.updateContact(selectedContact._id, updatedContact));
    closeModal();
  };

  const handleDeleteContact = () => {
    dispatch(userActions.deleteContact(selectedContact._id));
    closeModal();
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  //MAIN
  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      <Modal
        isOpen={addContactModalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <AddContactModal
          handleSubmit={handleAddContact}
          closeModal={closeModal}
          user={user}
        />
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
          handleSubmit={handleUpdateContact}
          handleDeleteContact={handleDeleteContact}
          closeModal={closeModal}
        />
      </Modal>

      <Grid item xs={12} xl={12}>
        <Typography variant="h4" align="center">
          Contacts
        </Typography>
        <Divider variant="middle" />
      </Grid>

      <Grid item container spacing={2} xs={12} xl={12}>
        <Grid item xs={12} style={{ marginBottom: "10px" }}>
          <Input
            onChange={handleSearch}
            placeholder="Search contacts"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            }
          />
        </Grid>

        <div className={classes.contactsContainer}>
          <Grid container spacing={2} style={{ width: "100%", height: "100%" }}>
            <Grid xs={12} sm={12} md={3} lg={3} className={classes.gridItem}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddCircleIcon />}
                onClick={() => {
                  setAddContactModalIsOpen(true);
                }}
              >
                Add new contact
              </Button>
            </Grid>

            {displayedContacts &&
              displayedContacts.map((contact, index) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  lg={3}
                  key={index}
                  className={classes.gridItem}
                >
                  <Paper
                    className={clsx(classes.paper, "zoom")}
                    elevation={2}
                    onClick={() => {
                      setContactInfoModalIsOpen(true);
                      setSelectedContact(contact);
                    }}
                  >
                    <Typography variant="h5">{contact.name}</Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default Contacts;
