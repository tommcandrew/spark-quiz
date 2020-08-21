import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomSnackbar from "../../components/mui/Snackbar";
import Modal from "react-modal";
import AddGroupModal from "../../components/modals/AddGroupModal";
import * as userActions from "../../store/actions/userActions";
import GroupInfoModal from "../../components/modals/GroupInfoModal";
import { Typography, Grid, Paper, Divider, Input, InputAdornment, Button } from "@material-ui/core";
import { contactsScreenStyles, screenLayoutStyles } from "../../style/screenStyles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import clsx from "clsx";
import SearchIcon from "@material-ui/icons/Search";

const Groups = () => {
	const classes = contactsScreenStyles();
	const root = screenLayoutStyles();
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [ selectedGroupId, setSelectedGroupId ] = useState(null);
	const [ selectedGroup, setSelectedGroup ] = useState(null);
	const [ addGroupModalIsOpen, setAddGroupModalIsOpen ] = useState(false);
	const [ groupInfoModalIsOpen, setGroupInfoModalIsOpen ] = useState(false);
	const [ warningMessage, setWarningMessage ] = useState("");
	const [ searchInput, setSearchInput ] = useState("");
	const [ displayedGroups, setDisplayedGroups ] = useState([]);

	useEffect(
		() => {
			if (user && user.groups) {
				if (searchInput === "") {
					setDisplayedGroups(user.groups);
				} else {
					const filteredGroups = [ ...user.groups ].filter((group) =>
						group.name.toLowerCase().includes(searchInput.toLowerCase())
					);
					setDisplayedGroups(filteredGroups);
				}
			}
		},
		[ searchInput, user ]
	);

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

	const handleUpdateGroup = (groupName, members) => {
		setWarningMessage("");
		if (!members.length || !members) {
			setWarningMessage("It is not advised to make an empty group");
		}
		dispatch(userActions.updateGroup(selectedGroup._id, groupName, members));
		closeModal();
	};

	const handleSearch = (e) => {
		setSearchInput(e.target.value);
	};

	return (
		<Grid container spacing={2} className={classes.contactsMainContainer}>
			{warningMessage !== "" && (
				<CustomSnackbar severity="warning" message={warningMessage} handleClose={() => setWarningMessage("")} />
			)}
			<Grid item xs={12} xl={12}>
				<Typography variant="h4" align="center">
					Groups
				</Typography>
				<Divider variant="middle" />
			</Grid>

			<Grid item xs={6} style={{ marginBottom: "10px", textAlign: "center" }}>
				<Input
					onChange={handleSearch}
					placeholder="Search groups"
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
						setAddGroupModalIsOpen(true);
					}}>
					Add new group
				</Button>
			</Grid>

			<div className={classes.contactsContainer}>
				<Grid container spacing={3} alignContent="flex-start" style={{ height: "100%", width: "100%" }}>
					{displayedGroups &&
						displayedGroups.map((group, index) => {
							return (
								<Grid
									item
									lg={3}
									md={4}
									xs={12}
									key={index}
									className={classes.gridItem}
									onClick={() => {
										setSelectedGroupId(group._id);
										setGroupInfoModalIsOpen(true);
									}}>
									<Paper className={clsx(classes.paper, "zoom")}>
										<Typography>Group name:&nbsp; {group.name}</Typography>
										{group.contacts.length === 0 && (
											<Typography
												variant="caption"
												display="block"
												color="secondary"
												gutterBottom>
												No members in this group. Click to add
											</Typography>
										)}
									</Paper>
								</Grid>
							);
						})}
				</Grid>
			</div>

			<Modal
				isOpen={addGroupModalIsOpen}
				onRequestClose={closeModal}
				lassName="Modal"
				overlayClassName="Overlay"
				centered>
				<AddGroupModal closeModal={closeModal} user={user} />
			</Modal>

			<Modal
				isOpen={groupInfoModalIsOpen}
				onRequestClose={closeModal}
				lassName="Modal"
				overlayClassName="Overlay"
				centered>
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
