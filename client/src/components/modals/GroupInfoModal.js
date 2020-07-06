import React, { useState } from "react";
import { modalRootStyles } from "../../style/modalStyles";
import CustomSnackbar from "../../components/mui/Snackbar";
import { Grid, Typography, Divider, Button, Card, TextField, CardActionArea } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import V from "max-validator";
import { contactValidation } from "../../utils/validation";

const GroupInfoModal = ({
	selectedGroup,
	setSelectedGroupId,
	handleDeleteGroup,
	handleDeleteMember,
	user,
	handleUpdateGroup,
	handleAddMember
}) => {
	let groupMembers = [];
	const [ validationError, setValidationError ] = useState("");
	const rootClasses = modalRootStyles();
	selectedGroup.contacts.forEach((contact) => {
		groupMembers.push(contact._id);
	});
	let nonGroupContacts = user.contacts.filter((contact) => !groupMembers.includes(contact._id));

	return (
		<div className={rootClasses.root}>
			{validationError !== "" && (
				<CustomSnackbar severity="error" message={validationError} handleClose={() => setValidationError("")} />
			)}

				<Grid container spacing={3} justify="center" alignItems="flex-start">
					<Grid item xs={12}>
						<Typography variant="h5" color="secondary" style={{ textAlign: "center" }}>
							Group Detail
						</Typography>
						<Divider variant="middle" />
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography>Name: </Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField variant="outlined" id="name" name="name" defaultValue={selectedGroup.name} />
					</Grid>
					<Grid item xl={12} container spacing={2}>
						<Grid item xs={12}>
							Group Members:
						</Grid>
						{selectedGroup.contacts.map((contact, index) => (
							<Grid item xs={6} md={3} key={index}>
								<Card>
									<Typography>Member: {contact.name}</Typography>
									<Button onClick={() => handleDeleteMember(contact._id)}>remove</Button>
								</Card>
							</Grid>
            ))}
            
          

<Grid item xl={12} container spacing={2}>
						<Grid item xs={12}>
              Add Members:
						</Grid>
            {nonGroupContacts &&
              nonGroupContacts.map((contact, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <label htmlFor={contact.name}>{contact.name}</label>
                  <input
                    type="checkbox"
                    onChange={handleAddMember}
                    value={contact._id}
                  />
                </Grid>
              ))}



            <Grid item xl={12} container spacing={2}>
              <Grid item md={6}>
<Button type="button" onClick={handleDeleteGroup}>
            Delete group
          </Button>
              </Grid>
               <Grid item md={6}>
                <Button onClick={() => setSelectedGroupId(null)}>
              Cancel
            </Button>
              </Grid>

</Grid>
            

          
      
         
          </Grid>
        </Grid>
      </Grid>
      </div>
	);
};

export default GroupInfoModal;
