import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  root: {
		display: 'flex',
		height: "100vh",
	  width: "100vw"
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
		boxShadow: "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16),  0 8px 8px rgba(0,0,0,0.20)",
		borderRadius: "5px" 
	},
}));
