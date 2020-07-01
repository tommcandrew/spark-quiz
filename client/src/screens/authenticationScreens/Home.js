import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, CssBaseline, Container, Typography, TextField } from "@material-ui/core/";
import {useStyles} from "../../style/authScreensStyles"
import logo from "../../assets/logo1.png";
import * as authActions from "../../store/actions/authActions";
import { useDispatch } from "react-redux";

const Home = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();


  //HANDLERS
	const studentLoginHandler = async (e) => {
		e.preventDefault();
		const studentCode = e.target.code.value;
		await dispatch(authActions.studentLogin(studentCode));
		props.history.push("/quiz");
		//don't forget error handling
	};

  //MAIN
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar alt="logo" src={logo} width={50} height={50} className={classes.large} variant="square" />
				<Typography component="h1" variant="h5">
					Hello There!
				</Typography>
				<form className={classes.form} noValidate onSubmit={studentLoginHandler}>
					<Link to="/login">
						<Button type="submit" fullWidth variant="outlined" color="primary" className={classes.actionButton}>
							SignIn
						</Button>
					</Link>
					<Link to="/register">
						<Button type="submit" fullWidth variant="outlined" color="primary" className={classes.actionButton}>
							Register
						</Button>
					</Link>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						id="code"
						label="Have a code?"
						name="code"
						autoFocus
					/>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Go
					</Button>
				</form>
			</div>
		</Container>
	);
};


export default Home;
