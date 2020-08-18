import React from 'react'
import studentScreensStyles from "../../style/studentScreensStyles";


const ProgressBar = ({ currentQuestion, totalQuestions }) => {
    const classes = studentScreensStyles();
    const ratio = (currentQuestion/totalQuestions)*100
    return (
        <div className={classes.progressBar}>
            <div style={{width: `${ratio}%`}} className={classes.progressBar__progress}>

            </div>

        </div>
    )
}

export default ProgressBar
