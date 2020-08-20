import { makeStyles } from "@material-ui/core/styles";
import hero from "../assets/images/hero2.jpg";

export const useStyles = makeStyles((theme) => ({
  homeBg: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    overflow: "hdden",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      display: "relative",
      height: "100vh",
    },
  },
  paper: {
    Width: "600px",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(8),
    marginRight: "50px",
    boxShadow:
      "0 1px 1px rgba(0,0,0,0.25), 0 2px 2px rgba(0,0,0,0.20), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.10), 0 16px 16px rgba(0,0,0,0.05)",
    borderRadius: "25px",
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-start",
      width: "100%",
      height: "100vh",
      marginRight: "0",
      boxShadow: "0",
      borderRadius: "0"
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  hero: {
    width: "60%",
    height: "100%",
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      opacity: "0",
      width: "100%",
      position: "absolute",
    },
  },
  large: {
    height: "120px",
    width: "250px",
    [theme.breakpoints.down("md")]: {
      margin: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "3px",
      marginTop: theme.spacing(3),
       height: "100px",
        width: "200px",
    },
  },

  paperLogin: {
    width: "600px",
    background: "#fff",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(3),
    paddingTop: theme.spacing(6),
    marginTop: theme.spacing(8),
    boxShadow:
      "0 1px 1px rgba(0,0,0,0.25), 0 2px 2px rgba(0,0,0,0.20), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.10), 0 16px 16px rgba(0,0,0,0.05)",
    borderRadius: "25px",
    [theme.breakpoints.down("md")]: {
       width: "100%",
      height: "100vh",
       boxShadow: "none",
        borderRadius: "0"
    },
     [theme.breakpoints.down("sm")]: {
       marginTop: theme.spacing(0),
       width: "100%",
       height: "100%",
    },
      
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 4),
  },
  actionButton: {
    margin: theme.spacing(2, 0, 1),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
     [theme.breakpoints.down("md")]: {
      margin: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "3px",
      marginTop: theme.spacing(3),
    },
  },
  loginBg: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    overflow: "hdden",
     [theme.breakpoints.down("sm")]: {
      backgroundColor: "#fff"
    },
  }
}));
