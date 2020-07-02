import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CssBaseline, TextField, Grid, Typography, Container, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import CustomSnackbar from "../../components/mui/Snackbar";
import V from "max-validator";
import { registerValidation } from "../../utils/validation";
import * as authActions from "../../store/actions/authActions";
import { useStyles } from "../../style/authScreensStyles";

const Register = (props) => {
	//STATE
	const [ name, setName ] = useState("testuser");
	const [ email, setEmail ] = useState("testuser@test.com");
	const [ password, setPassword ] = useState("12345678");
	const [ password2, setPassword2 ] = useState("12345678");
	const [ validationError, setValidationError ] = useState("");

	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();
	const classes = useStyles();

	//HOOKS
	useEffect(
		() => {
			if (token !== null) props.history.push("/dashboard");
		},
		[ token, props.history ]
	);

	//HANDLERS
	const handleRegister = async () => {
		const registerDetails = { name, email, password, password2 };
		setValidationError("");
		const result = V.validate(registerDetails, registerValidation);
		if (result.hasError) {
			if (result.getError("name")) setValidationError(result.getError("name"));
      else if (result.getError("email") !== "") setValidationError(result.getError("email"))
      else if (result.getError("password") !== "") setValidationError(result.getError("password"))
      else if (result.getError("password2") !== "") setValidationError(result.getError("password2"))
			return;
		} else {
			await dispatch(authActions.register(registerDetails));
		}
	};

	//MAIN
	return (
    <Container component="main" maxWidth="xs">
      	{validationError !== "" &&
				<CustomSnackbar
				severity="error"
				message={validationError}
				handleClose={() => setValidationError("")}/>
			}
			<div className={classes.paper}>
				<Avatar className={classes.avatar} />
				<Typography component="h1" variant="h5">
					Register
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="Name"
								autoFocus
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								minLength="8"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password2"
								label="Retype password"
								type="password"
								id="password2"
								minLength="8"
								value={password2}
								onChange={(e) => setPassword2(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleRegister}>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/login">
								<Typography href="#" variant="body2">
									Already have an account? Sign in
								</Typography>
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default Register;
