import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, Tab, Tabs, AppBar, Box } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import * as quizActions from "../../store/actions/quizActions";
import * as authActions from "../../store/actions/authActions";

//MUI TAB FUNCTIONS
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

//STYLES
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    marginTop: "10px",
  },
}));

//MAIN
const ShareModal = ({ quizId, closeModal }) => {
  const classes = useStyles();
  const [recipientsContacts, setRecipientsContacts] = useState([]);
  const [recipientsGroups, setRecipientsGroups] = useState([]);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const quiz = useSelector((state) => state.quiz);
  const getUser = async () => {
    await dispatch(authActions.loadUser());
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
    //eslint-disable-next-line
  }, []);

  //add previously invited students to recipients list
  useEffect(() => {
    if (quiz) {
      setRecipientsContacts(quiz.quizInvites.map((invite) => invite.id));
    }
    //eslint-disable-next-line
  }, []);

  //HANDLERS
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleaddGroup = (e) => {
    const selectedGroupId = e.target.value;
    const selectedGroup = user.groups.find(
      (group) => group._id === selectedGroupId
    );

    if (e.target.checked) {
      setRecipientsGroups([...recipientsGroups, selectedGroup]);
    } else {
      setRecipientsGroups(
        recipientsGroups.filter(
          (recipient) => recipient._id !== selectedGroupId
        )
      );
    }
  };

  const handleAddContact = (e) => {
    const selectedContactId = e.target.value;
    const selectedContact = user.contacts.find(
      (contact) => contact._id === selectedContactId
    );

    if (e.target.checked) {
      setRecipientsContacts([...recipientsContacts, selectedContact._id]);
    } else {
      setRecipientsContacts(
        recipientsContacts.filter((id) => id !== selectedContactId)
      );
    }
  };

  const handleComplete = () => {
    let newRecipientsList = [...recipientsContacts];
    recipientsContacts.forEach((contact) => {
      newRecipientsList.push(contact._id);
    });

    if (recipientsGroups.length > 0) {
      recipientsGroups.forEach((group) => {
        group.contacts.forEach((contact) => {
          newRecipientsList.push(contact);
        });
      });
    }

    newRecipientsList = [...new Set(newRecipientsList)]; //aray of non duplicate selected contact ids
    let quizInvites = [];
    let quizCodes = [];
    newRecipientsList.forEach((r) => {
      user.contacts.forEach((u) => {
        if (u._id === r) {
          quizInvites.push({
            email: u.email,
            name: u.name,
            //I'm adding ID field here to be able to check if contact rendered in list has already been invited or not
            //using both "id" and "_id" is not ideal!
            id: u._id,
            //when adding someone to invites array, in DB they seem to be assigned a Mongo ID which I don't understand
          });
          quizCodes.push({
            //maybe use a library or something for more secure code
            code: Math.floor(Math.random() * 1000),
            contactId: u._id,
          });
        }
      });
    });

    dispatch(quizActions.updateQuiz(quizId, { quizInvites: quizInvites })); //QUIZ INVITES SENT
    dispatch(quizActions.updateQuiz(quizId, { quizCodes: quizCodes }));

    closeModal();
  };

  //RETURN
  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center">
        Share
      </Typography>
      <div>
        {recipientsContacts &&
          recipientsContacts.length > 0 &&
          recipientsContacts.map((recipient, index) => (
            <span key={index}>{recipient.name}</span>
          ))}
        {recipientsGroups &&
          recipientsGroups.length > 0 &&
          recipientsGroups.map((recipient, index) => (
            <span key={index}>{recipient.name}</span>
          ))}
      </div>
      <div className={classes.container}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            textColor="primary"
            aria-label="full width tabs example"
          >
            <Tab label="Groups" {...a11yProps(0)} />
            <Tab label="Contacts" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ul>
              {/* THIS WILL BE CHANGED TO MUI LIST */}
              {user &&
                user.groups &&
                user.groups.map((group, index) => {
                  let isChecked = false;
                  for (let i = 0; i < recipientsGroups.length; i++) {
                    if (recipientsGroups[i].name === group.name) {
                      isChecked = true;
                    }
                  }
                  return (
                    <div key={index}>
                      <label htmlFor={group.name}>{group.name}</label>
                      <input
                        type="checkbox"
                        id={group._id}
                        onChange={handleaddGroup}
                        value={group._id}
                        checked={isChecked}
                      />
                    </div>
                  );
                })}
            </ul>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ul>
              {user &&
                user.contacts &&
                user.contacts.map((contact, index) => {
                  let isChecked = recipientsContacts.includes(contact._id);

                  for (let i = 0; i < recipientsContacts.length; i++) {
                    if (recipientsContacts[i].name === contact.name) {
                      isChecked = true;
                    }
                  }
                  return (
                    <div key={index}>
                      <label htmlFor={contact.name}>{contact.name}</label>
                      <input
                        type="checkbox"
                        id={contact._id}
                        onChange={handleAddContact}
                        value={contact._id}
                        checked={isChecked}
                      />
                    </div>
                  );
                })}
            </ul>
          </TabPanel>
        </SwipeableViews>
      </div>
      <div>
        <button type="button" onClick={handleComplete}>
          Done
        </button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
