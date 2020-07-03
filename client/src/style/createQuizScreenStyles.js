import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  quizNameContainer: {
    display: "flex",
    justifyContent: "center"
  },
  makeNewQuizContainer: {
    width: "100%",
    height: "100%",
    padding: "30px",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  flexItem: {
    margin: "5px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  buttonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    marginTop: "10px",
    marginRight: "3px",
    marginLeft: "3px",
    width: "90%",
  },
  gridItem: {
    padding: "10px",
    },
  
  
}));

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
    display: "inline",
  },
  overlay: { zIndex: 2000 },
};