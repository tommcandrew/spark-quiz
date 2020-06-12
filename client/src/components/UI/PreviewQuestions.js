import React from 'react'
import {useSelector} from 'react-redux'

const PreviewQuestions = () => {
    const questions = useSelector(state => state.newQuiz.quizQuestions)
    if(questions.length < 1) return <p>Add some questions</p>
    return (
        <>
            below items are to be made clickable
        <ul>
            {questions.map(q => {
                return (
                    <li className="list-item">
                        Q. {q.question}
                      </li>
                )
            })}
            </ul>
            </>
    )
}
export default PreviewQuestions