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
  const recipientsList = useSelector((state) => state.quiz.quizInvites);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  console.log("recipient list in the start: " + recipientsList)

  const getUser = async() =>{
		await dispatch(authActions.loadUser());
	}

	useEffect(
		() => {
			if (!user) {
				getUser();
			}
		},
		[ user, getUser ]
	);

  //will get groups later
  const groups = [];

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
    const selectedContactId= e.target.value;
    const selectedContact = user.contacts.find(
      (contact) => contact._id === selectedContactId
    );


    if (e.target.checked) {
      setRecipientsContacts([...recipientsContacts, selectedContact]);
    } else {
      setRecipientsContacts(
        recipientsContacts.filter(
          (recipient) => recipient._id !== selectedContactId
        )
      );
    }
  };

   const handleComplete = () => {
    if (recipientsContacts.length === 0 && recipientsGroups.length === 0) {
      alert("Please add a recipient");
    } else {
      const newRecipientsList = recipientsList.concat(recipientsContacts);
       if (recipientsGroups.length > 0) {
        recipientsGroups.map((group) => { 
          group.contacts = JSON.parse(group.contacts);
          group.contacts.map((contactIdsInRecipientsGroups) => {
            let contactData = user.contacts.find(c => c._id === contactIdsInRecipientsGroups)
          newRecipientsList.push(contactData)
          })
        })}
        console.log(newRecipientsList)

        const uniqueArray = [...new Map(newRecipientsList.map(item => [item._id, item])).values()]
        console.log(uniqueArray)
     }
     closeModal()
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
              {user && user.groups && user.groups.map((group, index) => {
                let isChecked = false;
                for (let i = 0; i < recipientsGroups.length; i++) {
                  if (recipientsGroups[i].name === group.name) {
                    isChecked = true;
                  }
                }
                return (
                  <div key={index}>
                    <label htmlFor={group.name}>{group._id}</label>
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
            <>
              <ul>
                {user &&
                  user.contacts &&
                  user.contacts.map((contact, index) => {
                    let isChecked = false;
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
            </>
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
