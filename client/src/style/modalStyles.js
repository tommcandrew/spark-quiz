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
	paper: {
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	}, 
	card: {
		maxWidth: 345,
	},
	media: {
    height: 140,
	},
	cardActionArea: {
		width: "100%"
	}
}));

export const shareModalStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    marginTop: "10px",
  },
}));