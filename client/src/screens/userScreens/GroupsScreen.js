import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
	const [ groupInfoModalIsOpen, setGroupInfoModalIsOpen ] = useState(false);
	const [ membersToAdd, setMembersToAdd ] = useState([]);

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
		setSelectedGroupId(null);
	};

	const handleDeleteMember = (memberId) => {
		dispatch(userActions.deleteMember(selectedGroup._id, memberId));
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

	const handleUpdateGroup = () => {
		if (membersToAdd.length > 0) {
			dispatch(userActions.updateGroup(selectedGroup._id, membersToAdd));
		}
		setSelectedGroupId(null);
	};

	return (
		<Grid container spacing={2} className={root.root}>
			<Grid item xs={12} xl={12}>
				<Typography variant="h4" align="center">
					Create a new Quiz
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
							<Grid item lg={3} md={4} xs={12} key={index} onClick={() => {
								setSelectedGroupId(group._id);
								setGroupInfoModalIsOpen(true)
							}}>
								<Paper className={classes.listItem}>
									<Typography>Group name:&nbsp; {group.name}</Typography>
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
			<Modal
				isOpen={addGroupModalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				size="lg"
				centered>
				<AddGroupModal closeModal={closeModal} user={user} />
			</Modal>

			<Modal
				isOpen={groupInfoModalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				size="lg"
				centered>
				<GroupInfoModal
					selectedGroup={selectedGroup}
					setSelectedGroupId={setSelectedGroupId}
					handleDeleteGroup={handleDeleteGroup}
					handleDeleteMember={handleDeleteMember}
					handleAddMember={handleAddMember}
					user={user}
					handleUpdateGroup={handleUpdateGroup}
				/>
			</Modal>
		</Grid>
	);

	{
		/* <Grid item container xl={12} spacing={2}>
				{user &&
					user.groups &&
					user.groups.map((group, index) => {
						return (
							<Grid
								item
								lg={2}
								key={index}
								onClick={() => setSelectedGroupId(group._id)}
								className="groups__group">
								{group.name}
							</Grid>
						);
					})}
			</Grid>
			<button onClick={() => setIsOpen(true)} type="button">
				Add Group
			</button>
			{modalIsOpen && (
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel="Example Modal"
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered>
					<AddGroupModal closeModal={closeModal} user={user} />
				</Modal>
			)}
			{selectedGroup && (
				<GroupInfoModal
					selectedGroup={selectedGroup}
					setSelectedGroupId={setSelectedGroupId}
					handleDeleteGroup={handleDeleteGroup}
					handleDeleteMember={handleDeleteMember}
					handleAddMember={handleAddMember}
					user={user}
					handleUpdateGroup={handleUpdateGroup}
				/>
			)}
		</Grid>
	); */
	}
};

export default Groups;
