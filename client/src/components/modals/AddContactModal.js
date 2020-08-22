import React, { useState } from "react";
import { modalRootStyles, addContactModalStyles } from "../../style/modalStyles";
import CustomSnackbar from "../../components/mui/Snackbar";
import { Grid, Typography, Divider, Button, TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import V from "max-validator";
import { contactValidation } from "../../utils/validation";

const AddContactModal = ({ handleSubmit, closeModal, user }) => {
	const [ validationError, setValidationError ] = useState("");
	const rootClasses = modalRootStyles();
	const classes = addContactModalStyles();

	const internalSubmit = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const name = e.target.name.value;
		setValidationError("");
		let existingContactEmails = [];
		user.contacts.forEach((contact) => existingContactEmails.push(contact.email));
		if (existingContactEmails.includes(email)) {
			setValidationError("A contact with that email already exists.");
			return;
		}
		const result = V.validate({ email, name }, contactValidation);
		if (result.hasError) {
			if (result.isError("name")) {
				setValidationError(result.getError("name"));
				return;
			} else setValidationError(result.getError("email"));
		} else handleSubmit(name, email);
	};

	return (
		<div className={rootClasses.root}>
			{validationError !== "" && (
				<CustomSnackbar severity="error" message={validationError} handleClose={() => setValidationError("")} />
			)}

			<form onSubmit={internalSubmit}>
				<Grid container spacing={3} justify="center">
					<Grid item xs={12}>
						<Typography variant="h5" color="primary" style={{textAlign: "center"}}>
							Add Contact
						</Typography>
						<Divider variant="middle" />
					</Grid>
					<Grid item xs={12} sm={6} className={classes.label}>
						<Typography>Name: </Typography>
					</Grid>
					<Grid item xs={12} sm={6} className={classes.input}>
						<TextField variant="outlined" type="text" id="name" name="name" color="secondary" />
					</Grid>
					<Grid item xs={12} sm={6} className={classes.label}>
						<Typography>Email: </Typography>
					</Grid>
					<Grid item xs={12} sm={6} className={classes.input}>
						<TextField variant="outlined" id="email" name="email" color="secondary" />
					</Grid>
					<Grid item xs={12} sm={6} className={classes.label}>
						<Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />} classname={classes.button}>
							Save
						</Button>
					</Grid>

					<Grid item xs={12}sm={6} className={classes.input}>
						<Button
							classname={classes.button}
							onClick={() => {
								closeModal();
							}}
							variant="contained"
							color="primary"
							
							
							startIcon={<CloseIcon />}>
							Cancel
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default AddContactModal;
