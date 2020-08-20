import React from 'react'
import studentScreensStyles from "../../style/studentScreensStyles";


const ProgressBar = ({ currentQuestion, totalQuestions }) => {
    const classes = studentScreensStyles();
    let ratio = ((currentQuestion-1) / totalQuestions) * 100
    if(currentQuestion==0) ratio= 0
    return (
        <div className={classes.progressBar}>
            <div style={{width: `${ratio}%`}} className={classes.progressBar__progress}>

            </div>

        </div>
    )
}

export default ProgressBar
