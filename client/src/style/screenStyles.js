import { makeStyles } from "@material-ui/core/styles";

export const screenLayoutStyles = makeStyles({
root: {
		flexGrow: 1,
		padding: "20px",
		height: "100%",
		display: "flex",
		flexDirection: "column"
	},
})

export const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		alignItems: "flex-start",
		justifyContent: "center",
		padding: "20px",
    display: "inline",
    maxWidth: "60%",
    maxHeight: "65%",
	},
	overlay: { zIndex: 2000 }
};


export const userQuizzesScreenStyle = makeStyles(theme=> ({
	card: {
		maxWidth: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		background: "rgb(131,168,250)",
		background: "linear-gradient(104deg, rgba(131, 168, 250, 1) 6%, rgba(112, 148, 246, 1) 67%)", 
		color: "#FFF",
		padding: theme.spacing(2)
		
	},
	list: {
		 flex: "0 0 90%",
		overflowY: "scroll",
		overflowX: "hidden",
	},

	quizName: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-end",
		color: "#FFF !important"
	}, 
	button: {
		color: "#FFF"
	}
}));


export const createQuizScreenStyles = makeStyles((theme) => ({
	quizNameContainer: {
		display: "flex",
		justifyContent: "center"
	},
	makeNewQuizContainer: {
		width: "100%",
		height: "100%",
		padding: "30px",
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		justifyContent: "space-between",
		[theme.breakpoints.down("md")]: {
			padding: "10px",
			flexDirection: "column"
		}
	},
	flexItem: {
		margin: "5px"
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: "30px",
		paddingBottom: "30px",
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.down("md")]: {
			flexDirection: "row",
			flexDirection: "column",
			flex: 0,
			padding: "10px"
		}
	},
	titleContainer: {
		marginTop: "10px",
		marginRight: "3px",
		marginLeft: "3px",
		width: "90%",
	},
	buttons: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		[theme.breakpoints.down("md")]: {
			justifyContent: "flex-end"
		},
		[theme.breakpoints.down("sm")]: {
			justifyContent: "center"
		}
	},
	button: {
		marginLeft: "10px"
	},
	gridItem: {
		padding: "10px"
	}
}));

export const contactsScreenStyles = makeStyles((theme)=>({
    listItem: {
        height: "100px",
        display: "flex",
        alignItems: "center",
		justifyContent: "center",
		
	},
	contactsContainer: {
		margin: "10px",
		minHeight: "80%",
		overflowY: "scroll",
		background: theme.palette.background.default,
	// 	boxShadow: "0 1px 1px rgba(0,0,0,0.25), 0 2px 2px rgba(0,0,0,0.20), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.10), 0 16px 16px rgba(0,0,0,0.05)",
      borderRadius: "15px" 
	}
	
}))

export const groupsScreenStyles = makeStyles(() => ({
	listItem: {
        height: "100px",
        width: "200px",
		display: "flex",
		flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly"
    }
}));