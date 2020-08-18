import React from "react";
import { useSelector } from "react-redux";
import { Typography, Button} from "@material-ui/core";
import studentScreensStyles from "../../style/studentScreensStyles";
import QuizRules from "../../components/UI/quizRules"


//this component is rendered as a child of Quiz
const QuizStart = ({ quiz, setQuizStarted }) => {
  const classes = studentScreensStyles();


  return (
    <div className={classes.quizStartContainer} >
      <div className={classes.quizInfo}>
      <Typography variant="h4" color="primary" style={{marginBottom: "10px", padding: "0"}}>Quiz Name: {quiz.quizName}</Typography>
      <Typography variant="h6" style={{marginBottom: "10px"}}>Subject: {quiz.quizSubject}</Typography>
      <Typography variant="h6" style={{marginBottom: "10px"}}>Author: {quiz.quizAuthor}</Typography>
      <Typography variant="h6" style={{marginBottom: "10px"}}>Time limit: {quiz.quizTimeLimit || "none"}</Typography>
      <Typography variant="h6" style={{marginBottom: "10px"}}>Score: </Typography>
      </div>
      <div className={classes.quizRules}>
        <QuizRules />
      </div>
      <div className={classes.button}>

            <Button size="large" variant="contained" color="primary"
              onClick={() => setQuizStarted(true)}
             
            >
              Start Quiz
            </Button>
       </div>
     
    </div>
   
        
    
            
     
  );
};

export default QuizStart;
