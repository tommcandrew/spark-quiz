import { makeStyles } from "@material-ui/core/styles";



export const modalRootStyles = makeStyles((theme) => ({
	root: {
        flex: 1,
        padding: "2px",
        
	}
}));

export const quizOptionsModalStyles = makeStyles((theme)=> ({

}))

export const addQuestionModalStyles = makeStyles((theme) => ({
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
		height: "75%",
	},
	addedMedia: {
		height: "100%",
		width: "100%"
	},
	cardActions: {
		width: "100%"
	},
}));

export const shareModalStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    marginTop: "10px",
  },
}));