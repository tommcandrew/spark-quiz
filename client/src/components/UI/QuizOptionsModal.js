import React, { useState, useEffect } from "react";
import * as quizActions from "../../store/actions/quizActions";
import { useDispatch } from "react-redux";

const styles = {
  wrapper: {
    border: "1px solid #333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
};

//maybe this can be passed down via props
const timeLimitOptions = {
  max: 60,
  step: 5,
};

const QuizOptionsModal = ({ quizId, closeModal }) => {
  const [showOverallPointsInput, setShowOverallPointsInput] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);
  const dispatch = useDispatch();

  //generate options for dropdown menu based on timeLimitOptions object
  useEffect(() => {
    let selectOptions = [];
    selectOptions.push(
      <option key="No limit" value="false">
        No limit
      </option>
    );
    for (let i = 1; i <= timeLimitOptions.max; i++) {
      if (i % timeLimitOptions.step === 0) {
        selectOptions.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
    }
    setSelectOptions(selectOptions);
  }, []);

  const handleSelectPoints = (e) => {
    if (e.target.value === "overall") {
      setShowOverallPointsInput(true);
    } else {
      if (showOverallPointsInput) {
        setShowOverallPointsInput(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTimeLimit = e.target.timeLimit.value;
    const points = e.target.points.value;
    let overallPoints;

    if (showOverallPointsInput) {
      overallPoints = e.target.overallPoints.value;
    }
    if (selectedTimeLimit) {
      dispatch(
        quizActions.updateQuiz(quizId, { quizTimeLimit: selectedTimeLimit })
      );
    }
    if (points) {
      dispatch(quizActions.updateQuiz(quizId, { quizPointsSystem: points }));
    }
    if (overallPoints) {
      dispatch(
        quizActions.updateQuiz(quizId, { quizOverallPoints: overallPoints })
      );
    }
    closeModal();
  };

  return (
    <div style={styles.wrapper}>
      <h2>Quiz Options</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="timeLimit">Time limit (minutes): </label>
          <select id="timeLimit" name="timeLimit" defaultValue="No limit">
            {selectOptions}
          </select>
        </div>
        <div>
          <label htmlFor="points">Assign points:</label>
          <select
            id="points"
            name="points"
            defaultValue="no points"
            onChange={handleSelectPoints}
          >
            <option value="noPoints">No points</option>
            <option value="overall">Overall</option>
            <option value="eachQuestion">Each question</option>
          </select>
          {showOverallPointsInput && (
            <div>
              <label htmlFor="overallPoints">Overall points: </label>
              <input
                type="number"
                id="overallPoints"
                name="overallPoints"
                required
              />
            </div>
          )}
        </div>
        <div>
          <button type="submit">Done</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizOptionsModal;
