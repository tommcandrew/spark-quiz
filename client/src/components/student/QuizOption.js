import React from "react";
import studentScreensStyles from "../../style/studentScreensStyles";
import{FormControlLabel, Radio} from "@material-ui/core"

const QuizOption = ({
  option,
  optionIndex,
}) => {

  const classes = studentScreensStyles();
  return (
    <div className={classes.quiz__option}>
      <FormControlLabel value={optionIndex.toString()} control={<Radio />} className={classes.quiz__optionRadio}
      />
    <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "100%"}} className={classes.quiz__optionLabel}
    >
      {option}
    </div>
    </div >
  );
};

export default QuizOption;

