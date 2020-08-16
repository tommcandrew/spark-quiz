import React from "react";
import { useSelector } from "react-redux";
import { Typography, Container } from "@material-ui/core";


//this component is rendered as a child of Quiz
const QuizStart = ({ quiz, setQuizStarted }) => {
  return (
    <div >
      <Typography variant="h2">Quiz Name: Quiz Name{/* {quiz.quizName} */}</Typography>
      <Typography variant="h2">Subject: Quiz Subject{/* {quiz.quizSubject} */}</Typography>
      <Typography variant="h2">Author: Quiz Author {/* {quiz.quizAuthor} */}</Typography>
      <Typography variant="h2">Time limit: Quiz Time Limit{/* {quiz.quizTimeLimit || "none"} */}</Typography>
      <Typography variant="h2">Score{/* {quiz.quizTimeLimit || "none"} */}</Typography>

            <button
              // onClick={() => setQuizStarted(true)}
              style={{ cursor: "pointer" }}
            >
              Start Quiz
            </button>
       
     
    </div>
   
        
    
            
     
  );
};

export default QuizStart;
