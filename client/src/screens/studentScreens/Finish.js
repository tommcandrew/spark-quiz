import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import * as quizActions from "../../store/actions/quizActions";
import * as authActions from "../../store/actions/authActions";
import * as quizScoreActions from "../../store/actions/quizScoreActions";


const Finish = ({ history}) => {
  const dispatch = useDispatch();
 //const score = useSelector(state => state.score.overallScore)


  

  const doneHandler = async () => {
    history.push("/")
    }
    return (
        <>
              <h2>End of Quiz</h2>
              <p>
                Score: 
              </p>
              <button onClick={doneHandler}>Done</button>
            </>
    )
}

export default Finish
