import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import * as authActions from "../../store/actions/authActions"


const Finish = ({  quiz, history}) => {
  const dispatch = useDispatch();
  const score = useSelector(state => state.score.overallScore)

  const doneHandler = async () => {
    await dispatch(authActions.clearStudent());
    history.push("/")
    }
    return (
        <>
              <h2>End of Quiz</h2>
              <p>
                Score: {score}
              </p>
              <button onClick={doneHandler}>Done</button>
            </>
    )
}

export default Finish
