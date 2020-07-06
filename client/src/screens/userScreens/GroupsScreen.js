import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomSnackbar from "../../components/mui/Snackbar";
import Modal from "react-modal";
import AddGroupModal from "../../components/modals/AddGroupModal";
import * as userActions from "../../store/actions/userActions";
import GroupInfoModal from "../../components/modals/GroupInfoModal";
import { Typography, Grid, Paper, Divider, Input, InputAdornment, Button } from "@material-ui/core";
import { groupsScreenStyles, screenLayoutStyles, customStyles } from "../../style/screenStyles";

import SearchIcon from "@material-ui/icons/Search";

const Groups = () => {
	const classes = groupsScreenStyles();
	const root = screenLayoutStyles();
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [ selectedGroupId, setSelectedGroupId ] = useState(null);
	const [ selectedGroup, setSelectedGroup ] = useState(null);
	const [ addGroupModalIsOpen, setAddGroupModalIsOpen ] = useState(false);
	const [groupInfoModalIsOpen, setGroupInfoModalIsOpen] = useState(false);
	const [warningMessage, setWarningMessage] = useState("");

	const closeModal = () => {
		setAddGroupModalIsOpen(false);
		setGroupInfoModalIsOpen(false);
	};

	useEffect(
		() => {
			//update selectedgroup after user is updated so changes are reflected in GroupInfoModal
			if (user) {
				setSelectedGroup(user.groups.filter((group) => group._id === selectedGroupId)[0]);
			}
		},
		[ user, selectedGroupId ]
	);

	const handleDeleteGroup = () => {
		dispatch(userActions.deleteGroup(selectedGroup._id));
		closeModal();
	};

	// const handleDeleteMember = (memberId) => {
	// 	dispatch(userActions.deleteMember(selectedGroup._id, memberId));
	// };

	// const handleAddMember = (e) => {
	// 	const selectedContactId = e.target.value;
	// 	const selectedContact = user.contacts.find((contact) => contact._id === selectedContactId);

	// 	if (e.target.checked) {
	// 		setMembersToAdd([ ...membersToAdd, selectedContact ]);
	// 	} else {
	// 		setMembersToAdd(membersToAdd.filter((member) => member._id !== selectedContactId));
	// 	}
	// };

	const handleUpdateGroup = (groupName, members) => {
		setWarningMessage("")
		if(!members.length || !members ) {setWarningMessage("It is not advised to make an empty group")}
		dispatch(userActions.updateGroup(selectedGroup._id, groupName, members));
		closeModal()
	};

	return (
		<Grid container spacing={2} className={root.root}>
			{warningMessage !== "" && (
				<CustomSnackbar severity="warning" message={warningMessage} handleClose={() => setWarningMessage("")} />
			)}
			<Grid item xs={12} xl={12}>
				<Typography variant="h4" align="center">
					Groups
				</Typography>
				<Divider variant="middle" />
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
			<Grid item xs={12} container spacing={3}>
				{user &&
					user.groups &&
					user.groups.map((group, index) => {
						return (
							<Grid
								item
								lg={3}
								md={4}
								xs={12}
								key={index}
								onClick={() => {
									setSelectedGroupId(group._id);
									setGroupInfoModalIsOpen(true);
								}}>
								<Paper className={classes.listItem}>
									<Typography>Group name:&nbsp; {group.name}</Typography>
									{group.contacts.length === 0 && (
										<Typography variant="caption" display="block" color="secondary" gutterBottom>
											No members in this group. Click to add
										</Typography>
									)}
								</Paper>
							</Grid>
						);
					})}
			</Grid>
			<Grid item xs={12} xl={12}>
				<Button variant="contained" color="secondary" onClick={() => setAddGroupModalIsOpen(true)}>
					Add Group
				</Button>
			</Grid>
			<Modal isOpen={addGroupModalIsOpen} onRequestClose={closeModal} style={customStyles} size="lg" centered>
				<AddGroupModal closeModal={closeModal} user={user} />
			</Modal>

			<Modal isOpen={groupInfoModalIsOpen} onRequestClose={closeModal} style={customStyles} size="lg" centered>
				<GroupInfoModal
					selectedGroup={selectedGroup}
					closeModal={closeModal}
					handleDeleteGroup={handleDeleteGroup}
					user={user}
					handleUpdateGroup={handleUpdateGroup}
				/>
			</Modal>
		</Grid>
	);
};

export default Groups;
