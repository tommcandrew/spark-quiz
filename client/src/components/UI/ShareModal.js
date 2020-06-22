import React, { useState, Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {Typography, Tab, Tabs, AppBar, Box } from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import {groups, contacts} from "../../dummy-data/contacts"

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex:1
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    marginTop: "10px"

  },
}));




const handleCloseModal = () => {
  //clear recipients from state and close modal
};

const ShareModal = () => {
  const classes = useStyles();
  const [recipients, setRecipients] = useState([]);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleaddGroup = (e) => {
    const selectedGroupName = e.target.value;
    const selectedGroup = groups.find(
      (group) => group.name === selectedGroupName
    );

    if (e.target.checked) {
      setRecipients([...recipients, selectedGroup]);
    } else {
      setRecipients(
        recipients.filter((recipient) => recipient.name !== selectedGroupName)
      );
    }
  };

  const handleAddContact = (e) => {
    const selectedContactName = e.target.value;
    const selectedContact = contacts.find(
      (contact) => contact.name === selectedContactName
    );

    if (e.target.checked) {
      setRecipients([...recipients, selectedContact]);
    } else {
      setRecipients(
        recipients.filter((recipient) => recipient.name !== selectedContactName)
      );
    }
  };

  const handleComplete = () => {
    if (recipients.length === 0) {
      alert("Please add a recipient");
    }
    //close modal but keep recipients in state until publishing quiz
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center">Share</Typography>
       <div>
        {recipients &&
          recipients.length > 0 &&
          recipients.map((recipient, index) => (
            <span key={index}>{recipient.name}</span>
          ))}
      </div>
      <div className={classes.container}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
            aria-label="full width tabs example"
            centered
        >
          <Tab label="Groups" {...a11yProps(0)} />
          <Tab label="Contacts" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction} >
          <div>
        <h2>Groups</h2>
        <ul>
          {groups.map((group, index) => (
            <div key={index}>
              <label htmlFor={group.name}>{group.name}</label>
              <input
                type="checkbox"
                id={group.name}
                onChange={handleaddGroup}
                value={group.name}
              />
            </div>
          ))}
        </ul>
      </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
              <div>
        <h2>Contacts</h2>
        <ul>
          {contacts.map((contact, index) => (
            <div key={index}>
              <label htmlFor={contact.name}>{contact.name}</label>
              <input
                type="checkbox"
                id={contact.name}
                onChange={handleAddContact}
                value={contact.name}
               
              />
            </div>
          ))}
        </ul>
      </div>
        </TabPanel>
      </SwipeableViews>
      </div>
        <div>
        <button type="button" onClick={handleComplete}>
          Done
        </button>
        <button type="button" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>

    </div>

      // <h2>Share</h2>
      // <div>
      //   {recipients &&
      //     recipients.length > 0 &&
      //     recipients.map((recipient, index) => (
      //       <span key={index}>{recipient.name}</span>
      //     ))}
      // </div>

      // <div>
      //   <h2>Groups</h2>
      //   <ul>
      //     {groups.map((group, index) => (
      //       <div key={index}>
      //         <label htmlFor={group.name}>{group.name}</label>
      //         <input
      //           type="checkbox"
      //           id={group.name}
      //           onChange={handleaddGroup}
      //           value={group.name}
      //         />
      //       </div>
      //     ))}
      //   </ul>
      // </div>

      // <div>
      //   <h2>Contacts</h2>
      //   <ul>
      //     {contacts.map((contact, index) => (
      //       <div key={index}>
      //         <label htmlFor={contact.name}>{contact.name}</label>
      //         <input
      //           type="checkbox"
      //           id={contact.name}
      //           onChange={handleAddContact}
      //           value={contact.name}
      //         />
      //       </div>
      //     ))}
      //   </ul>
      // </div>

      // <div>
      //   <button type="button" onClick={handleComplete}>
      //     Done
      //   </button>
      //   <button type="button" onClick={handleCloseModal}>
      //     Cancel
      //   </button>
      // </div>
  );
};

export default ShareModal;
