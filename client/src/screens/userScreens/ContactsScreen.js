import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/actions/userActions";
import ContactInfoModal from "../../components/modals/ContactInfoModal";
import AddContactModal from "../../components/modals/AddContactModal";
import { contactsScreenStyles, screenLayoutStyles, customStyles } from "../../style/screenStyles";
import { Typography, Grid, Paper, Divider, Input, InputAdornment, Button } from "@material-ui/core";
import Modal from "react-modal";
import SearchIcon from '@material-ui/icons/Search';

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

	const handleSubmit = (name, email) => {
		dispatch(userActions.addContact({ name, email }));
		closeModal()
	};

	const handleDeleteContact = async () => {
		await dispatch(userActions.deleteContact(selectedContact._id));
		closeModal()
	};

	const handleUpdateContact = async(e) => {
		e.preventDefault();
		const name = e.target.name.value;
		const email = e.target.email.value;
		const updatedContact = { name, email };
		await dispatch(userActions.updateContact(selectedContact._id, updatedContact));
		closeModal()
	};

	//MAIN
	return (
		<Grid container spacing={2} className={root.root}>
			<Grid item xs={12} xl={12}>
				<Typography variant="h4" align="center">
					Create a new Quiz
				</Typography>
				      <Divider variant="middle"  />
			</Grid>
			<Grid item xl={12} xs={12}>
				<Input
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
			</Grid>
			<Grid item xs={12} container spacing={3} className={classes.list}>
				{user &&
					user.contacts &&
					user.contacts.map((contact, index) => (
						<Grid
							item
							lg={3}
							md={4}
							xs={12}
							key={index}
							onClick={() => {
								setContactInfoModalIsOpen(true);
								setSelectedContact(contact);
							}}>
							<Paper className={classes.listItem}>
								<Typography>
								{contact.name}</Typography>
							</Paper>
						</Grid>
					))}
			</Grid>
			<Grid item xs={12} xl={12}>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						setAddContactModalIsOpen(true);
					}}>
					Add Contact
				</Button>
			</Grid>
			<Modal
				isOpen={addContactModalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<AddContactModal handleSubmit={handleSubmit} closeModal={closeModal}/>
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
