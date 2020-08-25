import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import studentScreensStyles from "../../style/studentScreensStyles";
import * as quizScoreActions from "../../store/actions/quizScoreActions";

import {
  Typography,
  Button,
} from "@material-ui/core";

const Finish = ({ history}) => {
  const dispatch = useDispatch();
  const classes = studentScreensStyles();
  const score = useSelector(state => state.score.overallScore)

  const doneHandler = async () => {
      await dispatch(quizScoreActions.clearScore());
    history.push("/")
    }
    return (
      <>
        {(score!== null)?
          (
            <div className = {classes.finsihQuizContainer}>
              <Typography variant="h6" color= "primary">Quiz Finished</Typography>
              <Typography variant="body">
                Score: {score}
                {/* need to get score here */}
              </Typography>
              <Button color="primary" onClick={doneHandler}>Done</Button>
              </div>
            ):
          (
            <>
              { history.push("/")}
              </>
      ) }</>
              
    )
}

export default Finish
