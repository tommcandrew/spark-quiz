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


export const userQuizzesScreenStyle = makeStyles((theme) => ({
  titleContainer: {
    marginBottom: "8px",
    [theme.breakpoints.down("md")]: {
        marginBottom: "8px",
			marginTop: "20px"
		},
  },
  card: {
    width: "300px",
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
    margin: "auto",
    overflowX: "hidden",
    width: "100%",
    padding: "20px",
    maxHeight: "80%",
    	[theme.breakpoints.down("md")]: {
        paddingTop: "15px",
         maxHeight: "90%",
		},
  },
  quizName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    //color: "#fff"
  },
}));

export const createQuizScreenStyles = makeStyles((theme) => ({
   textField: {
    [theme.breakpoints.down("sm")]: {
        width: "90%"
		},
  },
  quizSubjectText: {
    [theme.breakpoints.down("sm")]: {
        marginTop: "15px"
		},
  },
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
    [theme.breakpoints.down("sm")]: {
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0),
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down("sm")]: {
      flex: 0,
      padding: "8px 8px",
      width: "100%"
    },
  },
  titleContainer: {
    marginTop: "10px",
    marginRight: "3px",
    marginLeft: "3px",
    width: "90%",
     [theme.breakpoints.down("sm")]: {
       flexDirection: "column",
       width: "100%",
       alignItems: "flex-start",
       margin: "0px",
       marginBottom: "5px"
    },
  },
  titleNameContainer: {
    display: "flex",
    alignItems: "flex-end",
     [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
       justifyContent: "flex-start",
      
    },
  },
  buttons: {
    width: "90%",
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      justifyContent: "center",
      width: "100%"
    },
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
  contactsMainContainer: {
    height: "100%",
    padding: "20px",
},

  contactsContainer: {
    height: "80%",
    overflowY: "scroll",
    width: "100%",
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "20px",
    // boxShadow: "0px 3px 15px rgba(0,0,0,0.2)"
    [theme.breakpoints.down("xs")]: {
      border: "none",
       
    },
  
  },
  gridItem: {
    height: "200px", 
    marginBottom: "10px",
  },

  paper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    height: "100%",
    backgroundColor: theme.palette.background.default,
  },
}));


