import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  Typography,
  Avatar,
} from "@material-ui/core";
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
      <div className={classes.toolbar}>
        {/* <img src={logo} className={classes.logo} alt="" /> */}
      </div>
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

          <Link
            to={`${url}/myquizzes`}
            onClick={clearQuizState}
            style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon>
                <MenuBookIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="button" color="textPrimary">
                    My quizzes
                  </Typography>
                }
              />
            </ListItem>
          </Link>

          <Link
            to={`${url}/createquiz`}
            onClick={clearQuizState}
            style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon>
                <LibraryAddIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="button" color="textPrimary">
                    Create new quiz
                  </Typography>
                }
              />
            </ListItem>
          </Link>

          <Link
            to={`${url}/contacts`}
            onClick={clearQuizState}
            style={{ textDecoration: "none" }}
          >
            <ListItem button>
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
            </ListItem>
          </Link>

          <Link
            to={`${url}/groups`}
            onClick={clearQuizState}
            style={{ textDecoration: "none" }}
          >
            <ListItem button>
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
            </ListItem>
          </Link>

          <Link
            to={`${url}/myAccount`}
            onClick={clearQuizState}
            style={{ textDecoration: "none" }}
          >
            <ListItem button>
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
            </ListItem>
          </Link>
        </List>
      </div>
    </div>
  );
};

export default CustomDrawer;
