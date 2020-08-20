import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authActions";
import { Grid, Typography, Divider, makeStyles, Button } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: "30px",
		[theme.breakpoints.down("sm")]: {
			paddingTop: "15px"
       
    },
	},
	contactContainer: {
		display: "flex",
		width: "800px",
		marginTop: "30px",
		border: `3px solid ${theme.palette.primary.main}`,
		[theme.breakpoints.down("md")]: {
			flexDirection: "column",
			width: "400px",
			height: "500px",
		},
		[theme.breakpoints.down("sm")]: {
			height: "400px",
			borderWidth: "2px",
			marginTop: "5px",
		},
		[theme.breakpoints.down("xs")]: {
			border: "none"
    },
	},
	avatarContainer: {
		width: "400px",
		borderRight: `3px solid ${theme.palette.primary.main}`,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		[theme.breakpoints.down("md")]: {
			borderRight: "none",
			height: "250px",
			borderBottom: `3px solid ${theme.palette.primary.main}`,
		},
		[theme.breakpoints.down("sm")]: {
			borderWidth: "2px",
			height: "30%"
		},
		[theme.breakpoints.down("xs")]: {
			border: "none"
    },
	},
	avatar: {
		width: "150px",
		height: "150px",
		color: theme.palette.primary.main,
		[theme.breakpoints.down("sm")]: {
			width: "100px",
		height: "100px",
    },
	},
	detailsContainer: {
		
		padding: "20px",
		width: "400px",
		[theme.breakpoints.down("md")]: {
			textAlign: "center",
				height: "250px",
				alignItems: "center",
				justifyContent: "center"
    },[theme.breakpoints.down("sm")]: {
				height: "60%",
		},
		[theme.breakpoints.down("xs")]: {
			alignItems: "center"
    },
	},
  
	passwordChangeContainer: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		marginTop: "30px",
		alignItems: "flex-start",
		[theme.breakpoints.down("md")]: {
			alignItems: "center"
    },
	},

}));

const MyAccount = (props) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const classes = useStyles();

	const handleDeleteAccount = async () => {
		if (window.confirm("Are you sure you want to delete your account?")) {
			await dispatch(authActions.deleteAccount());
			props.history.push("/");
		} else {
			return;
		}
	};

	const logoutHandler = async () => {
		await dispatch(authActions.logout());
		props.history.push("/");
	};

	const handleChangePassword = async (e) => {
		e.preventDefault();
		const currentPassword = e.target.currentPassword.value;
		const newPassword = e.target.newPassword.value;
		await dispatch(authActions.changePassword(currentPassword, newPassword));
	};

	return (
		<Grid container spacing={2} className={classes.container} justify="center">
			<Grid item xs={12} xl={12}>
				<Typography variant="h4" align="center">
					My Account
				</Typography>
				<Divider variant="middle" />
			</Grid>

			<div className={classes.contactContainer}>
				<Grid item sm={12} md={6} className={classes.avatarContainer}>
					<FaceIcon className={classes.avatar} />
				</Grid>

				<Grid item sm={12} md={6} container className = {classes.detailsContainer}>
					<Grid item xl={12} xs={12} className={classes.gridItem}>
						<Typography variant="h6">Name: {user && user.name} </Typography>
					</Grid>

					<Grid item xl={12} xs={12} className={classes.gridItem}>
						<Typography variant="h6" >Email: {user && user.email} </Typography>
					</Grid>

					<Grid item xl={12} xs={12} className={classes.passwordChangeContainer}>
						<form onSubmit={handleChangePassword} >
							<Typography color="secondary" align="left">Change password: </Typography>
							<div style={{textAlign: "left"}}>
								<label htmlFor="currentPassword">Current password:</label>
								<input
									type="password"
									id="currentPassword"
									name="currentPassword"
									style={{ borderBottom: "1px solid black" }}
								/>
							</div>
							<div style={{textAlign: "left"}}>
								<label htmlFor="currentPassword">New password:</label>
								<input
									type="password"
									id="newPassword"
									name="newPassword"
									style={{ borderBottom: "1px solid black" }}
								/>
							</div>
							<div style= {{width: "100%", textAlign: "right"}}>
							<Button  classname={classes.button} color="primary" type="submit">
									Confirm
							</Button>
							</div>
						</form>
						<Button
							style={{ padding: "0", marginTop: "5"}}
							color="secondary"
							onClick={handleDeleteAccount}
							className="myAccount__delete-account">
							Delete account
						</Button>
					</Grid>
				</Grid>
			</div>
		</Grid>
	);
};

export default MyAccount;
