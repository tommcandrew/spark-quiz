import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authActions";
import { Button, CssBaseline, TextField, Grid, Typography, Container, Avatar } from "@material-ui/core";
import { useStyles } from "../../style/authScreensStyles";

const Login = (props) => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const [ email, setEmail ] = useState("testuser@test.com");
	const [ password, setPassword ] = useState("12345678");
	const { from } = props.location.state || { from: { pathname: "/dashboard" } };

	//HANDLERS
	const loginHandler = async () => {
		const loginData = { email, password };
		await dispatch(authActions.login(loginData));
		props.history.push(from);
	};

	//MAIN
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar} />
				<Typography component="h1" variant="h5">
					SignIn
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
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
						<Grid item xs={12}>
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
					</Grid>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={loginHandler}>
						Sign In
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/register">
								<Typography href="#" variant="body2">
									Don"t have an account? Sign up
								</Typography>
							</Link>
						</Grid>
					</Grid>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/forgotPassword">
								<Typography href="#" variant="body2">
									I forgot my password
								</Typography>
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default Login;
