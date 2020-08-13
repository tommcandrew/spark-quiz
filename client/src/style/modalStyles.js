import { makeStyles } from "@material-ui/core/styles";

export const modalRootStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    padding: "10px",
    overflowX: "hidden",
    overflowY: "hidden",
  },
}));

export const quizOptionsModalStyles = makeStyles((theme) => ({}));

export const addQuestionModalStyles = makeStyles((theme) => ({
  card: {
    height: "280px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  addedMediaContainer: {
    width: "75%",
    height: "75%",
  },
  addedMedia: {
    height: "100%",
    width: "100%",
  },
  cardActions: {
    width: "100%",
  },
  textArea: {
    borderBottom: "1px solid black",
    pading: "5px",
    maxlength: "10",
    width: "80px",
    marginLeft: "10px",
  },
}));

export const shareModalStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    border: `1px solid ${theme.palette.primary.main}`,
    borderTop: 0,
    height: "200px",
    overflowY: "scroll",
    boxShadow: "0 3px 3px rgba(0,0,0,0.2)",
  },
}));

export const groupInfoModalStyles = makeStyles((theme) => ({
  nonGroupMembersContainer: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "3px",
  },
}));
