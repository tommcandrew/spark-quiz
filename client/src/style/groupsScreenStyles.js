import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
		padding: "30px",
		overflowY: "scroll",
		overflowX: "hidden"
	},
	card: {
		minWidth: 275,
		margin: "5px"
	}
}));

export const customStyles = {
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
		padding: "20px"
	},
	overlay: { zIndex: 2000 }
};
