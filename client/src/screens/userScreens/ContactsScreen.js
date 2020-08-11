import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/actions/userActions";
import ContactInfoModal from "../../components/modals/ContactInfoModal";
import AddContactModal from "../../components/modals/AddContactModal";
import { contactsScreenStyles, screenLayoutStyles, customStyles } from "../../style/screenStyles";
import { Typography, Grid, Paper, Divider, Input, InputAdornment, Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Modal from "react-modal";
import SearchIcon from "@material-ui/icons/Search";

const Contacts = () => {
	const dispatch = useDispatch();
	const classes = contactsScreenStyles();
	const root = screenLayoutStyles();
	const user = useSelector((state) => state.auth.user);

	const [ selectedContact, setSelectedContact ] = useState(null);
	const [ addContactModalIsOpen, setAddContactModalIsOpen ] = useState(false);
	const [ contactInfoModalIsOpen, setContactInfoModalIsOpen ] = useState(false);
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

	//MAIN
	return (
		<Grid container spacing={2} className={root.root} style={{flexDirection: "row", justifyContent: "flexStart"}}>
			<Modal
				isOpen={addContactModalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<AddContactModal handleSubmit={handleAddContact} closeModal={closeModal} user={user} />
			</Modal>
			<Modal
				isOpen={contactInfoModalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered>
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

			<Grid item container spacing={3} xs={12} xl={12} className={classes.mainContainer}>
				<Grid item xl={6} xs={6} style={{textAlign: "right"}}>
					<Input
						startAdornment={
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						}
					/>
				</Grid>

				<Grid item xl={6} xs={6}>
					<Button
						variant="outlined"
						color="primary"
						startIcon={<AddCircleIcon />}
						onClick={() => {
							setAddContactModalIsOpen(true);
						}}>
						Add new contact
					</Button>
				</Grid>

				{user &&
					user.contacts &&
					user.contacts.map((contact, index) => (
						<Grid item xs={12} sm={12} md={4} lg={4} key={index} className={classes.gridItem}>
							<Paper
								 className="zoom"
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
		</Grid>
	);
};

export default Contacts;
