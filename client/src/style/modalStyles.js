import { makeStyles } from "@material-ui/core/styles";

export const modalRootStyles = makeStyles((theme) => ({
	root: {
		flex: 1,
		padding: "10px",
		overflowX: "hidden",
		overflowY: "hidden"
	}
}));

export const quizOptionsModalStyles = makeStyles((theme) => ({}));

export const addQuestionModalStyles = makeStyles((theme) => ({
	root: {
		maxHeight: "75%",
    overflowY: "hidden",
    overflowX: "hidden"
  },

  scrollContainer: {
    maxHeight: "80%",
    height: "500px",
    overflowX: "hidden",
		overflowY: "scroll",
    marginTop: "2px",
    width: "100%"
  },
  	label: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			alignItems: "flex-end",
			justifyContent: "center",
			padding: "8px"
		}
	},
	input: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			justifyContent: "center"
		}
	},
	card: {
		height: "280px",
		margin: "auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	addedMediaContainer: {
		width: "75%",
		height: "75%"
	},
	addedMedia: {
		height: "100%",
		width: "100%"
	},
	cardActions: {
		width: "100%"
	},
	textArea: {
		borderBottom: "1px solid black",
		pading: "5px",
		maxlength: "100",
		width: "100%",
		width: "100%"
	}
}));

export const shareModalStyles = makeStyles((theme) => ({
	container: {
		width: "100%",
		border: `1px solid ${theme.palette.primary.main}`,
		borderTop: 0,
		height: "200px",
		overflowY: "scroll",
		boxShadow: "0 3px 3px rgba(0,0,0,0.2)"
	}
}));

export const addContactModalStyles = makeStyles((theme) => ({
	label: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			alignItems: "flex-end",
			justifyContent: "center",
			padding: "8px"
		}
	},
	input: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			justifyContent: "center"
		}
	},
	button: {
		[theme.breakpoints.down("xs")]: {
			width: "100%"
		}
	},
	nonGroupMembersContainer: {
		border: `1px solid ${theme.palette.primary.main}`,
		borderRadius: "3px",
		height: "180px",
		maxHeight: "30%",
		overflowY: "scroll",
		marginTop: "2px"
	}
}));
