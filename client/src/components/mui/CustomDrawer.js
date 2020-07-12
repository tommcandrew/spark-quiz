import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  Typography
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

  return (
    <div>
      <div className={clsx(classes.toolbar, classes.center)}>
        <img src={Logo} className={classes.logo} alt="" />
      </div>
      <Divider />
      <div className={classes.list}>
        <List component="nav" aria-label="side drawer">
          <Link to={`${url}`} onClick={clearQuizState} style={{textDecoration: "none"}}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="button" color="textPrimary">Home</Typography>}/>
            </ListItem>
          </Link>

          <Link to={`${url}/myquizzes`} onClick={clearQuizState} style={{textDecoration: "none"}}>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="button" color="textPrimary">My quizzes</Typography>}/> 
            </ListItem>
          </Link>

          <Link to={`${url}/createquiz`} onClick={clearQuizState} style={{textDecoration: "none"}}>
            <ListItem button>
              <ListItemIcon>
                <LibraryAddIcon color="primary"/>
              </ListItemIcon>
              <ListItemText primary={<Typography variant="button" color="textPrimary">Create new quiz</Typography>} />
            </ListItem>
          </Link>

          <Link to={`${url}/contacts`} onClick={clearQuizState} style={{textDecoration: "none"}}>
            <ListItem button>
              <ListItemIcon>
                <EmojiPeopleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="button" color="textPrimary">Contacts</Typography>}/>
            </ListItem>
          </Link>

          <Link to={`${url}/groups`} onClick={clearQuizState} style={{textDecoration: "none"}}>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="button" color="textPrimary">Groups</Typography>}/> 
            </ListItem>
          </Link>

          <Link to={`${url}/myAccount`} onClick={clearQuizState} style={{textDecoration: "none"}}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="button" color="textPrimary">My account</Typography>}/>
            </ListItem>
          </Link>
        </List>
      </div>
    </div>
  );
};

export default CustomDrawer;
