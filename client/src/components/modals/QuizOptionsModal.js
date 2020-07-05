import React, { useState, useEffect } from "react";
import * as quizActions from "../../store/actions/quizActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Divider,
  NativeSelect,
  TextField,
} from "@material-ui/core";
import { modalRootStyles } from "../../style/modalStyles";
import CustomSnackbar from "../../components/mui/Snackbar";
import V from "max-validator";
import { quizOptionsValidation } from "../../utils/validation";

const timeLimitOptions = {
  max: 60,
  step: 5,
};

//MAIN
const QuizOptionsModal = ({ quizId, closeModal }) => {
  const rootClasses = modalRootStyles();
  const prevState = useSelector((state) => state.quiz);
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectedQuizPointsSystem, setSelectedQuizPointsSystem] = useState();
  const [overallPoints, setOverallPoints] = useState("");
  const [validationError, setValidationError] = useState("");
  const dispatch = useDispatch();

  //HOOKS
  useEffect(() => {
    if (prevState.quizPointsSystem !== "") {
      setSelectedQuizPointsSystem(prevState.prevQuizPointsSystem);
    }
    if (
      prevState.quizPointsSystem === "overall" &&
      prevState.quizOverallPoints
    ) {
      setOverallPoints(prevState.quizOverallPoints);
    }
  }, []);

  useEffect(() => {
    let selectOptions = [];
    selectOptions.push(
      <option key="No limit" value="false">
        No limit
      </option>
    );
    for (let i = 1; i <= timeLimitOptions.max; i++) {
      if (prevState.quizTimeLimit === i.toString()) {
        selectOptions.push(
          <option key={i} value={i} selected>
            {i}
          </option>
        );
      } else {
        selectOptions.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
    }
    setSelectOptions(selectOptions);
  }, [prevState]);

  //HANDLERS
  const handleSelectPoints = (e) => {
    setSelectedQuizPointsSystem(e.target.value);
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTimeLimit = e.target.timeLimit.value;

    let isValid = true;
    if (selectedQuizPointsSystem === "overall") {
      setOverallPoints(e.target.overallPoints.value);
      let points = e.target.overallPoints.value;
      const result = V.validate({ points }, quizOptionsValidation);
      if (result.hasError) {
        console.log("result has error");
        console.log(result.getError("points"));
        setValidationError(result.getError("points"));
        isValid = false;
        return;
      }
      if (isValid === true) {
        if (selectedQuizPointsSystem === "overall") {
          dispatch(
            quizActions.updateQuiz(quizId, { quizOverallPoints: points })
          );
        }
      }
    }
    if (isValid === true) {
      if (selectedTimeLimit) {
        dispatch(
          quizActions.updateQuiz(quizId, { quizTimeLimit: selectedTimeLimit })
        );
      }
      if (selectedQuizPointsSystem) {
        dispatch(
          quizActions.updateQuiz(quizId, {
            quizPointsSystem: selectedQuizPointsSystem,
          })
        );
      }

      closeModal();
    }
  };

  //RETURN
  return (
    <div className={rootClasses.root}>
      {validationError !== "" && (
        <CustomSnackbar
          severity="error"
          message={validationError}
          handleClose={() => setValidationError("")}
        />
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justify="center" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography
              variant="h5"
              color="secondary"
              style={{ textAlign: "center" }}
            >
              Quiz Options
            </Typography>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            <Typography>Time limit (minutes):</Typography>
          </Grid>
          <Grid item xs={6}>
            <NativeSelect id="timeLimit" name="timeLimit">
              {selectOptions}
            </NativeSelect>
          </Grid>

          <Grid item xs={6} style={{ textAlign: "right" }}>
            <Typography>Assign points:</Typography>
          </Grid>
          <Grid item xs={6}>
            <NativeSelect
              id="points"
              name="points"
              onChange={handleSelectPoints}
              defaultValue={prevState.quizPointsSystem}
            >
              <option value="noPoints">No points</option>
              <option value="overall">Overall</option>
              <option value="eachQuestion">Each question</option>
            </NativeSelect>
            <Grid item xs={12} xl={12}>
              {((prevState.quizPointsSystem === "overall" &&
                !selectedQuizPointsSystem) ||
                selectedQuizPointsSystem === "overall") && (
                <div>
                  <TextField
                    id="overallPoints"
                    label="score"
                    defaultValue={prevState.quizOverallPoints}
                  />
                </div>
              )}
            </Grid>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            <button type="submit">Done</button>
          </Grid>
          <Grid item xs={6}>
            <button>Cancel</button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default QuizOptionsModal;
