import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../store/actions/userActions";

const UserQuizzes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.fetchQuizzes());
  }, []);

  const quizzes = useSelector((state) => state.user.quizzes);

  return (
    <div className="userQuizzes">
      <h1>My Quizzes</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li>{quiz.quizName}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserQuizzes;
