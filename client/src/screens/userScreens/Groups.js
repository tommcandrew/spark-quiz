import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddGroupModal from "../../components/UI/AddGroupModal";
import Modal from "react-modal";
import * as userActions from "../../store/actions/quizzesListActions";
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
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const dispatch = useDispatch();
  const [membersToAdd, setMembersToAdd] = useState([]);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    //update selectedgroup after user is updated so changes are reflected in GroupInfoModal
    if (user) {
      setSelectedGroup(
        user.groups.filter((group) => group._id === selectedGroupId)[0]
      );
    }
  }, [user, selectedGroupId]);

  const handleDeleteGroup = () => {
    dispatch(userActions.deleteGroup(selectedGroup._id));
    setSelectedGroupId(null);
  };

  const handleDeleteMember = (memberId) => {
    dispatch(userActions.deleteMember(selectedGroup._id, memberId));
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
    if (membersToAdd.length > 0) {
      dispatch(userActions.updateGroup(selectedGroup._id, membersToAdd));
    }
    setSelectedGroupId(null);
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
                onClick={() => setSelectedGroupId(group._id)}
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
          selectedGroup={selectedGroup}
          setSelectedGroupId={setSelectedGroupId}
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
