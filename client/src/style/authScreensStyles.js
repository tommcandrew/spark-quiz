import { makeStyles } from "@material-ui/core/styles";
import hero from "../assets/images/hero2.jpg";

export const useStyles = makeStyles((theme) => ({
  homeBg: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      overflowY: "scroll",
      height: "200vh",
    },
  },
  paper: {
    width: "40%",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(8),
    marginRight: "50px",
    boxShadow:
      "0 1px 1px rgba(0,0,0,0.25), 0 2px 2px rgba(0,0,0,0.20), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.10), 0 16px 16px rgba(0,0,0,0.05)",
    borderRadius: "25px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "100vh",
      marginRight: "0",
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
      width: "100%",
      height: "100vh",
    },
  },
  large: {
    height: "120px",
    width: "250px",
    [theme.breakpoints.down("md")]: {
      margin: "20px",
    },
    [theme.breakpoints.down("md")]: {
      margin: "5px",
    },
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
    boxShadow:
      "0 1px 1px rgba(0,0,0,0.25), 0 2px 2px rgba(0,0,0,0.20), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.10), 0 16px 16px rgba(0,0,0,0.05)",
    borderRadius: "25px",
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

  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));
