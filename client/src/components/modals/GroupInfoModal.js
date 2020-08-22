import React, { useState} from "react";
import { modalRootStyles, addContactModalStyles  } from "../../style/modalStyles";
import CustomSnackbar from "../../components/mui/Snackbar";
import {
	Grid,
	Typography,
	Divider,
	Button,
	TextField,
	Chip,
	FormControlLabel,
	Checkbox,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import V from "max-validator";

const GroupInfoModal = ({ selectedGroup, closeModal, handleDeleteGroup, user, handleUpdateGroup }) => {
	const [ groupMembers, setGroupMembers ] = useState(selectedGroup.contacts);
	const [ nonGroupContacts, setNonGroupContacts ] = useState(
		user.contacts.filter(function(obj) {
			return !selectedGroup.contacts.some(function(obj2) {
				return obj._id === obj2._id;
			});
		})
	);
	const [validationError, setValidationError] = useState("");
	const [ membersToAdd, setMembersToAdd ] = useState([]);
	const rootClasses = modalRootStyles();
	const classes = addContactModalStyles ();


	const handleSubmit = (e) => {
		e.preventDefault();
		const groupName = e.target.name.value;
		setValidationError("")
		const result = V.validate({groupName }, {groupName: "required|string|min:2|max:15",});
			if (result.hasError) {
					setValidationError(result.getError("groupName"))
					return;
			}
			else {
				
				const arr = [...groupMembers, ...membersToAdd]
				 handleUpdateGroup(groupName, arr)
			}
	}

	const handleDeleteMember = (memberId) => {
		const contact = user.contacts.find((contact) => (contact._id = memberId));
		setGroupMembers(groupMembers.filter((member) => member._id !== memberId));
		setNonGroupContacts([ ...nonGroupContacts, contact ]);
	};

	const handleAddMember = (e) => {
		const selectedContactId = e.target.value;
		const selectedContact = user.contacts.find((contact) => contact._id === selectedContactId);

		if (e.target.checked) {
			setMembersToAdd([ ...membersToAdd, selectedContact ]);
		} else {
			setMembersToAdd(membersToAdd.filter((member) => member._id !== selectedContactId));
		}
	};

	return (
		<div className={rootClasses.root}>
			{validationError !== "" && (
				<CustomSnackbar severity="error" message={validationError} handleClose={() => setValidationError("")} />
			)}
			
			<form onSubmit={handleSubmit}>
			<Grid container spacing={3} justify="center">
				<Grid item xs={12}>
					<Typography variant="h5" color="primary" style={{ textAlign: "center" }}>
						Group Detail
					</Typography>
					<Divider variant="middle" />
				</Grid>
				<Grid item xs={12} sm={6} className={classes.label}>
					<Typography>Group name: </Typography>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.input}>
					<TextField variant="outlined" id="name" name="name" defaultValue={selectedGroup.name} />
				</Grid>
				<Grid item xl={12} container spacing={1}>
					<Grid item xs={12}>
							Group Members:
					</Grid>
						
						{groupMembers && groupMembers.length > 0 &&
							
							
							(
						<Grid item xl={12} container spacing={1} className={classes.nonGroupMembersContainer} >
								{groupMembers.map((contact, index) => {
						
									return(<Grid item xs={6} md={2} key={index}>
										<Chip
											label={contact.name}
											clickable
											color="secondary"
											onDelete={() => handleDeleteMember(contact._id)}
											variant="outlined"
										/>
									</Grid>)
						
						
								})}
							</Grid>)
					}
						

					<Grid item xs={12}>
						Add more members:
					</Grid>
					{nonGroupContacts.length > 0 && <Grid item xs={12} container spacing={1} className={classes.nonGroupMembersContainer}>
						{nonGroupContacts &&
							nonGroupContacts.map((contact, index) => (
								<Grid item lg={3} md={4} xs={12} key={index}>
									<FormControlLabel
										control={<Checkbox onChange={handleAddMember} value={contact._id} />}
										label={contact.name}
									/>
								</Grid>
							))}
					</Grid>
					}

					<Grid item xs={12} sm={4}>
						<Button type="submit" fullWidth variant="contained" color="primary" startIcon={<SaveIcon />}>
							Save
						</Button>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Button onClick={closeModal} fullWidth variant="contained" color="primary" startIcon={<CloseIcon />}>
							Cancel
						</Button>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Button
								onClick={handleDeleteGroup}
								fullWidth
							variant="contained"
							color="primary"
							startIcon={<DeleteOutlineIcon />}>
							Delete
						</Button>
					</Grid>
				</Grid>
			</Grid></form>
		</div>
	);
};

export default GroupInfoModal;
