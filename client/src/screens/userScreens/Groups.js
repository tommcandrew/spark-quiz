import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddGroupModal from "../../components/UI/AddGroupModal";
import Modal from "react-modal";
import * as userActions from "../../store/actions/userActions";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import GroupInfoModal from "../../components/UI/GroupInfoModal";
import "./Groups.css";
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: "30px",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  card: {
    minWidth: 275,
    margin: "5px",
  },
}));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "70%",
    width: "80%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
  },
  overlay: { zIndex: 2000 },
};

const Groups = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const dispatch = useDispatch();
  const [membersToAdd, setMembersToAdd] = useState([]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDeleteGroup = () => {
    dispatch(userActions.deleteGroup(selectedGroup._id));
    setSelectedGroup(null);
  };

  const handleDeleteMember = (memberId) => {
    dispatch(userActions.deleteMember(selectedGroup._id, memberId));
    //unfortunately "selectedGroup" doesn't update after adding/removing members so the GroupInfoModal does not reflect changes until refresh
  };

  const handleAddMember = (e) => {
    const selectedContactId = e.target.value;
    const selectedContact = user.contacts.find(
      (contact) => contact._id === selectedContactId
    );

    if (e.target.checked) {
      setMembersToAdd([...membersToAdd, selectedContact]);
    } else {
      setMembersToAdd(
        membersToAdd.filter((member) => member._id !== selectedContactId)
      );
    }
  };

  const handleUpdateGroup = () => {
    dispatch(userActions.updateGroup(selectedGroup._id, membersToAdd));
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} xl={12}>
        <Typography variant="h5" align="center">
          Groups
        </Typography>
      </Grid>
      <Grid item container xl={12} spacing={2}>
        {user &&
          user.groups &&
          user.groups.map((group, index) => {
            return (
              <Grid
                item
                lg={2}
                key={index}
                onClick={() => setSelectedGroup(group)}
                className="groups__group"
              >
                {group.name}
              </Grid>
            );
          })}
      </Grid>
      <button onClick={() => setIsOpen(true)} type="button">
        Add Group
      </button>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <AddGroupModal closeModal={closeModal} user={user} />
        </Modal>
      )}
      {selectedGroup && (
        <GroupInfoModal
          group={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          handleDeleteGroup={handleDeleteGroup}
          handleDeleteMember={handleDeleteMember}
          handleAddMember={handleAddMember}
          user={user}
          handleUpdateGroup={handleUpdateGroup}
        />
      )}
    </Grid>
  );
};

export default Groups;
