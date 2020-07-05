import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
} from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Logo from "../../assets/images/logo1.png";
import { useStyles } from "../../style/drawerStyles";

const CustomDrawer = ({ url, clearQuizState }) => {
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState("");

  return (
    <div>
      <div className={clsx(classes.toolbar, classes.center)}>
        <img src={Logo} className={classes.logo} alt="" />
      </div>
      <Divider />
      <div className={classes.list}>
        <List component="nav" aria-label="side drawer">
          <Link to={`${url}`} onClick={clearQuizState}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Random" />
            </ListItem>
          </Link>

          <Link to={`${url}/myquizzes`} onClick={clearQuizState}>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="My Quizzes" />
            </ListItem>
          </Link>

          <Link to={`${url}/createquiz`} onClick={clearQuizState}>
            <ListItem button>
              <ListItemIcon>
                <LibraryAddIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Create new quiz" />
            </ListItem>
          </Link>

          <Link to={`${url}/contacts`} onClick={clearQuizState}>
            <ListItem button>
              <ListItemIcon>
                <EmojiPeopleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItem>
          </Link>

          <Link to={`${url}/groups`} onClick={clearQuizState}>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItem>
          </Link>

          <Link to={`${url}/myAccount`} onClick={clearQuizState}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon color="secondary" />
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
