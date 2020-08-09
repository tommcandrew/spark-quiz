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
    maxWidth: "90%",
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
		justifyContent: "space-evenly",
		background:" rgb(66, 65, 155)",
		background: "radial-gradient(circle, rgba(66, 65, 155, 1) 12%, rgba(140, 142, 204, 1) 83%)",
		color: "#FFF"
		
	},
	list: {
		 flex: "0 0 90%",
		overflowY: "scroll",
		overflowX: "hidden",
		padding: "20px"
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
		color: theme.palette.text.secondary
	},
	buttonContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
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
		width: "90%"
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

export const contactsScreenStyles = makeStyles({
    listItem: {
        height: "30px",
        width: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})

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