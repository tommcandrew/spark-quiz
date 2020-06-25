import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddGroupModal from "../../components/UI/AddGroupModal";
import Modal from "react-modal";
import * as authActions from "../../store/actions/authActions";

import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: "30px",
		overflowY: "scroll",
		overflowX: "hidden"
	},
	card: {
		minWidth: 275,
		margin: "5px"
	}
}));

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		height: "70%",
		width: "80%",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center",
		padding: "20px"
	},
	overlay: { zIndex: 2000 }
};

const Groups = (props) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const user = useSelector((state) => state.auth.user);
	const [ modalIsOpen, setIsOpen ] = useState(false);

	const getUser = async() =>{
		await dispatch(authActions.loadUser());
	}

	useEffect(
		() => {
			if (!user) {
				getUser();
			}
		},
		[ user, getUser ]
	);

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<Grid container spacing={2} className={classes.root}>
			<Grid item xs={12} xl={12}>
				<Typography variant="h5" align="center">
					Groups
				</Typography>
			</Grid>
			<Grid item container xl={12} spacing={2}>
				{user &&
					user.groups && 
					user.groups.map((group) => {
						return (<Grid item lg={2}>
							{group.name}
						</Grid>)
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
		</Grid>
	);
};

export default Groups;
