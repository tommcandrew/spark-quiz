import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		padding: "10px"
	},
	card: {
		maxWidth: "100%"
	},
	list: {
		overflowY: "scroll"
	},
	quizName: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-end"
	}
});
