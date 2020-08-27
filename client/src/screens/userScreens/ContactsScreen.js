import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/actions/userActions";
import ContactInfoModal from "../../components/modals/ContactInfoModal";
import AddContactModal from "../../components/modals/AddContactModal";
import { contactsScreenStyles, screenLayoutStyles } from "../../style/screenStyles";
import { Typography, Grid, Paper, Divider, Input, InputAdornment, Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Modal from "react-modal";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";

const Contacts = () => {
	const dispatch = useDispatch();
	const classes = contactsScreenStyles();
	const root = screenLayoutStyles();
	const user = useSelector((state) => state.auth.user);

	const [ selectedContact, setSelectedContact ] = useState(null);
	const [ addContactModalIsOpen, setAddContactModalIsOpen ] = useState(false);
	const [ contactInfoModalIsOpen, setContactInfoModalIsOpen ] = useState(false);
	const [ searchInput, setSearchInput ] = useState("");
	const [ displayedContacts, setDisplayedContacts ] = useState([]);

	useEffect(
		() => {
			if (user && user.contacts) {
				if (searchInput === "") {
					setDisplayedContacts(user.contacts);
				} else {
					const filteredContacts = [ ...user.contacts ].filter((contact) =>
						contact.name.toLowerCase().includes(searchInput.toLowerCase())
					);
					setDisplayedContacts(filteredContacts);
				}
			}
		},
		[ searchInput, user ]
	);

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
		<div style={{ height: "100%", width: "100%" }}>
			<Grid item xs={12} xl={12} className={classes.titleContainer}>
				<Typography variant="h4" align="center">
					Contacts
				</Typography>
				<Divider variant="middle" />
			</Grid>
			<Grid container spacing={2} className={classes.contactsMainContainer}>
				<Modal
					isOpen={addContactModalIsOpen}
					onRequestClose={closeModal}
					className="Modal"
					overlayClassName="Overlay"
					centered>
					<AddContactModal handleSubmit={handleAddContact} closeModal={closeModal} user={user} />
				</Modal>
				<Modal
					isOpen={contactInfoModalIsOpen}
					onRequestClose={closeModal}
					className="Modal"
					overlayClassName="Overlay"
					centered>
					<ContactInfoModal
						contact={selectedContact}
						handleSubmit={handleUpdateContact}
						handleDeleteContact={handleDeleteContact}
						closeModal={closeModal}
					/>
				</Modal>

				<Grid item xs={6} style={{ marginBottom: "10px", textAlign: "center" }}>
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
				<Grid item xs={6} style={{ marginBottom: "10px", textAlign: "center" }}>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<AddCircleIcon />}
						onClick={() => {
							setAddContactModalIsOpen(true);
						}}>
						Add new contact
					</Button>
				</Grid>

				<div className={classes.contactsContainer}>
					<Grid container spacing={3} alignContent="flex-start" style={{ height: "100%", width: "100%" }}>
						{displayedContacts &&
							displayedContacts.map((contact, index) => (
								<Grid item xs={12} sm={6} md={4} lg={3} key={index} className={classes.gridItem}>
									<Paper
										className={clsx(classes.paper, "zoom")}
										elevation={2}
										onClick={() => {
											setContactInfoModalIsOpen(true);
											setSelectedContact(contact);
										}}>
										<Typography variant="h5">{contact.name}</Typography>
									</Paper>
								</Grid>
							))}
					</Grid>
				</div>
			</Grid>
		</div>
	);
};

export default Contacts;
