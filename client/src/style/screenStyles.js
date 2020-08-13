import { makeStyles } from "@material-ui/core/styles";

export const screenLayoutStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: "20px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
});

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
    display: "inline",
    maxWidth: "60%",
    maxHeight: "65%",
  },
  overlay: { zIndex: 2000, background: "rgba(0,0,0,0.7)" },
};

export const userQuizzesScreenStyle = makeStyles((theme) => ({
  card: {
    maxWidth: "300px",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    // background: "rgb(131,168,250)",
    // background: "linear-gradient(104deg, rgba(131, 168, 250, 1) 6%, rgba(112, 148, 246, 1) 67%)",
    backgroundColor: theme.palette.background.default,
    //padding: theme.spacing(1),
    borderRadius: "10px",
  },
  cardGridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: "0 0 90%",
    overflowY: "scroll",
    overflowX: "hidden",
    display: "flex",
    alignItems: "flex-start",
    padding: "20px !important",
  },

  quizName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    //color: "#fff"
  },
}));

export const createQuizScreenStyles = makeStyles((theme) => ({
  quizNameContainer: {
    display: "flex",
    justifyContent: "center",
  },
  makeNewQuizContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      flexDirection: "column",
      flex: 0,
    },
  },
  titleContainer: {
    marginTop: "10px",
    marginRight: "3px",
    marginLeft: "3px",
    width: "90%",
  },
  buttons: {
    width: "90%",
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-end",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  button: {
    marginLeft: "10px",
  },
  gridItem: {
    padding: "10px",
  },
  previewQuestionsContainer: {
    flex: 1,
    marginTop: "10px",
  },
}));

export const contactsScreenStyles = makeStyles((theme) => ({
  gridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  contactsContainer: {
    height: "100%",
    width: "100%",
    overflowY: "scroll",
  },
  paper: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
  },
}));

export const groupsScreenStyles = makeStyles(() => ({
  listItem: {
    height: "100px",
    width: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));
