import { makeStyles } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	center: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
    },
    list: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	
	logo: {
		maxHeight: "64px"
	}
}));
