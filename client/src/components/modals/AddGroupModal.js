import React, { useState } from "react";
import * as userActions from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { modalRootStyles, addContactModalStyles  } from "../../style/modalStyles";
import CustomSnackbar from "../../components/mui/Snackbar";
import {
  Grid,
  Typography,
  Divider,
  Button,
  TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import V from "max-validator";

//MAIN
const AddGroupModal = ({ closeModal, user }) => {
  const rootClasses = modalRootStyles();
  const classes = addContactModalStyles();
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState("");
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [groupName, setGroupName] = useState("");

  //HOOKS

  //HANDLERS
  const handleAddContact = (e) => {
    const selectedContact = JSON.parse(e.target.value);
    if (e.target.checked) {
      setGroupMemberList([...groupMemberList, selectedContact]);
    } else {
      const updatedList = groupMemberList.filter(
        (member) => member._id !== selectedContact._id
      );
      setGroupMemberList(updatedList);
    }
  };

  const handleSubmit = (e) => {
    setValidationError("");
    e.preventDefault();
    let existingGroups = [];
    user.groups.forEach((group) => existingGroups.push(group.name));
    if (existingGroups.includes(groupName)) {
      setValidationError("A group with that name already exists.");
      return;
    }
    const result = V.validate(
      { groupName },
      { groupName: "required|string|min:2|max:15" }
    );
    if (result.hasError) {
      setValidationError(result.getError("groupName"));
      return;
    } else {
      if (groupMemberList.length === 0) {
        setValidationError("A group must contain atleast one participant");
        return;
      } else {
        const group = {
          name: groupName,
          contacts: groupMemberList,
        };
        dispatch(userActions.addGroup(group));
        closeModal();
      }
    }
  };
  //RETURN
  return (
    <div className={rootClasses.root}>
      {validationError !== "" && (
        <CustomSnackbar
          severity="error"
          message={validationError}
          handleClose={() => setValidationError("")}
        />
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justify="center" >
          <Grid item xs={12}>
            <Typography
              variant="h5"
              color="primary"
              style={{ textAlign: "center" }}
            >
              Create a group
            </Typography>
            <Divider variant="middle" />
          </Grid>

          <Grid item xs={12} sm={6} className={classes.label} >
            <Typography>Group Name: </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.input}>
            <TextField
              variant="outlined"
              id="name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Grid>
          {user &&
            user.contacts &&
            <Grid item container XL={12} spacing={2} className={classes.nonGroupMembersContainer}>
            {
              user.contacts.map((contact, index) => (
              <Grid item lg={3} key={index}>
              
                <input
                  type="checkbox"
                    name={contact}
                    color="secondary"
                  onChange={handleAddContact}
                  style={{marginRight: "5px"}}
                  value={JSON.stringify(contact)}
                />  <label htmlFor={contact.name}>{contact.name}</label>
              </Grid>
            ))
            }
            </Grid>
          
            }
          <Grid item xl={12} container spacing={2} />
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => {
                closeModal();
              }}
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<CloseIcon />}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddGroupModal;
