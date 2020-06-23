import React, { useState } from "react";
import {useDispatch} from "react-redux"
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, Tab, Tabs, AppBar, Box } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import { groups, contacts } from "../../dummy-data/contacts";
import * as quizActions from "../../store/actions/quizActions"

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
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

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		flex: 1
	},
	container: {
		backgroundColor: theme.palette.background.paper,
		marginTop: "10px"
	}
}));



const ShareModal = ({quizId, closeModal}) => {
	const classes = useStyles();
	const [recipientsContacts, setRecipientsContacts] = useState([]);
	const [ recipientsGroups, setRecipientsGroups] = useState([]);
	const theme = useTheme();
	const [value, setValue] = React.useState(0);
	const dispatch = useDispatch()
	

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	const handleaddGroup = (e) => {
		const selectedGroupName = e.target.value;
		const selectedGroup = groups.find((group) => group.name === selectedGroupName);

		if (e.target.checked) {
			setRecipientsGroups([ ...recipientsGroups, selectedGroup ]);
		} else {
			setRecipientsGroups(recipientsGroups.filter((recipient) => recipient.name !== selectedGroupName));
		}
	};

	const handleAddContact = (e) => {
		const selectedContactName = e.target.value;
		const selectedContact = contacts.find((contact) => contact.name === selectedContactName);

		if (e.target.checked) {
			setRecipientsContacts([ ...recipientsContacts, selectedContact ]);
		} else {
			setRecipientsContacts(recipientsContacts.filter((recipient) => recipient.name !== selectedContactName));
		}
	};

	const handleComplete = () => {
		if (recipientsContacts.length === 0 && recipientsGroups.length===0 ) {
			alert("Please add a recipient");
		} else {
			let recipientsList = [...recipientsContacts]
			if (recipientsGroups.length > 0) {
				recipientsGroups.map(group => {
					group.members.map(contact => {
						recipientsList.push(contact)
					})
				})
			}
			console.log(recipientsList)
			dispatch(quizActions.updateQuiz(quizId, { quizInvites: recipientsList }))
			closeModal()
		}
	};



	return (
		<div className={classes.root}>
			<Typography variant="h4" align="center">
				Share
			</Typography>
			<div>
				{recipientsContacts &&
					recipientsContacts.length > 0 &&
					recipientsContacts.map((recipient, index) => <span key={index}>{recipient.name}</span>)}
				{recipientsGroups &&
					recipientsGroups.length > 0 &&
					recipientsGroups.map((recipient, index) => <span key={index}>{recipient.name}</span>)}
			</div>
			<div className={classes.container}>
				<AppBar position="static" color="default">
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
					axis={theme.direction === "rtl" ? "x-reverse" : "x"}
					index={value}
					onChangeIndex={handleChangeIndex}>
					<TabPanel value={value} index={0} dir={theme.direction}>
						<div>
							<ul>
								{groups.map((group, index) => {
									let isChecked = false;
									for (let i = 0; i < recipientsGroups.length; i++) {
										if (recipientsGroups[i].name === group.name) {
											isChecked = true;
										}
									}
									return (
										<div key={index}>
											<label htmlFor={group.name}>{group.name}</label>
											<input
												type="checkbox"
												id={group.name}
												onChange={handleaddGroup}
												value={group.name}
												checked={isChecked}
											/>
										</div>
									);
								})}
							</ul>
						</div>
					</TabPanel>
					<TabPanel value={value} index={1} dir={theme.direction}>
						<>
							<ul>
								{contacts.map((contact, index) => {
									let isChecked = false;
									for (let i = 0; i < recipientsContacts.length; i++) {
										if (recipientsContacts[i].name === contact.name) {
											isChecked = true;
										}
									}
									return (
										<div key={index}>
											<label htmlFor={contact.name}>{contact.name}</label>
											<input
												type="checkbox"
												id={contact.name}
												onChange={handleAddContact}
												value={contact.name}
												checked={isChecked}
											/>
										</div>
									);
								})}
							</ul>
						</>
					</TabPanel>
				</SwipeableViews>
			</div>
			<div>
				<button type="button" onClick={handleComplete}>
					Done
				</button>
				<button type="button" onClick={closeModal}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default ShareModal;
