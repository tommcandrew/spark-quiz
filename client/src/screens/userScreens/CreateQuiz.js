import React, { useState, useEffect } from "react";
import AddQuestionModal from "../../components/UI/AddQuestionModal";
import PreviewQuestions from "../../components/UI/PreviewQuestions";
import QuizOptions from "../../components/UI/QuizOptions";
import * as questionActions from "../../store/actions/newQuiz";
import { useDispatch, useSelector } from "react-redux";

const CreateQuiz = () => {
  const dispatch = useDispatch();

  const quizId = useSelector((state) => state.quiz.quizId, []);

  //STATES
  const [displayedComponent, setDisplayedComponent] = useState(
    <PreviewQuestions />
  ); //only for testing purposes
  const [quizName, setQuizName] = useState("");
  const [quizSubject, setQuizSubject] = useState("");
  const [quizTime, setQuizTime] = useState(0);

  //HANDLERS
  const addNewQuestion = () => {
    setDisplayedComponent(
      <AddQuestionModal questionSubmitted={closeModal} quizId={quizId} />
    );
  };
  const previewQuestionsHandler = () => {
    setDisplayedComponent(<PreviewQuestions editQuestion={editQuestion} />);
  };
  const quizOptionsHandler = () => {
    setDisplayedComponent(<QuizOptions setTime={setTime} />);
  };
  const createQuizHandler = () => {
    console.log(quizName, quizTime);
  };

  const setTime = (time) => {
    setQuizTime(time);
    previewQuestionsHandler();
  };
  const editQuestion = (id) => {
    console.log("clicked");
  };

  const closeModal = () => {
    previewQuestionsHandler();
  };

  const handleCreate = () => {
    dispatch(questionActions.createQuiz(quizName, quizSubject));
  };

  return (
    <div className="create-quiz-container">
      {quizId && (
        <>
          <div className="create-quiz-container container-1">
            <button onClick={addNewQuestion}>Add question</button>
            <button onClick={quizOptionsHandler}>QuizOptions</button>
            <button onClick={previewQuestionsHandler}>Preview</button>
            <button>Invite</button>
            <button onClick={createQuizHandler}>CreateQuiz</button>
          </div>
          <div className="create-quiz-container container-2">
            {displayedComponent}
          </div>
        </>
      )}
      {!quizId && (
        <div>
          <label>
            Quiz name:
            <input
              type="text"
              name="name"
              onChange={(event) => {
                setQuizName(event.target.value);
              }}
              value={quizName}
            />
          </label>
          <label>
            Subject
            <input
              type="text"
              name="subject"
              onChange={(event) => {
                setQuizSubject(event.target.value);
              }}
              value={quizSubject}
            />
          </label>
          <button onClick={handleCreate}>Create Quiz</button>
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
