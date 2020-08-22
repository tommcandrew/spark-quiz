import React from 'react'
import studentScreensStyles from "../../style/studentScreensStyles";
import {
  Typography,
  Button,
} from "@material-ui/core";

const Finish = ({ history, location }) => {
  const classes = studentScreensStyles();

  const doneHandler = async () => {
    history.push("/")
    }
    return (
      <>
        {location?
          (
            <div className = {classes.finsihQuizContainer}>
              <Typography variant="h6" color= "primary">Quiz Finished</Typography>
              <Typography variant="body">
                Score: {location.score}
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
