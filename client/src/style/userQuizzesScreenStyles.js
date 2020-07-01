import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		padding: "10px"
	},
	card: {
		minWidth: 275,
		margin: "5px"
	},
	list: {
		maxWidth: "95%",
		overflowY: "scroll"
	}
});
