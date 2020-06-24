import React from 'react'
import {useDispatch} from "react-redux"
import * as authActions from "../../store/actions/authActions"

const Finish = ({ score, quiz, history}) => {
  const dispatch = useDispatch();

  const doneHandler = async () => {
    await dispatch(authActions.clearStudent());
    history.push("/")
    }
    return (
        <>
              <h2>End of Quiz</h2>
              <p>
                Score: {score}/{quiz.quizQuestions.length}
              </p>
              <button onClick={doneHandler}>Done</button>
            </>
    )
}

export default Finish
