import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
	
	root: {
		display: "flex",
		height: "100vh",
		width: "100vw"
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0
		},
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
		
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: "transparent",
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none"
		}
	},
	toolbarItems: {
		justifyContent: "space-between"
	},
	
	content: {
		flexGrow: 1,
		display: "flex",
		marginTop: "64px",
		padding: "20px",
		[theme.breakpoints.up("md")]: {
			padding: "10px"
		},
		
	},
	mainContent: {
		flexGrow: 1,
		backgroundColor: "transparent",
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
	}
}));
