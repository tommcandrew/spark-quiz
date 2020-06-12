import React, {useState, useEffect} from 'react';
import AddQuestionModal from '../../components/UI/AddQuestionModal'
import PreviewQuestions from '../../components/UI/PreviewQuestions'
const CreateQuiz = () => {
    //STATES
    const [displayedComponent, setDisplayedComponent] = useState(<PreviewQuestions />) //only for testing purposes
    const [quizName, setQuizName] = useState('');
    const [quizTime, setQuizTime] = useState(0);

    //HANDLERS
    const addNewQuestion = () => {
      setDisplayedComponent(<AddQuestionModal questionSubmitted={closeModal}/>)
  }
  const previewQuestionsHandler = () => {
    setDisplayedComponent(<PreviewQuestions editQuestion = {editQuestion}/>)
  }

  const editQuestion = (id) => {
    console.log("clicked")
  }
  
  const closeModal = () => {
    previewQuestionsHandler()
  }

    //HOOKS 
    useEffect(() => {
          }, []);

  return (
    <div className = "create-quiz-container">
      <div className = "create-quiz-container container-1">
        <label>
          Quiz name:
          <input type="text" name="name" />
        </label>
        <button onClick = {addNewQuestion}>Add question</button>
        <button>QuizOptions</button>
        <button onClick = {previewQuestionsHandler}>Preview</button>
        <button>Invite</button>
        <button>CreateQuiz</button>
      </div>
          <div className='create-quiz-container container-2'>
            {displayedComponent}
          </div>
          </div>
  );
};

export default CreateQuiz;
