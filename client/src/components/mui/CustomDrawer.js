import React from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { List, ListItemIcon, ListItemText, ListItem, Divider, Typography, Avatar } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import CallIcon from "@material-ui/icons/Call";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logo from "../../assets/images/logo.png";

import { useStyles } from "../../style/dashboardStyles";

const CustomDrawer = ({ url, clearQuizState }) => {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.toolbar}>{/* <img src={logo} className={classes.logo} alt="" /> */}</div>
			<div className={classes.list}>
				<List component="nav" aria-label="side drawer">
					{/* <Link to={`${url}`} onClick={clearQuizState} style={{ textDecoration: "none" }}>
						<ListItem button>
							<ListItemIcon>
								<HomeIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography variant="button" color="textPrimary">
										Home
									</Typography>
								}
							/>
						</ListItem>
					</Link> */}

					<ListItem style={{ padding: 0, margin: 0 }}>
						<NavLink
							activeClassName={classes.active}
							to={`${url}/myquizzes`}
							onClick={clearQuizState}
							style={{
								textDecoration: "none",
								width: "100%",
								height: "100%",
								display: "flex",
								padding: "10px 20px",
								alignItems: "center",
								justifyContent: "space-evenly"
							}}>
							<ListItemIcon variant="button">
								<MenuBookIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography variant="button" color="textPrimary">
										My quizzes
									</Typography>
								}
							/>{" "}
						</NavLink>
					</ListItem>

					<ListItem style={{ padding: 0, margin: 0 }}>
						<NavLink
							activeClassName={classes.active}
							to={`${url}/createquiz`}
							onClick={clearQuizState}
							style={{
								textDecoration: "none",
								width: "100%",
								height: "100%",
								display: "flex",
								padding: "10px 20px",
								alignItems: "center",
								justifyContent: "space-evenly"
							}}>
							<ListItemIcon variant="button">
								<LibraryAddIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography variant="button" color="textPrimary">
										Create new quiz
									</Typography>
								}
							/>{" "}
						</NavLink>
					</ListItem>

					<ListItem style={{ padding: 0, margin: 0 }}>
						<NavLink
							activeClassName={classes.active}
							to={`${url}/contacts`}
							onClick={clearQuizState}
							style={{
								textDecoration: "none",
								width: "100%",
								height: "100%",
								display: "flex",
								padding: "10px 20px",
								alignItems: "center",
								justifyContent: "space-evenly"
							}}>
							<ListItemIcon>
								<EmojiPeopleIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography variant="button" color="textPrimary">
										Contacts
									</Typography>
								}
							/>
						</NavLink>
					</ListItem>

					<ListItem style={{ padding: 0, margin: 0 }}>
						<NavLink
							activeClassName={classes.active}
							to={`${url}/groups`}
							onClick={clearQuizState}
							style={{
								textDecoration: "none",
								width: "100%",
								height: "100%",
								display: "flex",
								padding: "10px 20px",
								alignItems: "center",
								justifyContent: "space-evenly"
							}}>
							<ListItemIcon>
								<CallIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography variant="button" color="textPrimary">
										Groups
									</Typography>
								}
							/>
						</NavLink>
					</ListItem>

					<ListItem style={{ padding: 0, margin: 0 }}>
						<NavLink
							activeClassName={classes.active}
							to={`${url}/myAccount`}
							onClick={clearQuizState}
							style={{
								textDecoration: "none",
								width: "100%",
								height: "100%",
								display: "flex",
								padding: "10px 20px",
								alignItems: "center",
								justifyContent: "space-evenly"
							}}>
							<ListItemIcon>
								<AccountCircleIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography variant="button" color="textPrimary">
										My account
									</Typography>
								}
							/>
						</NavLink>
					</ListItem>
				</List>
			</div>
		</div>
	);
};

export default CustomDrawer;
