import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
	active: {
		backgroundColor: theme.palette.secondary.light
	},
	item: {},
	root: {
		display: "flex",
		height: "100vh",
		width: "100vw"
	},
	drawer: {
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.up("md")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	toolbarItems: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between"
	},
	navItemsLeft: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	content: {
		flexGrow: 1,
		display: "flex",
		margin: theme.spacing(5),
		marginTop: "100px",
		background: "#fff",
		padding: "20px",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center",
		boxShadow:
			"0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16),  0 8px 8px rgba(0,0,0,0.20)",
		borderRadius: "5px",
			[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(0),
			margin: "0",
			marginTop: "56px",
		}
	},
	list: {
		width: "100%",
		maxWidth: 360
	},

	logo: {
		textAlign: "center",
		padding: "10px",
		maxHeight: "64px",
		width: "150px"
	}
}));
