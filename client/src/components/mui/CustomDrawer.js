import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { List, ListItemIcon, ListItemText, ListItem, Divider } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Logo from "../../assets/logo1.png";
import { useStyles } from "../../style/drawerStyles";

const CustomDrawer = ({ url, clearQuizState }) => {
	const classes = useStyles();
	return (
		<div>
			<div className={clsx(classes.toolbar, classes.center)}>
				<img src={Logo} className={classes.logo} alt="" />
			</div>
			<Divider />
			<div className={classes.list}>
				<List component="nav" aria-label="side drawer">
					<Link to={`${url}`}>
						<ListItem button>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Random" />
						</ListItem>
					</Link>

					<Link to={`${url}/myquizzes`}>
						<ListItem button>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<ListItemText primary="My Quizzes" />
						</ListItem>
					</Link>

					<Link to={`${url}/createquiz`} onClick={clearQuizState}>
						<ListItem button>
							<ListItemIcon>
								<LibraryAddIcon />
							</ListItemIcon>
							<ListItemText primary="Create new quiz" />
						</ListItem>
					</Link>

					<Link to={`${url}/contacts`}>
						<ListItem button>
							<ListItemIcon>
								<EmojiPeopleIcon />
							</ListItemIcon>
							<ListItemText primary="Contacts" />
						</ListItem>
					</Link>

					<Link to={`${url}/groups`}>
						<ListItem button>
							<ListItemIcon>
								<PeopleIcon />
							</ListItemIcon>
							<ListItemText primary="Groups" />
						</ListItem>
					</Link>

					<Link to={`${url}/myAccount`}>
						<ListItem button>
							<ListItemIcon>
								<AccountCircleIcon />
							</ListItemIcon>
							<ListItemText primary="My Account" />
						</ListItem>
					</Link>
				</List>
			</div>
		</div>
	);
};

export default CustomDrawer;