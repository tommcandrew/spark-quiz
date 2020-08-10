import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  homeBg: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    height: "100%",
    
  },
  paper: {
    background: "#fff",
    height: "100%",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(8),
    // boxShadow: "0 1px 1px rgba(0,0,0,0.25), 0 2px 2px rgba(0,0,0,0.20), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.10), 0 16px 16px rgba(0,0,0,0.05)",
    // borderRadius: "25px" 
    
  },
   paperLogin: {
    background: "#fff",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
     padding: theme.spacing(3),
     paddingTop: theme.spacing(6),
    marginTop: theme.spacing(8),
     boxShadow: "0 1px 1px rgba(0,0,0,0.25), 0 2px 2px rgba(0,0,0,0.20), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.10), 0 16px 16px rgba(0,0,0,0.05)",
     borderRadius: "25px" 
    
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 4),
  },
  actionButton: {
    margin: theme.spacing(2, 0, 1),
  },
  large: {
    height: "200px",
    width: "250px",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  }
}));
