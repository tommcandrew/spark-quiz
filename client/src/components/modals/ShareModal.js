import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import { modalRootStyles, shareModalStyles } from "../../style/modalStyles";
import CustomSnackbar from "../../components/mui/Snackbar";
import { Typography, Tab, Tabs, AppBar, Box, Grid, Divider, Button, FormControlLabel, Checkbox } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import * as quizActions from "../../store/actions/quizActions";
import V from "max-validator";

//MUI TAB FUNCTIONS
function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`
	};
}

//MAIN
const ShareModal = ({ quizId, closeModal }) => {
	const classes = shareModalStyles();
	const rootClasses = modalRootStyles();
	const [ validationError, setValidationError ] = useState("");
	const [ recipientsContacts, setRecipientsContacts ] = useState([]);
	const [ recipientsGroups, setRecipientsGroups ] = useState([]);
	const [ value, setValue ] = useState(0);
	const dispatch = useDispatch();
	const theme = useTheme();

	const user = useSelector((state) => state.auth.user);
	const quiz = useSelector((state) => state.quiz);

	useEffect(() => {
		if (quiz && quiz.quizInvites.contacts) {
			setRecipientsContacts(quiz.quizInvites.contacts.map((contact) => contact.id));
		}
		if (quiz && quiz.quizInvites.groups) {
			setRecipientsGroups(quiz.quizInvites.groups.map((groupId) => groupId));
		}
	}, []);

	//HANDLERS
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	const handleaddGroup = (e) => {
		const selectedGroupId = e.target.value;
		// const selectedGroup = user.groups.find((group) => group._id === selectedGroupId);
		if (e.target.checked) {
			setRecipientsGroups([ ...recipientsGroups, selectedGroupId ]);
		} else {
			setRecipientsGroups(recipientsGroups.filter((recipient) => recipient !== selectedGroupId));
		}
	};

	const handleAddContact = (e) => {
		const selectedContactId = e.target.value;
		//const selectedContact = user.contacts.find((contact) => contact._id === selectedContactId);
		if (e.target.checked) {
			setRecipientsContacts([ ...recipientsContacts, selectedContactId ]);
		} else {
			setRecipientsContacts(recipientsContacts.filter((id) => id !== selectedContactId));
		}
	};

	const handleComplete = () => {
		let newRecipientsList = [ ...recipientsContacts ];
		if (recipientsGroups.length > 0) {
			recipientsGroups.map((id) => {
				let groupObject = user.groups.find((group) => group._id === id);
				groupObject.contacts.map((contact) => newRecipientsList.push(contact._id));
			});
		}
		newRecipientsList = [ ...new Set(newRecipientsList) ]; //aray of non duplicate selected contact ids
		console.log(newRecipientsList);
		let quizInvites = [];
		newRecipientsList.forEach((r) => {
			user.contacts.forEach((u) => {
				if (u._id === r) {
					quizInvites.push({
						email: u.email,
						name: u.name,
						//I'm adding ID field here to be able to check if contact rendered in list has already been invited or not
						//using both "id" and "_id" is not ideal!
						id: u._id,
						//when adding someone to invites array, in DB they seem to be assigned a Mongo ID which I don't understand
						code: Math.floor(Math.random() * 1000)
					});
				}
			});
		});

		dispatch(
			quizActions.updateQuiz(quizId, {
				quizInvites: { contacts: quizInvites, groups: recipientsGroups }
			})
		); //QUIZ INVITES SENT

		closeModal();
	};

	//RETURN
	return (
		<div className={rootClasses.root}>
			{validationError !== "" && (
				<CustomSnackbar severity="error" message={validationError} handleClose={() => setValidationError("")} />
			)}
			<Grid container spacing={3} justify="center" alignItems="flex-start">
				<Grid item xs={12}>
					<Typography variant="h5" color="secondary" style={{ textAlign: "center" }}>
						Invite Students
					</Typography>
					<Divider variant="middle" />
				</Grid>

				<Grid item xs={12} xl={12} container>
					{recipientsContacts &&
						recipientsContacts.length > 0 &&
						recipientsContacts.map((recipient, index) => {
							let contactObject = user.contacts.find((contact) => contact._id === recipient);
							if (contactObject) { return (<Grid item xs={6} md={3} lg={1}key={index}>{contactObject.name}</Grid> )}
						})}
					{recipientsGroups &&
						recipientsGroups.length > 0 &&
						recipientsGroups.map((recipient, index) => {
							let groupObject = user.groups.find((group) => group._id === recipient);
							if (groupObject){ return (<Grid item xs={6} md={4} md={3} lg={1} key={index}>{groupObject.name}</Grid> )}
						})}
				</Grid>

				<AppBar position="static" color="default" style={{ width: "100%" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						variant="fullWidth"
						textColor="primary"
						aria-label="full width tabs example">
						<Tab label="Groups" {...a11yProps(0)} />
						<Tab label="Contacts" {...a11yProps(1)} />
					</Tabs>
				</AppBar>
				<SwipeableViews
					className={classes.container}
					axis={theme.direction === "rtl" ? "x-reverse" : "x"}
					index={value}
					onChangeIndex={handleChangeIndex}>
					<TabPanel value={value} index={0} dir={theme.direction}>
						<Grid container spacing={2}>
							{user &&
								user.groups &&
								user.groups.map((group, index) => {
									let isChecked = recipientsGroups.includes(group._id);
									return (
										<Grid item xs={12} sm={4} lg={3} key={index}>
											<FormControlLabel
												control={
													<Checkbox
														id={group._id}
														onChange={handleaddGroup}
														value={group._id}
														checked={isChecked}
													/>
												}
												label={group.name}
											/>
										</Grid>
									);
								})}
						</Grid>
					</TabPanel>
					<TabPanel value={value} index={1} dir={theme.direction}>

							<Grid container spacing={2}>
							{user &&
								user.contacts &&
								user.contacts.map((contact, index) => {
									let isChecked = recipientsContacts.includes(contact._id);
									return (
										<Grid item xs={12} sm={4} lg={3} key={index}>
											<FormControlLabel
												control={
													<Checkbox
														id={contact._id}
												onChange={handleAddContact}
												value={contact._id}
												checked={isChecked}
													/>
												}
												label={contact.name}
											/>
										</Grid>
									);
								})}
						</Grid>
					</TabPanel>
				</SwipeableViews>

				<Grid item xl={12} container spacing={2}>
					<Grid item md={6}>
						<Button onClick={handleComplete}>Done</Button>
					</Grid>
					<Grid item md={6}>
						<Button onClick={closeModal}>Cancel</Button>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default ShareModal;
