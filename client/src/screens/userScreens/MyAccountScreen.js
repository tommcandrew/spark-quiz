import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authActions";
import { Grid, Typography, Divider, makeStyles, Button } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: "200px",
		height: "200px",
		color: theme.palette.primary.main
	},
	passwordChangeContainer: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start"
	}
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
		<Grid container spacing={2} style={{ padding: "5px" }}>
			<Grid item xs={12} xl={12}>
				<Typography variant="h4" align="center">
					My Account
				</Typography>
				<Divider variant="middle" />
			</Grid>

			<Grid item container spacing={2} xs={12} xl={12} style={{ marginTop: "10px" }}>
				<Grid item sm={12} md={6} style={{ textAlign: "center" }}>
					<FaceIcon className={classes.avatar} />
				</Grid>

				<Grid item sm={12} md={6} container style={{ textAlign: "center", padding: "20px" }}>
					<Grid item xl={12} xs={12} style={{ textAlign: "left" }}>
						<Typography>Name: {user && user.name} </Typography>
					</Grid>

					<Grid item xl={12} xs={12} style={{ textAlign: "left" }}>
						<Typography>Email: {user && user.email} </Typography>
					</Grid>

					<Grid item xl={12} xs={12} style={{ marginTop: "10px" }}>
						<form onSubmit={handleChangePassword} className={classes.passwordChangeContainer}>
							<Typography color="secondary">Change password: </Typography>

							<div>
								<label htmlFor="currentPassword">Current password:</label>
								<input
									type="password"
									id="currentPassword"
									name="currentPassword"
									style={{ borderBottom: "1px solid black" }}
								/>
							</div>
							<div>
								<label htmlFor="currentPassword">New password:</label>
								<input
									type="password"
									id="newPassword"
									name="newPassword"
									style={{ borderBottom: "1px solid black" }}
								/>
							</div>
							<Button color="secondary" type="submit" style={{ padding: "0", margin: "0" }}>
								Confirm
							</Button>
						</form>
					</Grid>

					{/* <Grid item xl={6} xs={6}>
						<Button
							color="primary"
							variant="contained"
							onClick={logoutHandler}
							className="myAccount__logout">
							Log out
						</Button>
					</Grid> */}

					<Grid item xl={12} xs={12}>
						<Button
							style={{ padding: "0", margin: "0", marginLeft: "auto" }}
							color="primary"
							onClick={handleDeleteAccount}
							className="myAccount__delete-account">
							Delete account
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default MyAccount;
