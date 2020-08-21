import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"


const Finish = ({ history}) => {
  const dispatch = useDispatch();

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
