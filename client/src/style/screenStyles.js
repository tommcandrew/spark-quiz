import { makeStyles } from "@material-ui/core/styles";

export const screenLayoutStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: "20px",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.down("sm")]: {
			padding: "0px"
		}
	}
}));

export const userQuizzesScreenStyle = makeStyles((theme) => ({
	titleContainer: {
		marginBottom: "10px !important",
		[theme.breakpoints.down("md")]: {
			marginTop: "20px !important"
		}
	},
	card: {
		width: "300px",
		height: "200px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: theme.palette.background.default,
		borderRadius: "10px",
		padding: "10px 3px"
	},
	cardGridItem: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	list: {
		margin: "auto",
		overflowX: "hidden",
		width: "100%",
		padding: "20px",
		maxHeight: "80%",
		marginTop: "5px !important",
		[theme.breakpoints.down("md")]: {
			marginTop: "0",
			paddingTop: "15px",
			maxHeight: "90%"
		}
	},
	quizName: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-end"
		//color: "#fff"
	},
	cardActions: {
		width: "100%",
		display: "flex",
		justifyContent: "space-evenly"
	}
}));

export const createQuizScreenStyles = makeStyles((theme) => ({
	title1Container: {
		marginBottom: "10px !important",
		[theme.breakpoints.down("md")]: {
			marginTop: "20px !important"
		}
	},
	noQuizContainer: {
		margin: "auto",
		overflowX: "hidden",
		width: "100%",
		padding: "20px",
		maxHeight: "80%",
		marginTop: "5px !important",
		[theme.breakpoints.down("md")]: {
			marginTop: "0",
			paddingTop: "15px",
			maxHeight: "90%"
		}
	},
	textField: {
		[theme.breakpoints.down("sm")]: {
			width: "90%"
		}
	},
	quizSubjectText: {
		[theme.breakpoints.down("sm")]: {
			marginTop: "15px"
		}
	},
	quizNameContainer: {
		display: "flex",
		justifyContent: "center"
	},
	makeNewQuizContainer: {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		justifyContent: "space-between",
		[theme.breakpoints.down("sm")]: {
			paddingTop: "10px"
		}
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(0)
		}
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: "10px",
		paddingBottom: "10px",
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.down("md")]: {
			justifyContent: "center",
			alignItems: "flex-start",
			padding: "10px",
			flex: 0
		},
		[theme.breakpoints.down("sm")]: {
			padding: "4px",
			paddingBottom: "0px"
		}
	},
	titleContainer: {
		marginTop: "10px",
		marginRight: "3px",
		marginLeft: "3px",
		width: "90%",
		[theme.breakpoints.down("md")]: {
			marginTop: "0"
		},
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			width: "100%",
			alignItems: "flex-start",
			marginBottom: "0px"
		}
	},
	titleNameContainer: {
		display: "flex",
		alignItems: "flex-end",
		[theme.breakpoints.down("md")]: {
			flexDirection: "row",
			justifyContent: "center",
			marginTop: "5px",
			textAlign: "center"
		}
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end",
		width: "90%",
		[theme.breakpoints.down("md")]: {
			flexDirection: "row",
			justifyContent: "center",
			width: "100%",
			marginTop: "10px"
		}
	},
	button: {
		marginRight: "10px",
		[theme.breakpoints.down("md")]: {
			margin: "10px",
			width: "100%"
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "0.75em",
			margin: "0px",
			borderRadius: "0"
		}
	},

	gridItem: {
		padding: "10px"
	},
	previewQuestionsContainer: {
		flex: 1,
		marginTop: "10px"
	}
}));

export const contactsScreenStyles = makeStyles((theme) => ({
	titleContainer: {
		marginBottom: "10px !important",
		[theme.breakpoints.down("md")]: {
			marginTop: "20px !important"
		}
	},

	 contactsMainContainer: {
    height: "100%",
    padding: "20px",
},

  contactsContainer: {
    height: "80%",
    overflowY: "scroll",
    width: "100%",
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "20px",
    // boxShadow: "0px 3px 15px rgba(0,0,0,0.2)"
    [theme.breakpoints.down("xs")]: {
      border: "none",
       
    },
  
	},
	gridItem: {
		height: "200px",
		marginBottom: "10px"
	},

	paper: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		height: "100%",
		backgroundColor: theme.palette.background.default
	}
}));
