import React from 'react'
import { Typography} from "@material-ui/core";

const quizRules = () => {
    return (
        <div>
             <Typography variant="h5" color="primary" >Guidelines:</Typography>
        <Typography variant="body" style={{marginBottomn: "10px", fontStyle: "italic", lineHeight: "1.5rem" }}>
          The quiz questions types consist of MCQs and True/False.
          <br></br>
          The quiz questions may contain multi-media.
          <br></br>
          Avoid refreshing your broswer while attemting the quiz.
          <br></br>
          You are not allowed to retake the quiz.
          <br></br>
           you are not allowed to change your submitted answers
           <br></br>
          The quiz will be automatically submitted when the allotted time is over.
          <br></br>
          Good Luck!
         </Typography>
        </div>
    )
}

export default quizRules
